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
}

module.exports = new DonasiService();