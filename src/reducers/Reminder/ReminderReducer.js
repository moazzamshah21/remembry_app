
import * as ActionTypes from '../../actions/ActionTypes';

const initialState = {
    reminders: [],
    unplannedStopsreminders: [],
    remembrances: [],
    currentMonthDailySchedules: [],
    dailySchedules: [],
    feeds: []
};

const ReminderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_ALL_REMINDER:
            return {
                ...state,
                reminders: action.data,
            };
        case ActionTypes.LOAD_ALL_UNPLANNED_STOPS_REMINDER:
            return {
                ...state,
                unplannedStopsreminders: action.data,
            };
        case ActionTypes.LOAD_ALL_REMEMBRANCE_ITEMS:
            return {
                ...state,
                remembrances: action.data,
            };
        case ActionTypes.LOAD_ALL_CURRENT_MONTH_DAILY_SCHEDULES:
            return {
                ...state,
                currentMonthDailySchedules: action.data,
            };
        case ActionTypes.LOAD_ALL_DAILY_SCHEDULES:
            return {
                ...state,
                dailySchedules: action.data,
            };
        case ActionTypes.LOAD_ALL_FEEDS:
            return {
                ...state,
                feeds: action.data,
            };
        default:
            return state;
    }
}

export default ReminderReducer;