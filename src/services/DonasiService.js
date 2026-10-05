const donasiRepository = require('../repositories/DonasiRepository');
const Donasi = require('../models/Donasi');

class DonasiService {
  async tambahDonasi(data) {
    const { id, nominal, tanggal, kanal } = data;
    
    // Instansiasi object OOP
    const donasiBaru = new Donasi(id, nominal, tanggal, kanal);
    
    // Simpan via repository
    return await donasiRepository.simpan(donasiBaru);
  }

  async ambilSemuaDonasi() {
    const list = await donasiRepository.cariSemua();
    return list.map(donasi => donasi.toJSON());
  }
}

module.exports = new DonasiService();