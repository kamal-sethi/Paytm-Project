import jwt from "jsonwebtoken";
export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startWith("Bearer")) {
      res.status(403).json({});
    }

    const token = authHeader.split(" ")[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (decode.userId) {
      req.userId = decode.userId;

      next();
    } else {
      res.status(403).json({});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error in server/error in auth middleware",
    });
  }
};
