export default function Header() {
  return (
    <header className="flex justify-between items-center p-5">
      <h1 className="text-5xl">Studier</h1>
      <div className="flex items-center">
        <button className="bg-green-600 text-white text-xl p-4 rounded-md">+ Post</button>
        <p>User icon here</p>
      </div>
    </header>
  );
}