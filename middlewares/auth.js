module.exports.checkAuth = function (req, res, next) {
  const userId = req.session.userId;

  if (!userId) {
    res.send(false);
    return;
  }

  res.send(true);
  next();
};
