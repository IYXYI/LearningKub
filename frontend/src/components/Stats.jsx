export default function Stats({ stats = [] }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-xl text-blue-100">Industry-leading performance and features</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-8 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
              <div className="text-5xl mb-4">{stat.icon}</div>
              <p className="text-lg text-blue-100 mb-2">{stat.label}</p>
              <p className="text-4xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
