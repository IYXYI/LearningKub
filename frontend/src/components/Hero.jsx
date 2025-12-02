export default function Hero({ title, description }) {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          {title || 'Modern Web Application'}
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
          {description || 'A full-stack application built with React, Vite, Express, and deployed on Kubernetes and Fly.io'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition transform hover:scale-105">
            Get Started
          </button>
          <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}
