import Image1 from "../assets/image4.png";
import Image2 from "../assets/image5.png";
import Image3 from "../assets/image6.png";
import Image4 from "../assets/image3.png";
import Avatar from "../assets/Ellipse.png"
import BgImg1 from "../assets/bg1.png";
// import BgImg2 from "../assets/bg2.png";
import BgImg3 from "../assets/bg3.png";
import BgImg4 from "../assets/bg4.png";
const testimonials = [
    {
        name: "John Fang",
        email: "wordfaang.com",
        text: "Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultrices massa turpis. Arcu pulvinar aenean nam laoreet nulla.",
        avatar: Avatar
    },
    {
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        avatar: Avatar
    },
    {
        name: "Mike Chen",
        email: "mike.chen@email.com",
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        avatar: Avatar
    }
];

const features = [
    {
        title: "Search Data",
        description: "Don't worry if your data is very large, the Data Warehouse provides a search engine, which is useful for making it easier to find data effectively saving time.",
        image: Image4,
        bgImage: BgImg1,
    },
    {
        title: "24 Hours Access",
        description: "Access is given 24 hours a full morning to night and meet again in the morning, giving you comfort when you need data when urgent.",
        image: Image1,
        bgImage: BgImg1,
    },
    {
        title: "Print Out",
        description: "Print out service gives you convenience if someday you need print data, just edit it all and just print it.",
        image: Image2,
        bgImage: BgImg3,
    },
    {
        title: "Security Code",
        description: "Data Security is one of our best facilities. Allows for your files to be safer. The file can be secured with a code or password that you created, so only you can open the file.",
        image: Image3,
        bgImage: BgImg4,
    }
];
export { testimonials, features };