import {ArrowRight} from "lucide-react";
import {features} from "../data/data.ts";
const FeatureCard = ({ title, description, image, bgImage} : {
    title: string;
    description: string;
    image: string;
    bgImage: string;
}) => {
    return (
        <div className="w-full h-[420px] relative flex flex-col items-center justify-center xl:flex-row xl:justify-start mx-auto ">
            {/* Background image */}
            <div className="hidden xl:flex absolute -right-12 m-12">
                <img src={bgImage} alt="bgImage" className="object-cover w-full h-full" />
            </div>

            {/* Feature image */}
            <div className="max-w-[120px] xl:mr-7 xl:max-w-[232px]">
                <img src={image} alt="" />
            </div>

            {/* Content */}
            <div className="max-w-[220px] z-10 text-left text-gray">
                <h3 className="text-2xl font-bold mb-4 text-text-gray  ">{title}</h3>
                <p className="font-light italic mb-4">{description}</p>
                <div className="flex items-center gap-x-2 group">
                    <a className="text font-bold" href="#">Learn more</a>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform duration-200" />
                </div>
            </div>
        </div>
    );
};

// Features Section Component
const FeaturesSection = () => {

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 text-text-gray">
                    <h2 className="text-4xl font-bold mb-4">Features</h2>
                    <p className="text-text max-w-[584px] mx-auto">
                        Some of the features and advantages that we provide for those of you who store data in this Data Warehouse.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};
export default FeaturesSection;
