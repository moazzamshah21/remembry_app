import * as ActionTypes from '../../actions/ActionTypes';

const initialState = {
  user: {},
  packageAmount: "0",
  loading: false,
  themeMode: 'light',
  notificationSwitch: false,
};

const CommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_LOADER:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.LOAD_USER_DETAIL:
      return {
        ...state,
        user: action.data,
        packageAmount: action.packageAmount
      };
    case ActionTypes.HIDE_LOADER:
      return {
        ...state,
        loading: false,
      };
    case ActionTypes.CHANGE_THEME_MODE:
      return {
        ...state,
        themeMode: action.data,
      };
    case ActionTypes.CHANGE_NOTIFICATION_SWITCH:
      return {
        ...state,
        notificationSwitch: action.data,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: {},
        packageAmount: "0",
      };
    default:
      return state;
  }
};

export default CommonReducer;
