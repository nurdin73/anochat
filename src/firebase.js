// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  child,
  push,
  update,
  remove,
} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEWNJ7_cfD0nemt0MtjSboghSOcON8uE0",
  authDomain: "anochat-c5b9b.firebaseapp.com",
  projectId: "anochat-c5b9b",
  storageBucket: "anochat-c5b9b.appspot.com",
  messagingSenderId: "153795062392",
  appId: "1:153795062392:web:0942ec90c5ed988f04db8d",
  databaseURL: "https://anochat-c5b9b-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const write = (data, path) => {
  const postRef = ref(database, path);
  set(postRef, data);
};

export const writes = (data, path) => {
  const postRef = ref(database, path);
  const send = push(postRef);
  return set(send, data);
};

export const change = (data, path) => {
  const dbRef = ref(database, path);
  return update(dbRef, data);
};

export const readAll = (path, callback) => {
  const reference = ref(database, path);
  onValue(reference, (snapshot) => {
    const data = [];
    snapshot.forEach((child) => {
      data.push({ data: child.val(), key: child.key });
    });
    callback(data);
  });
};

export const readOnce = async (path) => {
  const dbRef = ref(database);
  const req = await get(child(dbRef, path));
  if (!req.exists()) return;
  return req.val();
};

export const destroy = (path) => {
  const dbRef = ref(database, path);
  return remove(dbRef);
};
