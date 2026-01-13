import RestClient from '../RestClient';

const GetPaymentIntent = payload => {
  return RestClient.Post('payment/payment-intent', payload);
};

const AddPayment = payload => {
  return RestClient.Post('payment/add-payment', payload);
};

export default { GetPaymentIntent, AddPayment };