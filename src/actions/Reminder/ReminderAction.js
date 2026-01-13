import ReminderService from '../../services/ReminderServices/ReminderService';
import * as ActionTypes from '../ActionTypes';
import { LocalStorageService } from '../../services/LocalStorageService'; // Fix the import path


export const fetchAllReminders = (page = 1, limit = 1000) => {
    return (dispatch, getState) => {
        ReminderService.GetAllReminders({ page, limit }).then(res => {
            if (res?.success) {
                dispatch({
                    type: ActionTypes.LOAD_ALL_REMINDER,
                    data: res?.reminders,
                });
            }
        });
    };
};

export const fetchAllUnplannedStopsReminders = (page = 1, limit = 1000) => {
    return (dispatch, getState) => {
        ReminderService.GetAllUnplannedStopsReminders({ page, limit }).then(res => {
            if (res?.success) {
                dispatch({
                    type: ActionTypes.LOAD_ALL_UNPLANNED_STOPS_REMINDER,
                    data: res?.reminders,
                });
            }
        });
    };
};

export const fetchAllRemembranceItems = (page = 1, limit = 1000) => {
    return (dispatch, getState) => {
        ReminderService.GetAllRemembranceItems({ page, limit }).then(res => {
            if (res?.success) {
                dispatch({
                    type: ActionTypes.LOAD_ALL_REMEMBRANCE_ITEMS,
                    data: res?.data,
                });
            }
        });
    };
};

export const fetchAllCurrentMonthDailySchedule = () => {
    return (dispatch, getState) => {
        ReminderService.GetAllCurrentMonthDailySchedule().then(res => {
            if (res?.success) {
                dispatch({
                    type: ActionTypes.LOAD_ALL_CURRENT_MONTH_DAILY_SCHEDULES,
                    data: res?.data,
                });
            }
        });
    };
};

export const fetchAllDailySchedule = () => {
    return (dispatch, getState) => {
        ReminderService.GetAllDailySchedule().then(res => {
            if (res?.success) {
                dispatch({
                    type: ActionTypes.LOAD_ALL_DAILY_SCHEDULES,
                    data: res?.data,
                });
            }
        });
    };
};

export const fetchAllFeeds = (page = 1, limit = 10000) => {
    return (dispatch, getState) => {
        ReminderService.GetAllFeeds({ page, limit }).then(res => {
            if (res?.success) {
                dispatch({
                    type: ActionTypes.LOAD_ALL_FEEDS,
                    data: res?.reminders,
                });
            }
        });
    };
};




// // Offline remembrance items actions
// export const loadLocalRemembranceItems = () => {
//     return async (dispatch) => {
//       try {
//         const items = await LocalStorageService.getRemembranceItems();
//         dispatch({
//           type: ActionTypes.LOAD_ALL_REMEMBRANCE_ITEMS,
//           data: items,
//         });
//       } catch (error) {
//         console.error('Error loading local remembrance items:', error);
//       }
//     };
//   };
  
//   export const addLocalRemembranceItem = (item) => {
//     return async (dispatch) => {
//       const response = await LocalStorageService.addRemembranceItem(item);
//       if (response.success) {
//         // Reload local items to update the store
//         dispatch(loadLocalRemembranceItems());
//       }
//       return response;
//     };
//   };
  
//   export const updateLocalRemembranceItem = (item) => {
//     return async (dispatch) => {
//       const response = await LocalStorageService.updateRemembranceItem(item);
//       if (response.success) {
//         // Reload local items to update the store
//         dispatch(loadLocalRemembranceItems());
//       }
//       return response;
//     };
//   };