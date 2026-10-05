class DonasiRepository {
  constructor() {
    this.donasiList = [];
  }

  async simpan(donasi) {
    this.donasiList.push(donasi);
    return donasi;
  }

  async ambilSemua() {
    return this.donasiList;
  }
}

module.exports = new DonasiRepository();