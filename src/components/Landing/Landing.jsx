import { useNavigate } from "react-router-dom";
import "./Landing.scss";
import { motion } from "framer-motion";
import Auth from "../Auth/Auth";
import { Modal } from "../Modal/Modal";
import { useState } from "react";
import Hero from "./Hero";
import { Features } from "./Features";
import { Footer } from "./Footer";

export default function Landing() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);


  return (
    <>
      <title>HueDex - Pokemon Color Palettes</title>
      <meta name="description" content="Generate stunning color palettes from pokemon sprites and export them for use in your own css." />

      <motion.div
        initial={{
          transition: {
            type: "spring",
            stiffness: 120,
            damping: 25,
          },
        }}
        exit={{
          opacity: 0.3,
          filter: "blur(5px)",
        }}
      >
        <div className="lp-container">
          <header className="lp-header">
            <h1>Huedex</h1>
            <button onClick={() => setIsAuthOpen(true)}>Sign In</button>
          </header>
          <section>
            <Hero />
          </section>
          <section>
            <Features />
          </section>
          <section>
            <Footer />
          </section>
        </div>
        <Modal
          isModalOpen={isAuthOpen}
          onClose={() => {
            setIsAuthOpen(false);
          }}
        >
          <Auth></Auth>
        </Modal>
      </motion.div>
    </>
  );
}
