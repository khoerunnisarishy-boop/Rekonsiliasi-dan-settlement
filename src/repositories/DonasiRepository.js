const pool = require('../config/db');

class DonasiRepository {
    // 1. Ambil semua data donasi
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM donasi ORDER BY id DESC');
        return rows;
    }

    // 2. Ambil donasi berdasarkan ID
    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM donasi WHERE id = ?', [id]);
        return rows[0];
    }

    // 3. Tambah data donasi baru
    async create(data) {
        const { kode_donasi, nama_donatur, nominal, status_pembayaran } = data;
        const [result] = await pool.query(
            'INSERT INTO donasi (kode_donasi, nama_donatur, nominal, status_pembayaran) VALUES (?, ?, ?, ?)',
            [kode_donasi, nama_donatur, nominal, status_pembayaran || 'SUCCESS']
        );
        return { id: result.insertId, ...data };
    }

    // 4. Ambil daftar transaksi selisih (UNMATCH) untuk keperluan rekonsiliasi
    async findUnmatched() {
        const query = `
            SELECT r.id AS rekonsiliasi_id, d.kode_donasi, d.nama_donatur, 
                   d.nominal AS nominal_donasi, m.nominal AS nominal_mutasi, 
                   r.status, r.selisih, r.tanggal_proses
            FROM hasil_rekonsiliasi r
            LEFT JOIN donasi d ON r.donasi_id = d.id
            LEFT JOIN mutasi_bank m ON r.mutasi_id = m.id
            WHERE r.status = 'UNMATCH'
        `;
        const [rows] = await pool.query(query);
        return rows;
    }
}

module.exports = new DonasiRepository();