export default function Header() {
  return (
    <header className="bg-gray-950 border-b border-gray-800 p-4 flex justify-between items-center">
      <h2 className="text-lg font-medium">Bienvenido</h2>

      <div className="flex items-center gap-4">
        <img
          src="https://api.dicebear.com/7.x/initials/svg?seed=Seba"
          alt="avatar"
          className="w-9 h-9 rounded-full border border-gray-700"
        />
      </div>
    </header>
  );
}
