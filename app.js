const admin = require("firebase-admin");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config()

// Load Firebase service account key
const serviceAccountPath = "./firebase.json";

if (!fs.existsSync(serviceAccountPath)) {
    process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.firebase_database_url
});

const db = admin.database();
const users = db.ref("users");
//any data added catch the exception
users.on("child_added", (snapshot) => {
    console.log("New Data Added:", snapshot.val());
});
//any data changed catch the exception
users.on("child_changed", (snapshot) => {
    console.log("Updated Data:", snapshot.val());
});
//any data removed catch the exception
users.on("child_removed", (snapshot) => {
    console.log("Removed Data:", snapshot.val());
});

//db have all data catch any movement
users.on("value", (snapshot) => {
    console.log("Entire Data:", snapshot.val());
});


// Write initial test data (optional)
users.child('user3').set({ name: "sds", password: "847" })

// find data with id
users.child('user1').once('value', (snapshot) => console.log(snapshot.val()))

//find data with any fields 
users.orderByChild('name').equalTo('John').once('value', (snapshot) => console.log(snapshot.val()))

// update use conditions on children
users.child('user1').once('value', (snapshot) => {
    if (snapshot.val().age >= 1) {
        users.child('user1').update({
            age: 100
        })
    }
})


// user removed from db
users.child('user3').remove()

// // null mean removed any filed from users
users.child('user3').update({ password: null })

// db all data remove update create read
users.remove()
users.update()
users.set()
users.once('value', (snapshot) => console.log(snapshot.val()))

