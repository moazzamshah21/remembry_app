import RestClient from '../RestClient';

const AddDailyItem = payload => {
  return RestClient.Post('reminder/add-daily-item', payload);
};

const AddRemembranceItem = payload => {
  return RestClient.Post('reminder/add-remembrance-item', payload);
};

const UpdateRemembranceItem = payload => {
  return RestClient.Post('reminder/update-remembrance-item', payload);
};

const AddSocialFeed = payload => {
  return RestClient.Post('reminder/add-social-feed', payload);
};

const AddDailySchedule = payload => {
  return RestClient.Post('reminder/add-daily-schedule', payload);
};

const AddUnplannedStop = payload => {
  return RestClient.Post('reminder/add-unplanned-stop', payload);
};

const GetAllReminders = payload => {
  return RestClient.Post('reminder/get-all-reminders', payload, false);
};

const GetAllUnplannedStopsReminders = payload => {
  return RestClient.Post('reminder/get-all-unplanned-stops-reminders', payload, false);
};

const GetAllRemembranceItems = payload => {
  return RestClient.Post('reminder/get-all-remembrance-items', payload, false);
};

const GetAllCurrentMonthDailySchedule = payload => {
  return RestClient.Get('reminder/get-all-current-month-daily-schedule', false);
};

const GetAllDailySchedule = payload => {
  return RestClient.Get('reminder/get-all-daily-schedule', false);
};

const GetAllFeeds = payload => {
  return RestClient.Post('reminder/get-all-feeds', payload, false);
};

const AddFeedComment = payload => {
  return RestClient.Post('reminder/add-feed-comment', payload);
};

const GetAllFeedComment = payload => {
  return RestClient.Post('reminder/get-all-feed-comment', payload);
};

const DeleteItem = id => {
  return RestClient.Delete(`reminder/delete/${id}`);
};

const DeleteComment = id => {
  return RestClient.Delete(`reminder/delete-comment/${id}`);
};

export default {
  AddDailyItem,
  AddRemembranceItem,
  UpdateRemembranceItem,
  AddDailySchedule,
  AddUnplannedStop,
  GetAllReminders,
  GetAllUnplannedStopsReminders,
  GetAllRemembranceItems,
  GetAllCurrentMonthDailySchedule,
  GetAllDailySchedule,
  GetAllFeeds,
  AddFeedComment,
  GetAllFeedComment,
  DeleteItem,
  AddSocialFeed,
  DeleteComment,
};
