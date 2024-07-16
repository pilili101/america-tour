const db = require('../db/db');


const getAllUsers = (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {console.log(err); return;} 
        res.json(results);
    });
};

const getUserById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {console.log(err); return;}
        res.json(result);
    });
};

const createUser = (req, res) => {
    const { name, dni } = req.body;
    const sql = 'INSERT INTO users (name, dni) VALUES (?, ?)';
    db.query(sql, [name, dni], (err, result) => {
        if (err)  {console.log(err);return;} 
        res.json({ message: 'Usuario creado', userId: result.insertId });
    });
};

const updateUser = (req,res)=>{
    const {id} = req.params;
    const {name,dni} = req.body;
    const sql = 'UPDATE users SET name = ?, dni = ? WHERE id = ?';
    db.query(sql,[name,dni,id],(err,results)=>{
        if(err){
            console.log(err); return;}
        res.json({mensaje: "Usuario actualizado"});
    })
};

const deleteUser = (req,res)=>{
    const {id} = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql,[id],(err,result)=>{
        if(err){
            console.log(err); return;}
        res.json({mensaje: "Usuario eliminado con éxito"});
    })
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};