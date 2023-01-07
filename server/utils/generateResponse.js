const generateResponse = (statusCode, success, err, userId, isAuth = null) => {
  const res = { statusCode, body: { success } };
  if (err) res.err = err;
  if (userId) res.userId = userId;
  if (isAuth !== null) res.isAuth = isAuth;
  return res;
}
module.exports = { generateResponse };