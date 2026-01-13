import RestClient from '../RestClient';

const GetUserDetail = () => {
  return RestClient.Get('user/detail', false);
};

const UserSubmitAnswer = payload => {
  return RestClient.Post('user/submit-answer', payload);
};

const AddDeviceToken = payload => {
  return RestClient.Post('user/add-token', payload, false);
};

const EditUserInfo = payload => {
  return RestClient.Put('user/update-profile', payload);
};

const DeleteUserAccount = () => {
  return RestClient.Get('user/delete-account');
};

export default {
  GetUserDetail,
  UserSubmitAnswer,
  AddDeviceToken,
  EditUserInfo,
  DeleteUserAccount,
};
