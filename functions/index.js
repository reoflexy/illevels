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

const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

const nodemailer = require('nodemailer');

initializeApp();
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.stripeIntent= onRequest(async(request, response) => {
    //logger.info("Hello logs!", {structuredData: true});
     let amount = request.body.data.amount
     let cart = request.body.data.cart
     let email = request.body.data.email

    //console.log(request.body.data.email)
    //console.log(amount)

    // Use an existing Customer ID if this is a returning customer.
    const customer = await stripe.customers.create();
  //const customer = 'richmondeyesan@gmail.com';
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2023-10-16'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount < 3000 ? amount+400: amount,
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
        publishableKey: 'pk_test_qblFNYngBkEdjEZ16jxxoWSM',
        amount: amount,
        email: email,
        cart: cart
        }
      });
  });

exports.addOrder = onRequest(async(request, response) => {
  //   logger.info("Hello logs!", {structuredData: true});
  let {email,cost, cart, address, postcode, deliveryTime, deliveryDate} = request.body.data
  let orderId = "#"+Math.floor(Math.random() * (9999999-111111) +111111)

  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'richmondeyesan04@gmail.com',
        pass: 'izyxkkyfnadqlvhn'
    }
});

const mailOptions = {
  from: `Ilevels@gmail.com`,
  to: email,
  subject: 'Order Placed Successfully',
  html: `<h1>Order Confirmation</h1>
   <p> <b>Your order has been saved, thank you. </p>`
};


const mailOptions2 = {
  from: `Ilevels@gmail.com`,
  to: 'richmondeyesan@gmail.com',
  subject: 'New Order Placed',
  html: `<h1>Order Confirmation</h1>
   <p> <b>A new order has been placed.</p>`
};

   await getFirestore()
    .collection("orders")
    .doc(orderId)
    .set({
     id: orderId,
    //id: uuidv4(),
    added: new Date(),
    cost: cost < 30 ? cost+4 : cost,
    email: email,
    items: cart,
    address: address,
    postcode: postcode,
    deliveryTime: deliveryTime,
    deliveryDate: deliveryDate,
    status: 'in progress'
    
    })

    //send email to customer 
    await transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
          console.log(error)
          return
      }
      console.log("Sent!")
    });

    //send email to admin 
    await transporter.sendMail(mailOptions2, (error, data) => {
      if (error) {
          console.log(error)
          return
      }
      console.log("Sent!")
    });

    response.json({
      data:{
      message: 'success',
      //response:response
      }
    });
      });


exports.callTest = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
    response.json({data: "Hello from Firebase!"});
    });