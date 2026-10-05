const express = require('express');
const donasiController = require('./src/controllers/DonasiController.js');

const app = express();
app.use(express.json());

// Endpoint API
app.post('/api/v1/rekonsiliasi/donasi', (req, res) => donasiController.catatDonasi(req, res));
app.get('/api/v1/rekonsiliasi/donasi', (req, res) => donasiController.getAllDonasi(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Subsistem Rekonsiliasi jalan di port ${PORT}`);
});