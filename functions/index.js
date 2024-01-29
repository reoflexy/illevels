/**
 * Import function triggers from their respective submodules:
 *
  const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const {onCall} = require("firebase-functions/v2/https");
const stripe = require('stripe')('sk_test_26PHem9AhJZvU623DfE1x4sd');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.stripeIntent= onRequest(async(request, response) => {
    //logger.info("Hello logs!", {structuredData: true});

    // Use an existing Customer ID if this is a returning customer.
    const customer = await stripe.customers.create();
  //const customer = 'richmondeyesan@gmail.com';
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2023-10-16'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 10992,
    currency: 'gbp',
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

    //response.send("Hello from Firebase!");
     response.json({
        data:{
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: 'pk_test_qblFNYngBkEdjEZ16jxxoWSM'
        }
      });
  });


exports.callTest = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
    response.json({data: "Hello from Firebase!"});
    });