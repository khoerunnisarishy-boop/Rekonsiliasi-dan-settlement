const pool = require('./src/config/db');

async function seedData() {
    try {
        console.log('Mengisi data sampel...');

        // 1. Data Donasi
        await pool.query(`
            INSERT IGNORE INTO donasi (kode_donasi, nama_donatur, nominal, status_pembayaran) 
            VALUES 
            ('DON-001', 'Ahmad Fadhil', 100000.00, 'SUCCESS'),
            ('DON-002', 'Budi Santoso', 250000.00, 'SUCCESS'),
            ('DON-003', 'Siti Rahma', 500000.00, 'SUCCESS');
        `);

        // 2. Data Mutasi Bank
        await pool.query(`
            INSERT IGNORE INTO mutasi_bank (rekening_pengirim, nominal, keterangan, status_match) 
            VALUES 
            ('1234567890', 100000.00, 'TRANSFER AHMAD FADHIL', TRUE),
            ('0987654321', 250000.00, 'TRANSFER BUDI S', TRUE),
            ('5555666677', 490000.00, 'TRANSFER SITI RAHMA (ADA SELISIH BIAYA ADMIN)', FALSE);
        `);

        // 3. Data Hasil Rekonsiliasi (1 Match, 1 Unmatch)
        await pool.query(`
            INSERT IGNORE INTO hasil_rekonsiliasi (donasi_id, mutasi_id, status, selisih) 
            VALUES 
            (1, 1, 'MATCH', 0),
            (2, 2, 'MATCH', 0),
            (3, 3, 'UNMATCH', 10000.00);
        `);

        console.log('✅ Sample data berhasil dimasukkan!');
        process.exit();
    } catch (err) {
        console.error('❌ Gagal mengisi data:', err.message);
        process.exit(1);
    }
}

seedData();