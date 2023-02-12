const generateResponse = (statusCode, success, err, userId, isAuth = null, data) => {
  const res = { statusCode, body: { success } };
  if (err) res.err = err;
  if (userId) res.userId = userId;
  if (isAuth !== null) res.isAuth = isAuth;
  if (data) res.body.data = data;
  return res;
}
module.exports = { generateResponse };