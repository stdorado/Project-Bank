import pkg from "pg"
import User from "../Data/users.generic.js";
const {pool} = pkg

class userManager{
    async getAllUsers(){
        const query = 'SELECT * FROM users'
        try {
            const result = await pool.query(query)
            return result.rows.map(row => new User(row.id,row.turnos_asociados,row.email,row.nombre,row.apellido,row.created_at,row.password))
        } catch (error) {
            console.error("Error al traer los usuarios: ",error)
        }
    }

    async getUserById(){
        const query = "SELECT * FROM users WHERE id = $1";
        const value = [id]
        try {
            const result = await pool.query(query,value)
            const userData = result.row[0]
          return new User(userData.id,userData.turnos_asociados,userData.email,userData.nombre,userData.apellido,userData.created_at,userData.password);
        } catch (error) {
            console.error("Error al obtener un usuario por su id", error)
        }
    }

    async CreateUser(user){
        const query = 'INSERT INTO users (id,turnos_asociados,email,nombre,apellido,created_at) VALUES (1$,2$,3$,4$,5$,6$) RETURNING *'
        const values = [user.id, user.turnosAsociados, user.email, user.nombre, user.apellido, user.createdAt,user.password];
        try {
            const result = await pool.query(query,values)
            const userData = result.rows[0]
            return new User(userData.id, userData.turnos_asociados, userData.email, userData.nombre, userData.apellido, userData.created_at,userData.password)
        } catch (error) {
            console.error("Error al crear el usuario",error)
        }
    }

    async updateUser(user){
        const query = 'UPDATE users SET turnos_asociados = $2, email = $3, nombre = $4, apellido = $5, created_at = $6 WHERE id = $1 RETURNING *';
        const values = [user.id, user.turnosAsociados, user.email, user.nombre, user.apellido, user.createdAt,user.password];
        try {
            const result = await pool.query(query,values)
            const userData = result.rows[0]
            return new User(userData.id, userData.turnos_asociados, userData.email, userData.nombre, userData.apellido, userData.created_at,userData.password)
        } catch (error) {
            console.error("Error al actualizar un usuario",error)
            throw error
        }
    }

    async deleteOneUser(id){
        const query = "DELETE FROM users WHERE id = $1";
        const value = [id]
        try {
            await pool.query(query,value)
            return true
        } catch (error) {
            console.error("Error al eliminar el usuario",error)
            throw error
        }
    }

    async deleteUserToDb(){
        const query = "DELETE FROM users"
        try {
            await pool.query(query)
            return true
        } catch (error) {
            console.error("Error al eliminar todos los usuarios de la db",error)
            throw error;
        }
    }
    async getUserByEmail(email) {
        const query = "SELECT * FROM users WHERE email = $1";
        const value = [email];
        try {
            const result = await pool.query(query, value);
            const userData = result.rows[0];
            return new User(userData.id, userData.turnos_asociados, userData.email, userData.nombre, userData.apellido, userData.created_at,userData.password);
        } catch (error) {
            console.error("Error al obtener un usuario por su correo electrónico", error);
        }
    }
}

const UserManager = new userManager()

export default UserManager;