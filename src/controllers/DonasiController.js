const donasiService = require('../services/DonasiService');

class DonasiController {
    // GET /api/v1/donasi
    async getAll(req, res) {
        try {
            const data = await donasiService.getAllDonasi();
            res.status(200).json({
                success: true,
                message: 'Berhasil mengambil data donasi',
                data: data
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // GET /api/v1/donasi/:id
    async getById(req, res) {
        try {
            const data = await donasiService.getDonasiById(req.params.id);
            res.status(200).json({ success: true, data: data });
        } catch (error) {
            res.status(404).json({ success: false, message: error.message });
        }
    }

    // POST /api/v1/donasi
    async create(req, res) {
        try {
            const result = await donasiService.createDonasi(req.body);
            res.status(201).json({
                success: true,
                message: 'Donasi berhasil ditambahkan',
                data: result
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    // GET /api/v1/rekonsiliasi/selisih
    async getSelisih(req, res) {
        try {
            const data = await donasiService.getUnmatchedRekonsiliasi();
            res.status(200).json({
                success: true,
                message: 'Berhasil mengambil daftar selisih rekonsiliasi',
                data: data
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new DonasiController();