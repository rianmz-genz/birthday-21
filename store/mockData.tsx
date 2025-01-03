export interface Card {
    subject: string;
    subjectA?: string;
    type: string;
    hariRaya?: string;
    tanggal: string;
    ucapan: string;
    username: string;
    gambar: string;
  }
  
  export const cardDataMockup: Record<string, Card> = {
    '1': {
      subject: 'Selamat Ulang Tahun',
      type: 'Ulang tahun',
      tanggal: '04 Januari 2024',
      ucapan: "Dari Sayangmu❤️, 'Perintis', [1] Sayang, mentariku yang bersinar terang, [2] Di setiap langkah, senyummu memikat hatiku. [3] Kau cantik seperti bintang di langit yang jauh, [4] kau sudah menjadi penuntun hidupku, [5] segala yang kau sentuh menjadi nyata. [6] Kita telah melewati segala hal bersama, [7] Susah dan senang, kita bangun dari dasar yang sama. [8] Hari, bulan, tahun, berlalu bersama cinta kita, [9] tak ada lainnya. [10] Aku ingin terus berjalan bersamamu, selamanya, [11] Menapaki langkah-langkah besar yang kita buat. [12] Karena denganmu, hidup ini tak lagi sepi, [13] Kau adalah cahaya yang menuntun, tak akan pernah tergantikan. [14] Aku, Kamu, Kita selamanya.",
      username: 'Vastroboy',
      gambar: 'https://raw.githubusercontent.com/rianmz-genz/Vinka/main/images/ayaaang.jpg',
    },
    '2': {
      subject: 'Happy Valentine’s Day',
      subjectA: 'Cinta Sejati',
      type: 'Valentine',
      tanggal: '14 Februari 2024',
      ucapan: 'Semoga cinta kita abadi selamanya.',
      username: 'Dina',
      gambar: 'https://example.com/image-valentine.jpg',
    },
    '3': {
      subject: 'Selamat Pernikahan',
      type: 'Pernikahan',
      tanggal: '20 Maret 2024',
      ucapan: 'Selamat menempuh hidup baru, semoga bahagia selalu!',
      username: 'Sari',
      gambar: 'https://example.com/image-pernikahan.jpg',
    },
    '4': {
      subject: 'Selamat Idul Fitri',
      type: 'Hari Raya',
      hariRaya: 'Idul Fitri',
      tanggal: '10 April 2024',
      ucapan: 'Mohon maaf lahir dan batin.',
      username: 'Ali',
      gambar: 'https://example.com/image-idulfitri.jpg',
    },
    '5': {
      subject: 'Selamat Kelulusan',
      type: 'Kelulusan',
      tanggal: '15 Mei 2024',
      ucapan: 'Selamat atas kelulusannya, semoga sukses di masa depan!',
      username: 'Rani',
      gambar: 'https://example.com/image-kelulusan.jpg',
    },
    '6': {
      subject: 'Selamat Tahun Baru',
      type: 'Tahun Baru',
      tanggal: '1 Januari 2024',
      ucapan: 'Semoga tahun ini lebih baik dari sebelumnya!',
      username: 'Eka',
      gambar: 'https://example.com/image-tahunbaru.jpg',
    },
  };
  