const firebaseConfig = {
  apiKey: "AIzaSyCDkEmSap9lOABdq9ir6AH59pbVtP1uVnw",
  authDomain: "accessibility-website.firebaseapp.com",
  databaseURL: "https://accessibility-website-default-rtdb.firebaseio.com",
  projectId: "accessibility-website",
  storageBucket: "accessibility-website.appspot.com",
  messagingSenderId: "1006117391629",
  appId: "1:1006117391629:web:a36c451267e58e3d1b3444",
  measurementId: "G-VESWGQMGWH"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var db=firebase.firestore();
