const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "",
    password: "",
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error("Error de conexion: " + err);
        return;
    }
    console.log("Estado de la conexion: CONECTADA");

    const sqlCreateDb = 'CREATE DATABASE IF NOT EXISTS american_tour';

    connection.query(sqlCreateDb, (err, results) => {
        if (err) {
            console.error("Error al crear la base de datos: " + err);
            return;
        }
        console.log("Base de datos creada o existente");

        connection.changeUser({ database: "american_tour" }, (err) => {
            if (err) {
                console.error("Error al cambiar de usuario: " + err);
                return;
            }

            const createUsersTableQuery = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    dni INT NOT NULL
                );`;
            connection.query(createUsersTableQuery, (err, results) => {
                if (err) {
                    console.error("Error al crear la tabla users: " + err);
                    return;
                }
                console.log("Tabla users creada o existente");

                const createTripsTableQuery = `
                    CREATE TABLE IF NOT EXISTS trips (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        user_id INT NOT NULL,
                        destination VARCHAR(255) NOT NULL,
                        duration VARCHAR(255) NOT NULL,
                        FOREIGN KEY (user_id) REFERENCES users(id)
                    );`;
                connection.query(createTripsTableQuery, (err, results) => {
                    if (err) {
                        console.error("Error al crear la tabla trips: " + err);
                        return;
                    }
                    console.log("Tabla trips creada o existente");
                });
            });
        });
    });
});

module.exports = connection;