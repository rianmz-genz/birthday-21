"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/store/mockData';
import confetti from 'canvas-confetti';
interface CardDetailProps {
  kartuData: Record<string, Card>;
}

const CardDetail: React.FC<CardDetailProps> = ({ kartuData }) => {
  const kartu = kartuData ? kartuData['1'] : null;
  const [isOpen, setIsOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);

  const handleCardCoverClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setIsOpen(!isOpen);
  };

  const handleCardContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsCardOpen(!isCardOpen);
  };

  const cardCoverColor =
    kartu && kartu.type === 'Ulang tahun'
      ? 'bg-pink-500'
      : kartu && kartu.type === 'Valentine'
      ? 'bg-rose-400'
      : kartu && kartu.type === 'Pernikahan'
      ? 'bg-yellow-400'
      : kartu && kartu.type === 'Hari Raya'
      ? 'bg-green-400'
      : kartu && kartu.type === 'Kelulusan'
      ? 'bg-green-400'
      : kartu && kartu.type === 'Tahun Baru'
      ? 'bg-orange-400'
      : '';

  return (
    <div className="flex justify-center items-center h-screen relative bg-gradient-to-t from-pink-500 to-pink-300 overflow-hidden">
      <motion.div
        onClick={handleCardCoverClick}
        className={`w-10/12 md:w-3/12 h-[500px] card-surprise rounded-md shadow-md bg-white overflow-hidden z-50`}
        initial={{ x: 0, rotate: 0 }}
        animate={{ x: isOpen ? '-100%' : 0, rotate: isOpen ? 10 : 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div className={`relative w-full h-full rounded-md ${cardCoverColor}`} style={{ minHeight: '500px' }}>
          <img src={'/bg.webp'} alt="" className="absolute object-cover w-full h-full" />
        </div>
      </motion.div>

      {kartu && (
        <motion.div
          onClick={handleCardContentClick}
          transition={{ duration: 1, type: 'spring' }}
          animate={{ x: isOpen ? '3%' : 0, rotate: isOpen ? -7 : 0 }}
          style={{
            backgroundImage: `url(${kartu.gambar})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="absolute w-10/12 md:w-3/12 h-[500px] mx-auto overflow-hidden shadow-md bg-white rounded-lg border flex justify-end"
        >
          <div onClick={handleCardCoverClick} className="absolute inset-0 w-full h-full z-30"></div>
          <div className="w-full px-3">
            <motion.div className="relative flex flex-col justify-end h-full pb-3 z-40">
              <motion.div onClick={handleCardContentClick} transition={{ duration: 0.1, type: 'spring' }} layout className="absolute w-full bg-white p-3 rounded-lg">
                <motion.div transition={{ duration: 0.1, type: 'spring' }} layout="position" className="flex justify-between items-center">
                  <div className="flex gap-2 text-2xl font-bold capitalize">
                    <h1>{kartu.subject}</h1>
                    <h1>{kartu.subjectA ? `& ${kartu.subjectA}` : ''}</h1>
                  </div>
                </motion.div>
                {isCardOpen && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="uppercase font-medium text-sm">{kartu.tanggal}</p>
                    <motion.div className="w-full py-3">
                      <p>" {kartu.ucapan} "</p>
                    </motion.div>
                  </motion.div>
                )}
                <motion.div layout="position" className="flex justify-between text-xs mt-3">
                  <p className="font-medium">Dari {kartu.username} ❤️</p>
                  <motion.p layout="position" className="text-gray-300">
                    Tap untuk {isCardOpen ? 'sembunyikan' : 'munculkan'}
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
