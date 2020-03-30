// removing try/catch blocks with HOC
module.exports = (fn) => {
  return (req, res, next) => {
    // the error is passed to golbal error handling function
    fn(req, res, next).catch((err) => next(err));
  };
};
