'use client';
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import UserIcon from "./UserIcon";
import { logout } from "@/lib/login";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user } = useAuth();

  const [pfp, setPfp] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const f = () => {
      setPfp(user!.photoURL!);
      setLoading(false);
    };
    f();
  }, [user]);

  return (
    <header className="flex justify-between items-center p-5 sticky w-full backdrop-blur border-b dark:border-gray-600">
      <Link href="/" className="text-5xl">
        Studier
      </Link>
      <div className="flex items-center space-x-5">
        <button className="bg-green-600 hover:bg-green-800 text-white hover:text-gray-300 text-xl p-4 rounded-md">
          + Post
        </button>

        <Link href={`/user/${user!.uid}`}>
          {loading ? (
            <UserIcon size={60} />
          ) : (
            <Image
              src={pfp}
              width={60}
              height={60}
              alt="User profile picture"
            />
          )}
        </Link>
        <button
          className="p-4 rounded-md bg-red-600 hover:bg-red-800 text-xl"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
