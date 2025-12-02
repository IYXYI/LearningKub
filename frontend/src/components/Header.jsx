export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">⚡</span>
          <h1 className="text-2xl font-bold">Modern App</h1>
        </div>
        <ul className="hidden md:flex space-x-8">
          <li><a href="#" className="hover:text-blue-200 transition">Home</a></li>
          <li><a href="#" className="hover:text-blue-200 transition">Features</a></li>
          <li><a href="#" className="hover:text-blue-200 transition">About</a></li>
          <li><a href="#" className="hover:text-blue-200 transition">Contact</a></li>
        </ul>
        <button className="md:hidden text-white">☰</button>
      </nav>
    </header>
  )
}
