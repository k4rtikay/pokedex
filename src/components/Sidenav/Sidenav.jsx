import { first151Pokemon, getFullPokedexNumber } from "../../utils";
import { useState, useEffect, useRef } from "react";
import "./Sidenav.scss";
import { usePokedex } from "../../Context/PokedexContext";
import { motion, AnimatePresence } from "framer-motion";
import SearchList from "./SearchList";

export function Sidenav({ setIsSearchActive, isSearchActive }) {
  const sidenavref = useRef();
  const { isDesktop } = usePokedex();

  const variants = {
    hidden: {
      x: "100%",
      transition: { duration: 0.3, ease: [0.85, 0, 0.15, 1] },
    },
    visible: {
      x: 0,
      transition: { duration: 0.3, ease: [0.85, 0, 0.15, 1] },
    },
  };

  useEffect(() => {
    if (isSearchActive) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [isSearchActive]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidenavref.current && !sidenavref.current.contains(event.target)) {
        setIsSearchActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidenavref]);

  return (
    <AnimatePresence>
      {(isSearchActive || isDesktop) && (
        <motion.nav
          className={`sidenav`}
          variants={variants}
          initial={"hidden"}
          animate={"visible"}
          exit={"hidden"}
          key={"sidenav"}
          ref={sidenavref}
        >
          <header className="sn-header">
            <p>Search</p>
            <button
              aria-label="button to close the search sidemenu"
              onClick={() => {
                setIsSearchActive(false);
              }}
            >
              <span className="material-symbols-rounded">close</span>
            </button>
          </header>
          <SearchList></SearchList>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
