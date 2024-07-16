const db = require('../db/db');


const getAllTrips = (req, res) => {
    const sql = 'SELECT * FROM trips';
    db.query(sql, (err, results) => {
        if (err) {console.log(err); return;} 
        res.json(results);
    });
};

const getTripById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM trips WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {console.log(err); return;}
        res.json(result);
    });
};

const createTrip = (req, res) => {
    const { user_id, destination, duration } = req.body;
    const sql = 'INSERT INTO trips (user_id, destination, duration) VALUES (?, ?, ?)';
    db.query(sql, [user_id, destination, duration], (err, result) => {
        if (err)  {console.log(err);return;} 
        res.json({ message: 'Viaje creado', tripId: result.insertId });
    });
};

const updateTrip = (req,res)=>{
    const {id} = req.params;
    const {user_id,destination,duration} = req.body;
    const sql = 'UPDATE trips SET user_id = ?, destination = ?, duration = ? WHERE id = ?';
    db.query(sql,[user_id,destination,duration,id],(err,results)=>{
        if(err){
            console.log(err); return;}
        res.json({mensaje: "Viaje actualizado"});
    })
};

const deleteTrip = (req,res)=>{
    const {id} = req.params;
    const sql = 'DELETE FROM trips WHERE id = ?';
    db.query(sql,[id],(err,result)=>{
        if(err){
            console.log(err); return;}
        res.json({mensaje: "Viaje eliminado con éxito"});
    })
};

module.exports = {
    getAllTrips,
    getTripById,
    createTrip,
    updateTrip,
    deleteTrip
};
