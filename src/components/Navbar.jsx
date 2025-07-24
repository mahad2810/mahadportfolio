import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close, profilePic } from "../assets";
import { ThemeToggle } from "./ui";

const Navbar = () => {
  const [active, setActive] = useState("");
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
    <motion.nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-300 ${
        scrolled
          ? "bg-glass-light dark:bg-glass-dark backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
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
          </Link>

          <div className="hidden sm:flex items-center gap-6">
            <ul className='list-none flex flex-row gap-10'>
              {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                active === nav.title ? "text-white dark:text-white" : "text-secondary dark:text-gray-300"
                } hover:text-accent-purple transition-colors duration-300 text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
              ))}
            </ul>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          <div className='sm:hidden flex flex-1 justify-end items-center gap-4'>
            {/* Mobile Theme Toggle */}
            <ThemeToggle />

            <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain cursor-pointer'
            onClick={() => setToggle(!toggle)}
            />

            <motion.div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-glass-light dark:bg-glass-dark backdrop-blur-md border border-white/20 dark:border-white/10 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl shadow-glass`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: toggle ? 1 : 0, scale: toggle ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
            >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                active === nav.title ? "text-white dark:text-white" : "text-secondary dark:text-gray-300"
                } hover:text-accent-purple transition-colors duration-300`}
                onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
