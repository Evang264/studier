export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="border p-4 rounded-xl m-4">
      {children}
    </div>
  );
}