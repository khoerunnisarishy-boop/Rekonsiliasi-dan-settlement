const mysql = require('mysql2/promise');

async function setupDB() {
    try {
        // Koneksi ke MySQL lokal (pastikan XAMPP/MySQL service kamu udah START)
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '' // Kosongkan jika pakai XAMPP default
        });

        console.log('Terhubung ke MySQL server...');

        // 1. Buat Database
        await connection.query(`CREATE DATABASE IF NOT EXISTS baitulmal_rekonsiliasi;`);
        await connection.query(`USE baitulmal_rekonsiliasi;`);

        // 2. Buat Tabel Donasi
        await connection.query(`
            CREATE TABLE IF NOT EXISTS donasi (
                id INT AUTO_INCREMENT PRIMARY KEY,
                kode_donasi VARCHAR(50) UNIQUE NOT NULL,
                nama_donatur VARCHAR(100),
                nominal DECIMAL(12, 2) NOT NULL,
                tanggal_donasi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status_pembayaran VARCHAR(20) DEFAULT 'SUCCESS'
            );
        `);

        // 3. Buat Tabel Mutasi Bank
        await connection.query(`
            CREATE TABLE IF NOT EXISTS mutasi_bank (
                id INT AUTO_INCREMENT PRIMARY KEY,
                rekening_pengirim VARCHAR(50),
                nominal DECIMAL(12, 2) NOT NULL,
                keterangan TEXT,
                tanggal_mutasi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status_match BOOLEAN DEFAULT FALSE
            );
        `);

        // 4. Buat Tabel Hasil Rekonsiliasi
        await connection.query(`
            CREATE TABLE IF NOT EXISTS hasil_rekonsiliasi (
                id INT AUTO_INCREMENT PRIMARY KEY,
                donasi_id INT,
                mutasi_id INT,
                status VARCHAR(20) NOT NULL,
                selisih DECIMAL(12, 2) DEFAULT 0,
                dicocokkan_oleh VARCHAR(50) DEFAULT 'SYSTEM',
                tanggal_proses TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (donasi_id) REFERENCES donasi(id),
                FOREIGN KEY (mutasi_id) REFERENCES mutasi_bank(id)
            );
        `);

        console.log('✅ Database baitulmal_rekonsiliasi & semua tabel berhasil dibuat!');
        await connection.end();
    } catch (err) {
        console.error('❌ Gagal membuat database:', err.message);
    }
}

setupDB();