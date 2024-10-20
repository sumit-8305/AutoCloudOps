import Link from 'next/link';
import { RocketLaunchIcon, DocumentIcon, ChartBarIcon, CloudIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header Section */}
      <header className="w-full bg-blue-700 text-white p-6 flex flex-col items-center justify-center" style={{ minHeight: '90vh' }}>
        <h1 className="text-6xl font-bold mb-4 text-center">Welcome to AutoCloudOps</h1>
        <p className="text-2xl text-center max-w-2xl mt-8">
          Your cloud management made simple with intuitive tools for managing EC2 instances, real-time monitoring, and seamless integration.
        </p>
      </header>

      {/* Main Content Section */}
      <main className="flex-grow flex flex-col items-center justify-start py-16">
        {/* Introduction Section */}
        <section className="text-center max-w-4xl mb-16 px-8">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">
            Manage Your Cloud Resources with Ease
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            AutoCloudOps simplifies your cloud management tasks, allowing you to create, monitor, and terminate your EC2 instances effortlessly.
            With real-time stats and powerful visualizations, you have full control over your cloud infrastructure in one intuitive interface.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            Whether you are a developer looking to streamline your workflow or a team leader managing multiple projects, AutoCloudOps provides the tools you need to optimize your cloud operations efficiently.
          </p>
          <p className="text-lg text-gray-600">
            Dive into the world of cloud automation with features that enhance productivity, reduce operational costs, and elevate your project management capabilities.
          </p>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mb-16 px-8">
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Real-Time Monitoring</h3>
            <p className="text-gray-600">
              Keep track of your cloud instances with real-time monitoring and get detailed insights into their performance. Our dashboards provide instant access to vital metrics, ensuring you are always in control.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Automated Setup</h3>
            <p className="text-gray-600">
              Quickly set up and deploy EC2 instances using automated scripts. Focus on your projects while we handle the backend for you, allowing for rapid scaling and deployment.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Seamless Integration</h3>
            <p className="text-gray-600">
              Integrate your cloud resources easily with other tools, enabling smooth workflows and better productivity. Connect with various APIs and services to enhance your cloud operations.
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

        {/* Additional Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mb-16 px-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center md:col-span-2">
            Upcoming Features
          </h2>
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
            <RocketLaunchIcon className="h-10 w-10 text-blue-600 mr-4" />
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Enhanced Reporting Tools</h3>
              <p className="text-gray-600">
                Gain deeper insights with advanced reporting capabilities, helping you make data-driven decisions.
              </p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
            <DocumentIcon className="h-10 w-10 text-blue-600 mr-4" />
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Advanced Cost Analysis</h3>
              <p className="text-gray-600">
                Optimize your budget with features that provide detailed cost analysis and recommendations for savings.
              </p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
            <ChartBarIcon className="h-10 w-10 text-blue-600 mr-4" />
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Integration with ML Services</h3>
              <p className="text-gray-600">
                Leverage machine learning services for intelligent automation and predictive analytics.
              </p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
            <CloudIcon className="h-10 w-10 text-blue-600 mr-4" />
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Multi-Cloud Management</h3>
              <p className="text-gray-600">
                Manage resources across multiple cloud providers seamlessly, enhancing flexibility and performance.
              </p>
            </div>
          </div>
        </section>

        {/* Feedback Form Section */}
        <section className="text-center mb-16 px-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            We Value Your Feedback
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Your insights are important to us! Help us improve AutoCloudOps by sharing your thoughts and experiences. We are dedicated to enhancing your cloud management experience.
          </p>
          <Link href="/feedback" className="bg-green-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition duration-300 ease-in-out">
            Give Feedback
          </Link>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="w-full bg-gray-200 text-gray-600 py-6 text-center">
        <p>© 2024 AutoCloudOps. All rights reserved.</p>
        <p>Contact Us: support@autocloudops.com</p>
      </footer>
    </div>
  );
}
