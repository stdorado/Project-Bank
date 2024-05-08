class User{
    constructor(id,turnosAsociados,email,nombre,apellido,createdAt,password){
        this.id = id;
        this.turnosAsociados = turnosAsociados;
        this.email = email;
        this.nombre = nombre;
        this.apellido = apellido;
        this.createdAt = createdAt;
        this.password = password;
    }
}

export default User;