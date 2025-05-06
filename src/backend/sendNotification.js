const admin = require("firebase-admin");
const serviceAccount = require("./service_account.json"); // replace with actual path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Send to a specific device
const message = {
  notification: {
    title: "Hello!",
    body: "This is a test notification."
  },
  token: "DEVICE_FCM_TOKEN" // replace with real token
};

admin.messaging().send(message)
  .then((response) => {
    console.log("Successfully sent message:", response);
  })
  .catch((error) => {
    console.error("Error sending message:", error);
  });
