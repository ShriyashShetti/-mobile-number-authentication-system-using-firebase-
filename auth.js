// Import the necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALQ879oLazgqeBPbxbf5yX9MZ1Dgw8SG0",
  authDomain: "mobile-number-authentica-b2298.firebaseapp.com",
  projectId: "mobile-number-authentica-b2298",
  storageBucket: "mobile-number-authentica-b2298.firebasestorage.app",
  messagingSenderId: "112268880379",
  appId: "1:112268880379:web:10e84cab62a90269e3835e",
  measurementId: "G-5082261RB4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Function to send OTP
function sendVerificationCode() {
  const phoneNumber = document.getElementById('phoneNumber').value;
  const appVerifier = new RecaptchaVerifier('sendVerificationCode', {
    size: 'invisible', // Invisible reCAPTCHA
    callback: (response) => {
      // reCAPTCHA solved, allow OTP sending
    }
  }, auth);

  // Send OTP to the entered phone number
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // Store confirmationResult for later use
      window.confirmationResult = confirmationResult;
      alert('OTP sent!');
    })
    .catch((error) => {
      console.error('Error during phone number sign-in:', error);
      alert('Error: ' + error.message);
    });
}

// Function to verify OTP
function verifyCode() {
  const otp = document.getElementById('otp').value;
  const confirmationResult = window.confirmationResult;

  // Verify the OTP entered by the user
  confirmationResult.confirm(otp)
    .then((result) => {
      // Signed in successfully
      const user = result.user;
      alert('User signed in successfully: ' + user.phoneNumber);
    })
    .catch((error) => {
      console.error('Error verifying OTP:', error);
      alert('Error: ' + error.message);
    });
}
