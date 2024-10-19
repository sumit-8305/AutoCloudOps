import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="flex justify-between items-center p-4 ">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview </h1>
      
      {/* Button to navigate to the AWS credentials page */}
      <Link className=" mb-4 "href="/projects/add-credentials">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Manage AWS Credentials
        </button>
      </Link>
    </div>
  );
}
