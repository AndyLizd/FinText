import * as firebase from "firebase";
import * as Google from "expo-google-app-auth";

// refer to: https://www.youtube.com/watch?v=GZKaVJEd4JU

// Config & Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB1T5vnOy7jM87MtqI3OUn5YurkEDBJU1w",
  authDomain: "fintext-10bd4.firebaseapp.com",
  projectId: "fintext-10bd4",
  storageBucket: "fintext-10bd4.appspot.com",
  messagingSenderId: "332583960183",
  appId: "1:332583960183:web:351c9d9c22aef82d385072",
};

firebase.initializeApp(firebaseConfig);

const signInWithGoogleAsync = async (setPage) => {
  try {
    const result = await Google.logInAsync({
      behavior: "web",
      androidClientId:
        "332583960183-8uav292p0ec0eanf33cpshgndi555olf.apps.googleusercontent.com",
      iosClientId:
        "332583960183-q4jj9ajrvmkllcsvgerrbfqp6ujbklss.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      onSignIn(result);
      setPage("main");
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};

const isUserEqual = (googleUser, firebaseUser) => {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
};

const onSignIn = (googleUser) => {
  console.log("Google Auth Response", googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
        // googleUser.getAuthResponse().id_token
        googleUser.idToken,
        googleUser.accessToken
      );

      // Sign in with credential from the Google user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(console.log("user signed in"))
        .catch((error) => {
          console.log("Fail to sign in with Google");
        });
    } else {
      console.log("User already signed-in Firebase.");
    }
  });
};

export { firebase, signInWithGoogleAsync };
