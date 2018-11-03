class Posit {
  constructor (options) {
    this.lat = options.lat;
    this.long = options.long;
  }

  toJSON() {
    return {
      lat: this.lat,
      long: this.long,
    };
  }

};

export default Posit;
