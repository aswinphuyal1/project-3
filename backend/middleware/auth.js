import jwt from "jsonwebtoken";
const authuser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "you are not authorize",
    });
  }
  try {
    const tokendedcode = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = tokendedcode.id;
    if (req.body) {
      req.body.userid = tokendedcode.id;
    }
    next();

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    })
  }
};
export default authuser
//