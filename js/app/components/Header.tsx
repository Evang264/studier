import UserIcon from "./UserIcon";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-5 fixed w-full backdrop-blur border-b dark:border-gray-600">
      <h1 className="text-5xl">Studier</h1>
      <div className="flex items-center">
        <button className="bg-green-600 hover:bg-green-800 text-white hover:text-gray-300 text-xl p-4 rounded-md mr-5">+ Post</button>
        <UserIcon isClickable={true} size="6xl" />
      </div>
    </header>
  );
}