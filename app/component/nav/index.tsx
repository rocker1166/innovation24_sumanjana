"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";


interface MenuItem {
  title: string;
  path?: string;
  submenu?: { title: string; path: string }[];
}

const menuData: MenuItem[] = [
  { title: "Home", path: "/" },
  {
    title: "Menu",
    submenu: [
      { title: "Pizza", path: "/menu/pizza" },
      { title: "Burgers", path: "/menu/burgers" },
      { title: "Sushi", path: "/menu/sushi" },
      { title: "Desserts", path: "/menu/desserts" },
    ],
  },
  { title: "Restaurants", path: "/restaurants" },
  { title: "Special Offers", path: "/offers" },
  { title: "Contact", path: "/contact" },
];

const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);

  const handleSubmenu = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <header className="sticky top-0 left-0 z-50 flex w-full h-20 items-center  backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90   border-blue-200 ">
      <div className="px-4 w-full relative flex items-center justify-between">
        <div className="w-fit">
          <Link href="/" className="header-logo w-full py-2 font-bold text-sm sm:text-lg text-black dark:text-white flex justify-center items-center flex-row gap-2">
            <Image
              src="/Logo.svg"
              alt="logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          FoodieExpress
          </Link>
        </div>

        <div className="flex items-center">
          <nav
            className={`absolute top-full left-0 w-full  py-4 px-6 transition-all duration-300 lg:static lg:w-auto lg:py-0 lg:px-0 ${
              navbarOpen ? "block" : "hidden lg:block"
            }`}
          >
            <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
              {menuData.map((menuItem, index) => (
                <li key={index} className="group relative py-2 lg:py-0">
                  {menuItem.path ? (
                    <Link
                      href={menuItem.path}
                      className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {menuItem.title}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => handleSubmenu(index)}
                        className="flex items-center text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {menuItem.title}
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <div
                        className={`lg:absolute lg:left-0 lg:mt-2 lg:w-48 lg:bg-white lg:dark:bg-gray-900 lg:shadow-lg lg:rounded-md lg:py-2 ${
                          openIndex === index ? "block" : "hidden"
                        }`}
                      >
                        {menuItem.submenu?.map((submenuItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={submenuItem.path}
                            className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            {submenuItem.title}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="lg:hidden ml-4 text-black dark:text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

