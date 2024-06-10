'use client';
import { GoogleLogin } from "@/lib/login";
import { FcGoogle } from 'react-icons/fc';

async function handleClick(): Promise<void> {
  const user = await GoogleLogin()!;
  if (user === null) return;  // user did not login
  console.log(user);
}

export default function GoogleLoginButton() {
  return (
    <button className="flex items-center p-3 bg-white text-black rounded hover:bg-gray-200 transition-colors" onClick={handleClick}>
      <FcGoogle className="mr-2 text-2xl" />
      <p>Login with Google</p>
    </button>
  );
}
