"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/store/mockData";
import confetti from "canvas-confetti";

interface CardDetailProps {
  kartuData: Record<string, Card>;
}

const CardDetail: React.FC<CardDetailProps> = ({ kartuData }) => {
  const kartu = kartuData ? kartuData["1"] : null;
  const [isOpen, setIsOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [balloonPositions, setBalloonPositions] = useState<number[]>([]);
  const [balloonImages, setBalloonImages] = useState<string[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Generate random left positions for balloons only once
    const positions = [...Array(20)].map(() => Math.random() * 100);
    setBalloonPositions(positions);

    // Generate random images for the balloons (ballon1.svg, ballon2.svg, or ballon3.svg)
    const images = [...Array(20)].map(() => {
      const randomImage = `ballon${Math.floor(Math.random() * 3) + 1}.svg`;
      return randomImage;
    });
    setBalloonImages(images);
  }, []);

  const handleCardCoverClick = () => {
    if (timeoutId) {
      clearTimeout(timeoutId); // Clear any existing timeout
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setShowBalloons(true);
    setIsOpen(!isOpen);

    // Set a new timeout to reset balloons
    const newTimeoutId = setTimeout(() => {
      setShowBalloons(false);
    }, 10000);

    setTimeoutId(newTimeoutId); // Save the timeout ID
  };

  const handleCardContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsCardOpen(!isCardOpen);
  };

  const cardCoverColor =
    kartu && kartu.type === "Ulang tahun"
      ? "bg-pink-500"
      : kartu && kartu.type === "Valentine"
      ? "bg-rose-400"
      : kartu && kartu.type === "Pernikahan"
      ? "bg-yellow-400"
      : kartu && kartu.type === "Hari Raya"
      ? "bg-green-400"
      : kartu && kartu.type === "Kelulusan"
      ? "bg-green-400"
      : kartu && kartu.type === "Tahun Baru"
      ? "bg-orange-400"
      : "";

  return (
    <div className="flex justify-center items-center h-screen relative bg-gradient-to-t from-pink-500 to-pink-300 overflow-hidden">
      {/* Balon animasi */}
      {showBalloons && (
        <motion.div
          className="absolute w-full h-full pointer-events-none z-50"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {balloonPositions.map((left, index) => (
            <motion.img
              key={index}
              src={`/${balloonImages[index]}`} // Random image for each balloon
              alt="Balon"
              className="absolute w-48 bottom-0"
              style={{
                left: `${left}%`,
              }}
              initial={{
                y: "100%",
              }}
              animate={{
                y: "-1000%",
              }}
              transition={{
                duration: 5 + Math.random() * 2,
                delay: Math.random() * 1.5,
                repeat: 0,
              }}
            />
          ))}
        </motion.div>
      )}

      <motion.div
        onClick={handleCardCoverClick}
        className={`w-10/12 md:w-3/12 h-[500px] card-surprise rounded-md shadow-md bg-white overflow-hidden z-40`}
        initial={{ x: 0, rotate: 0 }}
        animate={{ x: isOpen ? "-100%" : 0, rotate: isOpen ? 10 : 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <div
          className={`relative w-full h-full rounded-md ${cardCoverColor}`}
          style={{ minHeight: "500px" }}
        >
          <img
            src={"/bg.webp"}
            alt=""
            className="absolute object-cover w-full h-full"
          />
        </div>
      </motion.div>

      {kartu && (
        <motion.div
          onClick={handleCardContentClick}
          transition={{ duration: 1, type: "spring" }}
          animate={{ x: isOpen ? "3%" : 0, rotate: isOpen ? -7 : 0 }}
          style={{
            backgroundImage: `url(${kartu.gambar})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute w-10/12 md:w-3/12 h-[500px] mx-auto overflow-hidden shadow-md bg-white rounded-lg border flex justify-end"
        >
          <div
            onClick={handleCardCoverClick}
            className="absolute inset-0 w-full h-full z-30"
          ></div>

          {/* Topi */}
          <motion.div
            animate={{ rotate: isOpen ? -7 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-24 h-24 rounded-full top-0 left-1/3 z-20"
          >
            <img
              src="/hat.svg"
              alt="Hat"
              className="absolute object-cover w-full h-full"
            />
          </motion.div>

          <div className="w-full px-3">
            <motion.div className="relative flex flex-col justify-end h-full pb-3 z-30">
              <motion.div
                onClick={handleCardContentClick}
                transition={{ duration: 0.1, type: "spring" }}
                layout
                className="absolute w-full bg-white p-3 rounded-lg"
              >
                <motion.div
                  transition={{ duration: 0.1, type: "spring" }}
                  layout="position"
                  className="flex justify-between items-center"
                >
                  <div className="flex gap-2 text-2xl font-bold capitalize">
                    <h1>{kartu.subject}</h1>
                    <h1>{kartu.subjectA ? `& ${kartu.subjectA}` : ""}</h1>
                  </div>
                </motion.div>
                {isCardOpen && (
                  <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
                    <p className="uppercase font-medium text-sm">
                      {kartu.tanggal}
                    </p>
                    <motion.div className="w-full py-3 h-64 overflow-scroll">
                      <p>&apos; {kartu.ucapan} &apos;</p>
                    </motion.div>
                  </motion.div>
                )}
                <motion.div
                  layout="position"
                  className="flex justify-between text-xs mt-3"
                >
                  
                  <motion.p layout="position" className="text-gray-300">
                    Tap untuk {isCardOpen ? "sembunyikan" : "munculkan"}
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CardDetail;
