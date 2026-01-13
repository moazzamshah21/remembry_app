import {parsePhoneNumberFromString} from 'libphonenumber-js';

const validatePhoneNumber = (phoneNumber, country) => {
  try {
    const phoneNumberObj = parsePhoneNumberFromString(phoneNumber, country);
    if (phoneNumberObj && phoneNumberObj.isValid()) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
  return false;
};

const validateEmail = email => {
  try {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === true) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getFormatedTime = value => {
  const dateObject = new Date(value);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');
  const hours =
    dateObject.getHours() >= 12
      ? (dateObject.getHours() - 12).toString().padStart(2, '0')
      : dateObject.getHours().toString().padStart(2, '0');
  const minuts = dateObject.getMinutes().toString().padStart(2, '0');
  return `${hours == "00" ? "12" : hours}:${minuts} ${dateObject.getHours() >= 12 ? 'PM' : 'AM'}`;
};

export {validatePhoneNumber, validateEmail, getFormatedTime};
