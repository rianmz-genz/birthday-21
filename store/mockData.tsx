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
      ucapan: 'Semoga panjang umur dan sehat selalu!',
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
  