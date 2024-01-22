// const firebase = require("firebase");
import { firebase } from '@firebase/app'
import "firebase/auth";
// Required for side-effects
require("firebase/firestore");
require("firebase/storage");
//require('firebase/auth');




// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAwbX3f3xHf4MYg4llRFHswE-uQIXtB0SI",
  authDomain: "illevels.firebaseapp.com",
  projectId: "illevels",
  storageBucket: "illevels.appspot.com",
  messagingSenderId: "771017843394",
  appId: "1:771017843394:web:33ea568b356d4f3523115b",
  measurementId: "G-ST1NEPC5P4"
});

var db = firebase.firestore();
var storage = firebase.storage();
var storageRef = storage.ref();


export  {db, firebase,storage, storageRef}
////uploading to storage
// Create the file metadata
// var metadata = {
//   contentType: 'image/jpeg'
// };

// // Upload file and metadata to the object 'images/mountains.jpg'
// var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
//ref.putString(message, 'base64')

// // Listen for state changes, errors, and completion of the upload.
// uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
//   (snapshot) => {
//     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case firebase.storage.TaskState.PAUSED: // or 'paused'
//         console.log('Upload is paused');
//         break;
//       case firebase.storage.TaskState.RUNNING: // or 'running'
//         console.log('Upload is running');
//         break;
//     }
//   }, 
//   (error) => {
//     // A full list of error codes is available at
//     // https://firebase.google.com/docs/storage/web/handle-errors
//     switch (error.code) {
//       case 'storage/unauthorized':
//         // User doesn't have permission to access the object
//         break;
//       case 'storage/canceled':
//         // User canceled the upload
//         break;

//       // ...

//       case 'storage/unknown':
//         // Unknown error occurred, inspect error.serverResponse
//         break;
//     }
//   }, 
//   () => {
//     // Upload completed successfully, now we can get the download URL
//     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//       console.log('File available at', downloadURL);
//     });
//   }
// );

////downloading files
// Create a reference with an initial file path and name
// Create a reference to the file we want to download
// var starsRef = storageRef.child('images/stars.jpg');

// // Get the download URL
// starsRef.getDownloadURL()
// .then((url) => {
//   // Insert url into an <img> tag to "download"
// })
// .catch((error) => {
//   // A full list of error codes is available at
//   // https://firebase.google.com/docs/storage/web/handle-errors
//   switch (error.code) {
//     case 'storage/object-not-found':
//       // File doesn't exist
//       break;
//     case 'storage/unauthorized':
//       // User doesn't have permission to access the object
//       break;
//     case 'storage/canceled':
//       // User canceled the upload
//       break;

//     // ...

//     case 'storage/unknown':
//       // Unknown error occurred, inspect the server response
//       break;
//   }
// });