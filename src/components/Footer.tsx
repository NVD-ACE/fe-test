import Logo from '../assets/Logo.png';
import Mess from '../assets/mess.png';

import {BsGithub, BsInstagram, BsYoutube} from "react-icons/bs";
const Footer = () => {
  return (
      <footer className="bg-white py-20">
        <div className="max-w-7xl mx-auto pt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="mx-auto text-center md:text-left">
              <div className="flex items-center mb-6">
                <div className="w-full max-w-[50px]">
                  <img alt="Logo"  src={Logo} className="w-9 object-cover"/>
                </div>
                <h3 className="font-semibold text-text">DataWarehouse</h3>
              </div>
              <address className="not-italic text-gray-600 leading-relaxed ">
                <span className="font-semibold">
                  Warehouse Society, 234<br/>
                Bahagia Ave Street PRBW 29281<br/>
                </span>

                <br/>
                info@warehouse.project<br/>
                1-232-3434 (Main)
              </address>
            </div>

            <div className="lg:text-left pl-16">
              <h3 className="font-semibold text-text mb-4">About</h3>
              <ul className="space-y-3 text-gray-600 ">
                <li><a href="#" className="hover:text-purple-600">Profile</a></li>
                <li><a href="#" className="hover:text-purple-600">Features</a></li>
                <li><a href="#" className="hover:text-purple-600">Careers</a></li>
                <li><a href="#" className="hover:text-purple-600">DW News</a></li>
              </ul>
            </div>

            <div className="lg:text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Help</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-purple-600">Support</a></li>
                <li><a href="#" className="hover:text-purple-600">Sign up</a></li>
                <li><a href="#" className="hover:text-purple-600">Guide</a></li>
                <li><a href="#" className="hover:text-purple-600">Reports</a></li>
                <li><a href="#" className="hover:text-purple-600">Q&A</a></li>
              </ul>
            </div>

            <div className="lg:text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Social Media</h3>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <span className="text-gray-600">
                    <BsYoutube/>
                  </span>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <span className="text-gray-600">
                    <BsInstagram/>
                  </span>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <span className="text-gray-600">
                    <BsGithub/>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © Datawarehouse™, 2020. All rights reserved.<br />
              Company Registration Number: 21479524.
            </p>
            <div className="mt-4 md:mt-0">
             <img src={Mess} alt={""} className={"w-10"}/>
            </div>
          </div>
        </div>
      </footer>
  );
};
export default Footer;
