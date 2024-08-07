import Link from 'next/link';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">Welcome to Dadigram Clone</h1>
        <p className="text-lg md:text-xl mb-4 md:mb-6">
          Start growing your Instagram today with our AI-powered features.
        </p>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <Link href="/signup">
            <p className="bg-white text-indigo-600 px-4 py-2 md:px-6 md:py-3 rounded font-semibold hover:bg-gray-100">
              Get Started for Free
            </p>
          </Link>
          <Link href="/login">
            <p className="bg-white text-indigo-600 px-4 py-2 md:px-6 md:py-3 rounded font-semibold hover:bg-gray-100">
              Log In
            </p>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
