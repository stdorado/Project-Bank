import JWT from "jsonwebtoken"
import UserManager from "../Generic/managers/User.manager.js";
import dotenv from "dotenv"

dotenv.config()
export const jwtValidation = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
    }
  
    try {
      const decoded = JWT.verify(token, SecretKey);
  
      const user = await UserManager.getUserById(decoded.userId);
  
      if (!user) {
        return res.status(401).json({ message: "Usuario no encontrado." });
      }
      req.user = user;
      next();
    } catch (error) {
  
      if (error.name === "TokenExpiredError") {
  
        return res.status(401).json({ message: "Token expirado." });
  
      } else if (error.name === "JsonWebTokenError" && error.message === "jwt malformed") {
        
        return res.status(401).json({ message: "Token con formato incorrecto." });
      }
  
      console.error('Error al verificar el token:', error);
      return res.status(401).json({ message: "Token no válido." });
    }
  };

  export const generateToken = (payload)=>{
    const token = JWT.sign(payload,process.env.JWT_TOKEN_SECRET,{expiresIn :"1h"})
    return token;
  }

