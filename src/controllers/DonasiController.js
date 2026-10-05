const donasiService = require('../services/DonasiService');

class DonasiController {
  async catatDonasi(req, res) {
    try {
      const { id, nominal, tanggal, kanal } = req.body;
      const donasiBaru = await donasiService.catatDonasi({ id, nominal, tanggal, kanal });
      return res.status(201).json({
        status: 'success',
        data: donasiBaru
      });
    } catch (error) {
      return res.status(400).json({ status: 'fail', message: error.message });
    }
  }

  async getAllDonasi(req, res) {
    try {
      const data = await donasiService.ambilSemuaDonasi();
      return res.status(200).json({ status: 'success', data: data });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async rekonsiliasiData(req, res) {
    try {
      const { mutasiBank } = req.body;
      const hasil = await donasiService.prosesRekonsiliasi(mutasiBank);
      return res.status(200).json({
        status: 'success',
        message: 'Proses rekonsiliasi selesai',
        data: hasil
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }
}

module.exports = new DonasiController();