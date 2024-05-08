import bcrypt from "bcrypt"

const saltRounds = 30;
export async function encryptarPassword(password){
    try {
        const hashedPasword = await bcrypt.hash(password,saltRounds)
        return hashedPasword;
    } catch (error) {
        console.error("error al encriptar la password",error)
        throw error;
    }
}

export async function comparePassword(password,hashedPasword){
    try {
        const match = await bcrypt.compare(password,hashedPasword)
        return match
    } catch (error) {
        console.error("Error al comparar las contraseñas",error)
        throw error;
    }
}

