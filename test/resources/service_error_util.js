module.exports = {
  checkErrorCode: (code, cb) => (err, res) => {
    if (err && err.code) {
      expect(err.code).toBe(code);
    }
    return cb(err, res);
  },
};
