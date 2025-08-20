# Firebase Realtime Database Node.js Example

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-RealtimeDB-orange)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

A simple Node.js project demonstrating CRUD operations and real-time listeners with **Firebase Realtime Database** using the **Firebase Admin SDK**.

---

## Features

- 🔹 Initialize Firebase Admin SDK with a service account
- 🔹 Listen to database events:
  - `child_added` – when a new child is added
  - `child_changed` – when a child is updated
  - `child_removed` – when a child is removed
  - `value` – entire database snapshot
- 🔹 Perform CRUD operations:
  - Create: `set()`
  - Read: `once()`, `on()`
  - Update: `update()`
  - Delete: `remove()`
- 🔹 Query data by child properties (`orderByChild`, `equalTo`)
- 🔹 Conditional updates to prevent runtime errors

---

## Prerequisites

- Node.js >= 18
- Firebase project with Realtime Database enabled
- Service account JSON file

---

## Installation

```bash
# Clone repository
git clone https://github.com/sajibhub/firebase-realtime
cd firebase-realtime
```

# Install dependencies
```
npm install firebase-admin dotenv
```
## Create a .env file with your Firebase Database URL:
```
firebase_database_url=https://your-database-name.firebaseio.com
```
## Place your Firebase service account JSON file in the project root:
```
firebase.json
```
## Usage
Initialize Firebase
```
const admin = require("firebase-admin");
const serviceAccount = require("./firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.firebase_database_url
});

const db = admin.database();
const users = db.ref("users");
```
## Listen to Database Events
```
users.on("child_added", snapshot => console.log("New Data Added:", snapshot.val()));
users.on("child_changed", snapshot => console.log("Updated Data:", snapshot.val()));
users.on("child_removed", snapshot => console.log("Removed Data:", snapshot.val()));
users.on("value", snapshot => console.log("Entire Data:", snapshot.val()));
```
## CRUD Examples
```
// Create / Set data
users.child('user3').set({ name: "sds", password: "847" });

// Read data
users.child('user1').once('value', snapshot => console.log(snapshot.val()));

// Query by child field
users.orderByChild('name').equalTo('John').once('value', snapshot => console.log(snapshot.val()));

// Conditional Update
users.child('user1').once('value', snapshot => {
    if (snapshot.val()?.age >= 1) {
        users.child('user1').update({ age: 100 });
    }
});

// Remove data
users.child('user3').remove();
users.child('user3').update({ password: null });

// Remove entire users node
users.remove();
```

## Notes

✅ Validate snapshots before updating to avoid errors.

⚠️ on('value') retrieves the entire database—use wisely for large datasets.

⚠️ Deleting data with remove() is permanent.

