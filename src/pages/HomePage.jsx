import Navbar from "../components/Navbar";
import WhatsappIcon from "../components/WhatsappIcon" 
import Footer from "../components/footer";

const HomePage = () => {

  const banner = "https://i.postimg.cc/TPkfw9dB/homepage.webp";

  return (
    <>
      <Navbar>
        <div className="overflow-hidden rounded-lg m-5 bg-[#1E1F24]">
          <div className="text-center bg-[#1E1F24] p-2">
            <p className="lg:text-3xl md:text-2xl pt-4 font-bold text-whit ">
              STREAM FAMILY
            </p>
          </div>

          <div className="flex justify-center">
          <img src={banner} alt="Logo" className=" r-4" />
          </div>
          
        </div>
      </Navbar>
      <WhatsappIcon></WhatsappIcon>
      <Footer />
    </>
  );
}

export default HomePage;
