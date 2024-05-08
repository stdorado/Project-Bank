import pkg from "pg"
import Turnos from "../Data/turnos.generic.js";
const {pool} = pkg;

class turnsManager{
    async getAllTurns(){
        const query = 'SELECT * FROM turns'
        try {
            const result = await pool.query(query)
            return result.rows.map(row => new Turnos(row.userId,row.numero,row.tipo,row.horaCreacion,row.fecha))
        } catch (error) {
            console.error("Error al traer todos los turnos", error)
        }
    }

    async getTurnById(id){
        const query = 'SELECT * FROM turns WHERE id = $1'
        const value = [id]
        try {
            const result = await pool.query(query,value)
            const turnoData = result.rows[0]
            return new Turnos(turnoData.userId, turnoData.numero, turnoData.tipo, turnoData.horaCreacion, turnoData.fecha)
        } catch (error) {
            console.error(error)

        }
    }

    async createTurns(turno){
        const query = 'INSERT INTO turns (userId, numero, tipo, horaCreacion, fecha) VALUES ($1, $2, $3, $4, $5) RETURNING *'
        const values = [turno.userId, turno.numero, turno.tipo, turno.horaCreacion, turno.fecha];
        try {
            const result = await pool.query(query,values)
            const turnoData = result.rows[0]
            return new Turnos(turnoData.userId, turnoData.numero, turnoData.tipo, turnoData.horaCreacion, turnoData.fecha);
        } catch (error) {
            console.error("Error al crear un turno")
        }
    }
    async updateTurn(turno) {
        const query = 'UPDATE turnos SET userId = $2, numero = $3, tipo = $4, horaCreacion = $5, fecha = $6 WHERE id = $1 RETURNING *';
        const values = [turno.id, turno.userId, turno.numero, turno.tipo, turno.horaCreacion, turno.fecha];

        try {
            const result = await pool.query(query, values);
            const turnoData = result.rows[0];
            return new Turnos(turnoData.userId, turnoData.numero, turnoData.tipo, turnoData.horaCreacion, turnoData.fecha);
        } catch (error) {
            console.error('Error updating turno:', error);
            throw error;
        }
    }

    async deleteTurn(id) {
        const query = 'DELETE FROM turnos WHERE id = $1';
        const values = [id];

        try {
            await pool.query(query, values);
            return true; 
        } catch (error) {
            console.error('Error deleting turno:', error);
            throw error;
        }
    }
}

const OrderManager = new turnsManager()
export default OrderManager;