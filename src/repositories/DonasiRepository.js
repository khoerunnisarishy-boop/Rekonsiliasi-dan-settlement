class DonasiRepository {
  constructor() {
    this.donasiList = []; // Penyimpanan sementara di memori
  }

  async simpan(donasi) {
    this.donasiList.push(donasi);
    return donasi;
  }

  async cariSemua() {
    return this.donasiList;
  }

  async cariById(id) {
    return this.donasiList.find(item => item.getId() === id);
  }
}

module.exports = new DonasiRepository();