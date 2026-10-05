class Donasi {
  #id;
  #nominal;
  #tanggal;
  #kanal;
  #status; // PENDING, MATCHED, UNMATCHED

  constructor(id, nominal, tanggal, kanal) {
    if (!id || typeof id !== 'string') {
      throw new Error("ID donasi tidak valid.");
    }
    if (!nominal || typeof nominal !== 'number' || nominal <= 0) {
      throw new Error("Nominal donasi harus berupa angka positif.");
    }

    this.#id = id;
    this.#nominal = nominal;
    this.#tanggal = new Date(tanggal);
    this.#kanal = kanal;
    this.#status = 'PENDING';
  }

  // Getter (Enkapsulasi)
  getId() { return this.#id; }
  getNominal() { return this.#nominal; }
  getTanggal() { return this.#tanggal; }
  getKanal() { return this.#kanal; }
  getStatus() { return this.#status; }

  // Method domain
  setTercocokkan() {
    this.#status = 'MATCHED';
  }

  setSelisih() {
    this.#status = 'UNMATCHED';
  }

  // Format data untuk output API JSON
  toJSON() {
    return {
      id: this.#id,
      nominal: this.#nominal,
      tanggal: this.#tanggal,
      kanal: this.#kanal,
      status: this.#status
    };
  }
}

module.exports = Donasi;