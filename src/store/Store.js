import { configureStore } from '@reduxjs/toolkit';
import CommonReducer from '../reducers/Common/CommonReducer';
import ReminderReducer from '../reducers/Reminder/ReminderReducer';

const store = configureStore({
    reducer: {
        CommonReducer,
        ReminderReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

export default store;