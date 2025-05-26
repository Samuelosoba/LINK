
import jwt from "jsonwebtoken";

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Running optionalAuth middleware");

  if (authHeader && authHeader.startsWith("Bearer ")) {
    console.log("Token found:", authHeader);
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = { id: decoded.id };
      console.log("OptionalAuth decoded token:", decoded);
    } catch (err) {
      console.warn("Invalid token in optionalAuth — continuing anonymously");
     
    }
  }

  next();
};

export default optionalAuth;
