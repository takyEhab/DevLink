// // src/pages/NotFound.jsx

// import { Link } from "react-router-dom";
// import { AlertTriangle } from "lucide-react";

// export default function NotFound() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
//       <div className="text-center max-w-md">
//         <AlertTriangle className="mx-auto text-red-500" size={60} />
//         <h1 className="text-6xl font-bold mt-4">404</h1>
//         <p className="text-xl mt-2">Oops! The page you're looking for doesn't exist.</p>
//         <Link
//           to="/"
//           className="inline-block mt-6 px-6 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition"
//         >
//           Go Back Home
//         </Link>
//       </div>
//     </div>
//   );
// }
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1f102a] to-[#11041a] text-white px-6">
      <div className="text-center max-w-lg">
        <AlertTriangle className="mx-auto text-purple-400" size={60} />
        <h1 className="text-6xl font-extrabold mt-6 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          404
        </h1>
        <p className="text-xl mt-4 text-gray-300">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium shadow-lg hover:opacity-90 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
