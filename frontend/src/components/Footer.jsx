export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition">Features</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Security</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition">About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition">Docs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">API</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition">Twitter</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">GitHub</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Modern Web App. Built with React, Vite & TailwindCSS. Deployed on Fly.io.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
