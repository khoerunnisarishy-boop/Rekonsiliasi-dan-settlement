const express = require('express');
const donasiController = require('./src/controllers/DonasiController');

const app = express();
app.use(express.json());

// Deklarasikan PORT di atas sebelum app.listen
const PORT = process.env.PORT || 3000;

// Routes
app.post('/api/v1/rekonsiliasi/donasi', (req, res) => donasiController.catatDonasi(req, res));
app.get('/api/v1/rekonsiliasi/donasi', (req, res) => donasiController.getAllDonasi(req, res));
app.post('/api/v1/rekonsiliasi/proses', (req, res) => donasiController.rekonsiliasiData(req, res));

app.listen(PORT, () => {
  console.log(`Server Subsistem Rekonsiliasi jalan di port ${PORT}`);
});