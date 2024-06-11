"use client";
import { db } from "./firebaseConfig";
import {
  collection,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  DocumentSnapshot,
} from "firebase/firestore";

export interface User {
  name: string;
  bio: string;
  pfp: string;
  school: string;
  calendly: string;
  posts: string[];
}

export async function createUser(
  userId: string,
  name: string,
  bio: string,
  school: string,
  calendly: string,
  pfp: string = ""
) {
  const docRef = await doc(collection(db, "users"), userId);
  await setDoc(docRef, {
    name: name,
    pfp: pfp,
    bio: bio,
    school: school,
    calendly: calendly,
    posts: [],
  });
}

export async function updateUser(userId: string, updateData: object) {
  await updateDoc(doc(db, "users", userId), updateData);
}

export async function fetchUser(userId: string): Promise<User> {
  const docSnapshot: DocumentSnapshot = await getDoc(
    doc(collection(db, "users"), userId)
  );

  if (!docSnapshot.exists())
    throw Error(`The requested user (UID: ${userId}) does not exist.`);

  return docSnapshot.data() as User;
}
