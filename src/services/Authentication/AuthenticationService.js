// import RestClient from '../RestClient';

// const Login = payload => {
//   return RestClient.Post('auth/login', payload);
// };

// const FaceIDLogin = payload => {
//   return RestClient.Post('auth/faceID-login', payload);
// };

// const Register = payload => {
//   return RestClient.Post('auth/register', payload);
// };

// const VerifyEmailCode = payload => {
//   return RestClient.Post('auth/verify-email-code', payload);
// };

// const ResendEmailCode = payload => {
//   return RestClient.Post('auth/resend-email-code', payload);
// };

// const SendForgotPasswordCode = payload => {
//   return RestClient.Post('auth/send-forgot-password-code', payload);
// };

// const ForgotPassword = payload => {
//   return RestClient.Post('auth/forgot-password', payload);
// };

// const VerifyForgotPasswordCode = payload => {
//   return RestClient.Post('auth/verify-forgot-password-code', payload);
// };


// export default { Login, FaceIDLogin, Register, VerifyEmailCode, ResendEmailCode, SendForgotPasswordCode, ForgotPassword, VerifyForgotPasswordCode };


import RestClient from '../RestClient';

const Login = payload => {
  return RestClient.Post('auth/login', payload);
};

const FaceIDLogin = payload => {
  return RestClient.Post('auth/faceID-login', payload);
};

const SocialLogin = payload => {
  return RestClient.Post('auth/social-login', payload);
};

const Register = payload => {
  return RestClient.Post('auth/register', payload);
};

const VerifyEmailCode = payload => {
  return RestClient.Post('auth/verify-email-code', payload);
};

const ResendEmailCode = payload => {
  return RestClient.Post('auth/resend-email-code', payload);
};

const SendForgotPasswordCode = payload => {
  return RestClient.Post('auth/send-forgot-password-code', payload);
};

const ForgotPassword = payload => {
  return RestClient.Post('auth/forgot-password', payload);
};

const VerifyForgotPasswordCode = payload => {
  return RestClient.Post('auth/verify-forgot-password-code', payload);
};

export default { 
  Login, 
  FaceIDLogin, 
  SocialLogin,
  Register, 
  VerifyEmailCode, 
  ResendEmailCode, 
  SendForgotPasswordCode, 
  ForgotPassword, 
  VerifyForgotPasswordCode 
};