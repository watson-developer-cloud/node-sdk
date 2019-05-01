module.exports = {
  checkErrorCode: (code, cb) => (err, res, response) => {
    if (err && err.code) {
      expect(err.code).toBe(code);
    }
    return cb(err, res, response);
  },
};
