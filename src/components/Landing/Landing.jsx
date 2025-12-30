import { useNavigate } from "react-router-dom";
import "./Landing.scss";
import { motion } from "framer-motion";
import { useAuth } from "../../Context/AuthContext";
import Auth from "../Auth/Auth";
import { Modal } from "../Modal/Modal";
import { useState } from "react";
import { usePokedex } from "../../Context/PokedexContext";
import Hero from "./Hero";

export default function Landing() {
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { isDesktop } = usePokedex();

  return (
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
        <Hero/>
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
  );
}
