import { Link } from "react-router-dom";
import { UserX } from "lucide-react";

export default function DeveloperNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1f102a] to-[#11041a] text-white px-6">
      <div className="text-center max-w-lg">
        <UserX className="mx-auto text-purple-400" size={60} />
        <h1 className="text-3xl font-bold mt-6">
          Developer Not Found
        </h1>
        <p className="text-lg mt-4 text-gray-300">
          We couldn't find the developer you're looking for.
        </p>
        <Link
          to="/developers"
          className="mt-8 inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium shadow-lg hover:opacity-90 transition"
        >
          Browse Developers
        </Link>
      </div>
    </div>
  );
}
