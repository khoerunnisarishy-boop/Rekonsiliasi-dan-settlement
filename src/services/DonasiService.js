const donasiRepository = require('../repositories/DonasiRepository');
const Donasi = require('../models/Donasi');

class DonasiService {
  async catatDonasi(data) {
    const { id, nominal, tanggal, kanal } = data;
    const donasiBaru = new Donasi(id, nominal, tanggal, kanal);
    return await donasiRepository.simpan(donasiBaru);
  }

  async ambilSemuaDonasi() {
    return await donasiRepository.ambilSemua();
  }

  async prosesRekonsiliasi(dataMutasiBank) {
    const semuaDonasi = await donasiRepository.ambilSemua();

    const hasilRekonsiliasi = semuaDonasi.map((donasi) => {
      const cocok = dataMutasiBank.find(
        (mutasi) => mutasi.nominal === donasi.nominal && mutasi.tanggal === donasi.tanggal
      );

      if (cocok) {
        donasi.status = 'MATCH';
      } else {
        donasi.status = 'UNMATCH';
      }

      return donasi;
    });

    return hasilRekonsiliasi;
  }
}

module.exports = new DonasiService();