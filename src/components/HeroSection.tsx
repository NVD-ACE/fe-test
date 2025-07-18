
import HeroImage from "../assets/heroimg.png"; // Adjust the path as necessary
const HeroSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-6xl font-bold text-text mb-6">
              Save your data storage here.
            </h1>
            <p className="text-lg xl:max-w-[380px] text-text-gray mb-8 leading-relaxed">
              Data Warehouse is a data storage area that has been tested for
              security, so you can store your data here safely but not be afraid
              of being stolen by others.
            </p>
            <button className="bg-primary text-white px-8 py-3 rounded-4xl hover:bg-purple-700 transition-colors inline-flex items-center">
              Learn more
            </button>
          </div>
          <div className="">
            <img className="w-full" src={HeroImage} alt="HeroImage" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
