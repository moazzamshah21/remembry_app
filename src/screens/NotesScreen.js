import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import styles from '../styles/NotesStyle';
import SecondHeader from '../components/SecondHeader';
import { GradientColors, ThemeColors } from '../utils/Theme';
import { useDispatch, useSelector } from 'react-redux';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import LocalStorage from '../utils/LocalStorage';

const StickyNote = ({ note, onDelete, onUpdateTitle, onUpdate }) => {
  return (
    <View style={styles.noteContainer}>
      <TouchableOpacity onPress={() => onDelete(note.id)} style={styles.deleteButton}>
        {/* <Text style={styles.deleteButtonText}>Delete</Text> */}
        <EntypoIcon
          name="cross"
          style={{ color: ThemeColors.LIGHT_GRAY }}
          size={22}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.noteTitle}
        multiline
        textAlignVertical='top'
        value={note.title}
        onChangeText={(text) => onUpdateTitle(note.id, text)}
        placeholder="Note Title here..."
      />
      <TextInput
        style={styles.noteText}
        multiline
        textAlignVertical='top'
        value={note.text}
        onChangeText={(text) => onUpdate(note.id, text)}
        placeholder="Write your note here..."
      />

    </View>
  );
};

const NotesScreen = ({ navigation, route }) => {

  const ThemeMode = useSelector(state => state.CommonReducer.themeMode);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = await LocalStorage.GetData('stickyNotes');
        if (savedNotes !== null) {
          setNotes(JSON.parse(savedNotes));
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadNotes();
  }, []);

  useEffect(() => {
    const saveNotes = async () => {
      try {
        await LocalStorage.SetData('stickyNotes', JSON.stringify(notes));
      } catch (error) {
        console.log(error);
      }
    };

    saveNotes();
  }, [notes]);

  // Add a new sticky note
  const addNote = () => {
    setNotes((prevNotes) => [
      ...prevNotes,
      { id: Date.now().toString(), text: '', title: '' },
    ]);
  };

  const updateNote = (id, text) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, text } : note))
    );
  };

  const updateNoteTitle = (id, title) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, title } : note))
    );
  };

  // Delete a sticky note
  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <React.Fragment>
      <SecondHeader
        navigation={navigation}
        title="NOTES"
        subTitle="OF YOUR DAILY ROUTINE HERE"
        backButtonGradient={GradientColors.GREEN}
        backButtonColor={'#5da441'}
      />
      <ScrollView
        style={{
          backgroundColor: ThemeMode === 'dark'
            ? ThemeColors.DARK_THEME_COLOR
            : ThemeColors?.WHITE
        }}
        nestedScrollEnabled
        contentContainerStyle={[
          styles.ScrollViewContentContainerStyle,
          {
            backgroundColor:
              ThemeMode === 'dark'
                ? ThemeColors.DARK_THEME_COLOR
                : ThemeColors?.WHITE,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.MainContainer,
            {
              backgroundColor:
                ThemeMode === 'dark'
                  ? ThemeColors.DARK_THEME_COLOR
                  : ThemeColors?.WHITE,
            },
          ]}>
          <View style={[styles.container, {
            backgroundColor:
              ThemeMode === 'dark'
                ? ThemeColors.DARK_THEME_COLOR
                : ThemeColors.WHITE,
          }]}>
            <TouchableOpacity style={[styles.addButton, {
              backgroundColor:
                ThemeMode === 'dark'
                  ? ThemeColors.DARK_THEME_COLOR
                  : ThemeColors.WHITE,
            }]} onPress={addNote}>
              <Text style={styles.addButtonText}>+ Add Note</Text>
            </TouchableOpacity>
            <FlatList
              nestedScrollEnabled
              data={notes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <StickyNote note={item} onDelete={deleteNote} onUpdate={updateNote} onUpdateTitle={updateNoteTitle} />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </React.Fragment>
  );

};

export default NotesScreen;
