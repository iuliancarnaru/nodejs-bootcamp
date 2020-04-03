// removing try/catch blocks with HOC
module.exports = (fn) => {
  return (req, res, next) => {
    // the error is passed to global error handling function
    fn(req, res, next).catch((err) => next(err));
  };
};
