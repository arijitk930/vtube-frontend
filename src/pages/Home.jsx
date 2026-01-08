import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Home (Protected)
      </div>
    </>
  );
};

export default Home;
