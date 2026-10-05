const donasiService = require('../services/DonasiService');

class DonasiController {
  async catatDonasi(req, res) {
    try {
      const hasil = await donasiService.tambahDonasi(req.body);
      return res.status(201).json({
        status: 'success',
        message: 'Donasi berhasil dicatat dan siap direkonsiliasi',
        data: hasil.toJSON()
      });
    } catch (error) {
      return res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  async getAllDonasi(req, res) {
    try {
      const data = await donasiService.ambilSemuaDonasi();
      return res.status(200).json({
        status: 'success',
        data
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Terjadi kesalahan pada server'
      });
    }
  }
}

module.exports = new DonasiController();