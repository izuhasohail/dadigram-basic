import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const WelcomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <Navbar />
      <main className="flex-grow flex items-center justify-center text-center p-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome!</h1>
        <p className="text-lg md:text-xl">You have successfully logged in to Dadigram Clone.</p>
      </main>
      <Footer />
    </div>
  );
};

export default WelcomePage;
