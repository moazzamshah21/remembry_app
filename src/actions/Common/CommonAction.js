import UserService from '../../services/UserServices/UserService';
import * as ActionTypes from '../ActionTypes';

export const showLoader = text => {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.SHOW_LOADER,
      loading: true,
    });
  };
};

export const hideLoader = text => {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.HIDE_LOADER,
      loading: false,
    });
  };
};

export const changeTheme = value => {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.CHANGE_THEME_MODE,
      data: value,
    });
  };
};

export const changeNotificationSwitch = value => {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.CHANGE_NOTIFICATION_SWITCH,
      data: value,
    });
  };
};

export const fetchUserDetail = () => {
  return (dispatch, getState) => {
    UserService.GetUserDetail().then(res => {
      if (res?.success) {
        dispatch({
          type: ActionTypes.LOAD_USER_DETAIL,
          data: res?.data,
          packageAmount: res?.packageAmount
        });
      }
    });
  };
};