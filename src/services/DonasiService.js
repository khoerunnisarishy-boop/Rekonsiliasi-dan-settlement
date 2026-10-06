const donasiRepository = require('../repositories/DonasiRepository');

class DonasiService {
    // Service untuk mengambil semua donasi
    async getAllDonasi() {
        return await donasiRepository.findAll();
    }

    // Service untuk mengambil donasi berdasarkan ID
    async getDonasiById(id) {
        const donasi = await donasiRepository.findById(id);
        if (!donasi) {
            throw new Error('Data donasi tidak ditemukan');
        }
        return donasi;
    }

    // Service untuk membuat donasi baru
    async createDonasi(data) {
        if (!data.kode_donasi || !data.nominal) {
            throw new Error('Kode donasi dan nominal wajib diisi!');
        }
        return await donasiRepository.create(data);
    }

    // Service untuk mengambil daftar transaksi selisih (UNMATCH)
    async getUnmatchedRekonsiliasi() {
        return await donasiRepository.findUnmatched();
    }
}

module.exports = new DonasiService();