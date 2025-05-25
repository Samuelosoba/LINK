import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(createHttpError(401, "Unauthorized"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { id: decoded.id }; //  use 'id' from the token

    next();
    console.log("Decoded token:", decoded);
  } catch (error) {
    return next(createHttpError(403, "Invalid or expired token"));
  }
 
};

export default authMiddleware;
