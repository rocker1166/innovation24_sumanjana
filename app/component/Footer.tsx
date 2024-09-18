import React from 'react'
import { Twitter, Facebook, Dribbble, Github } from 'lucide-react'

const Footer = () => {
  return (
    <footer className=" pt-12 pb-8 text-white border-y-1 border-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
            <h4 className="text-2xl font-bold text-white  mb-4">Lets keep in touch!</h4>
            <p className=" mb-6">
              Find us on any of these platforms, we respond within 1-2 business days.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Facebook, Dribbble, Github].map((Icon, index) => (
                <button key={index} className="  hover:text-blue-500 p-2 rounded-full shadow transition duration-300">
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
            <h5 className="text-lg font-semibold  mb-4">Useful Links</h5>
            <ul className="space-y-2">
              {['About Us', 'Blog', 'Github', 'Free Products'].map((item, index) => (
                <li key={index}>
                  <a href="#" className=" hover:text-gray-800 transition duration-300">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="w-full lg:w-1/3">
            <h5 className="text-lg font-semibold mb-4">Other Resources</h5>
            <ul className="space-y-2">
              {['MIT License', 'Terms & Conditions', 'Privacy Policy', 'Contact Us'].map((item, index) => (
                <li key={index}>
                  <a href="#" className=" hover:text-gray-800 transition duration-300">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-white text-sm">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer