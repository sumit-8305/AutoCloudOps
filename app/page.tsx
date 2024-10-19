// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header Section */}
      <header className="w-full bg-blue-700 text-white p-6">
        <h1 className="text-4xl font-bold text-center">Welcome to Project Monitor</h1>
        <p className="text-center mt-2 text-xl">Your cloud management made simple</p>
      </header>

      {/* Main Content Section */}
      <main className="flex-grow flex flex-col items-center justify-start py-16">
        {/* Introduction Section */}
        <section className="text-center max-w-4xl mb-16 px-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Manage Your Cloud Resources with Ease
          </h2>
          <p className="text-lg text-gray-600">
            Project Monitor simplifies your cloud management tasks, allowing you to create, monitor, and terminate your EC2 instances effortlessly. 
            With real-time stats and powerful visualizations, you have full control over your cloud infrastructure in one intuitive interface.
          </p>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mb-16 px-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Real-Time Monitoring</h3>
            <p className="text-gray-600">
              Keep track of your cloud instances with real-time monitoring and get detailed insights into their performance.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Automated Setup</h3>
            <p className="text-gray-600">
              Quickly set up and deploy EC2 instances using automated scripts. Focus on your projects, while we handle the backend for you.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Seamless Integration</h3>
            <p className="text-gray-600">
              Integrate your cloud resources easily with other tools, enabling smooth workflows and better productivity.
            </p>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center mb-16 px-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Ready to Start Managing Your Projects?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Jump into the projects page to create and manage your cloud resources. View stats, monitor your EC2 instances, and take control of your infrastructure.
          </p>
          <Link href="/projects" className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out">
            Go to Projects
          </Link>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="w-full bg-gray-200 text-gray-600 py-6 text-center">
        <p>© 2024 Project Monitor. All rights reserved.</p>
        <p>Contact Us: support@projectmonitor.com</p>
      </footer>
    </div>
  );
}
