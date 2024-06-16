"use client";
import { auth } from "@/lib/firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { fetchUser, createUser } from "@/lib/database";

export async function GoogleLogin() {
  const provider = new GoogleAuthProvider();
  try {
    const user = (await signInWithPopup(auth, provider)).user;
    const fetchedUser = await fetchUser(user.uid);
    if (!fetchedUser) {
      // user does not exist
      createUser(
        user.uid,
        user.displayName ?? "Unnamed User",
        "",
        "",
        "",
        user.photoURL ??
          "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
      );
    }
  } catch (e: any) {
    if (e.code === "auth/popup-closed-by-user") {
      console.info("Google popup closed by user");
      return;
    }
    throw e;
  }
}

export async function logout() {
  await signOut(auth);
}
