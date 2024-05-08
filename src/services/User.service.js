import UserManager from "../Generic/managers/User.manager.js";
import { encryptarPassword,comparePassword } from "../configs/Bycript.js";
import { generateToken } from "../configs/JWT.js";

class UserService{
    async LoginUser(email,password,req,res){
        try {

            const userData = await UserManager.getUserByEmail(email)
            if(!userData){
                return res.status(404).json({success:false,message : "Usuario no econtrado"})
            }
            const token = generateToken({
                id: userData.id,
                role: userData.role,
                turnosAsociados: userData.turnosAsociados,
                nombre: userData.nombre,
                apellido: userData.apellido,
                createdAt: userData.createdAt,
                password : encryptarPassword()
            })
            res.cookie('jwt',token)

            res.session.user ={
                id: userData.id,
                email: userData.email,
                role: userData.role,
                turnosAsociados: userData.turnosAsociados,
                nombre: userData.nombre,
                apellido: userData.apellido,
                createdAt: userData.createdAt,
            }

            return res.status(200).json({success : true,message : "Usuario autenticado con exito"})
        } catch (error) {
            
        }
    }
}
