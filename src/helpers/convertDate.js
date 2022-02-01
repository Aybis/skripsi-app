export const convertDate = (type, time) => {
  let date = time ? new Date(time) : new Date();

  let options = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    year: 'numeric',
  };

  let day = {
    weekday: 'long',
  };

  let month = {
    month: 'long',
  };

  let dateDay = {
    weekday: 'short',
  };

  switch (type) {
    case 'tanggalBulanTahun':
      return date.toLocaleDateString('id-ID', options);

    case 'tanggalWaktuLengkap':
      return (
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate() +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':' +
        date.getSeconds()
      );

    case 'tanggalHari':
      // Senin, 15 November 2021
      return date.toLocaleString('id-ID', options);

    case 'tanggalKemarin':
      // Senin, 15 November 2021
      date.setDate(date.getDate() - 1);

      return date.toLocaleString('id-ID', options);

    case 'tanggal':
      return date.getDate();

    case 'namaHari':
      //   Rabu
      return date.toLocaleString('id-ID', day);

    case 'bulan':
      return date.getMonth() + 1;

    case 'namaBulan':
      return date.toLocaleString('id-ID', month);

    case 'tahun':
      return date.getFullYear();

    case 'jamMenitDetik':
      return (
        date.getHours() +
        ' : ' +
        (date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`) +
        ' : ' +
        (date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`)
      );

    case 'jamMenit':
      return (
        date.getHours() +
        ':' +
        (date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`)
      );

    case 'convertTime':
      return date.getHours() + date.getMinutes() / 100;

    case 'jamAM':
      return (
        date.getHours() +
        ':' +
        (date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`) +
        (date.getHours() > 12 ? ' PM' : ' AM')
      );

    case 'dateDay':
      return (
        date.getDate() +
        '.' +
        (date.getMonth() + 1) +
        '.' +
        date.getFullYear() +
        ', ' +
        date.toLocaleString('id-ID', dateDay)
      );

    case 'jam':
      return date.getHours();

    case 'menit':
      return date.getMinutes() > 9
        ? date.getMinutes()
        : `0${date.getMinutes()}`;

    case 'detik':
      return date.getSeconds() > 9
        ? date.getSeconds()
        : `0${date.getSeconds()}`;

    default:
      break;
  }
};
