/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_JPsIUikjnhqZrYJzmDW3VzUN00bTtu0HrO');

export const bookTour = async (tourId) => {
  try {
    // get checkout session from API
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );

    // create the checkout form + charge the credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    showAlert('error', error);
  }
};
