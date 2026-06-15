import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { menu, close, profilePic } from "../assets";

const Navbar = ({ activeSection, setActiveSection }) => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`${
          styles.paddingX
        } w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-300 ${
          scrolled
            ? "glass backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
          <div
            className='flex items-center gap-2 cursor-pointer'
            onClick={() => {
              setActiveSection("dashboard");
              window.scrollTo(0, 0);
            }}
          >
            <div id="profile-img" className="rounded-full overflow-hidden">
              <img src={profilePic} alt='Mahad Iqbal' className='w-9 h-9 object-cover' />
            </div>

            <p className='text-white text-[18px] font-bold cursor-pointer flex '>
              Mahad &nbsp;
              <span className='sm:block hidden'> |  Mahad Iqbal</span>
            </p>
          </div>

          <div className='flex flex-1 justify-end items-center'>
            <img
              src={toggle ? close : menu}
              alt='menu'
              className='w-[28px] h-[28px] object-contain cursor-pointer'
              onClick={() => setToggle(!toggle)}
            />
          </div>
        </div>
      </motion.nav>

      {/* Overlay - outside nav so it's independent of scroll state */}
      {toggle && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setToggle(false)}
        />
      )}

      {/* Sidebar - outside nav with solid background via inline style */}
      <motion.div
        className="fixed top-0 right-0 h-full w-72 sm:w-80 border-l border-white/10 z-50 flex flex-col"
        style={{ backgroundColor: 'rgba(10, 10, 26, 0.97)' }}
        initial={{ x: "100%" }}
        animate={{ x: toggle ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={profilePic} alt='Mahad Iqbal' className='w-10 h-10 rounded-full object-cover' />
              <div>
                <h3 className="text-white font-semibold">Mahad Iqbal</h3>
                <p className="text-gray-400 text-sm">AI/ML Engineer</p>
              </div>
            </div>
            <button
              onClick={() => setToggle(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <img src={close} alt="close" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-6">
          <ul className='list-none flex flex-col gap-2'>
            {navLinks.map((nav) => (
              <li key={nav.id}>
                <button
                  className={`w-full text-left p-3 rounded-lg font-medium transition-all duration-300 ${
                    activeSection === nav.id
                      ? "bg-accent-purple text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                  onClick={() => {
                    setToggle(false);
                    setActiveSection(nav.id);
                  }}
                >
                  {nav.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <p className="text-gray-400 text-sm text-center">
            © 2024 Mahad Iqbal
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
