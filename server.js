const express = require('express');
const app = express();
const donasiController = require('./src/controllers/DonasiController');

app.use(express.json());

// Routes API Donasi & Selisih
app.get('/api/v1/donasi', (req, res) => donasiController.getAll(req, res));
app.get('/api/v1/donasi/:id', (req, res) => donasiController.getById(req, res));
app.post('/api/v1/donasi', (req, res) => donasiController.create(req, res));
app.get('/api/v1/rekonsiliasi/selisih', (req, res) => donasiController.getSelisih(req, res));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});