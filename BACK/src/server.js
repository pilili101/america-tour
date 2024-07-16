const express = require('express');
const app = express();

const userRoutes = require('../routes/userRoutes');
const tripRoutes = require('../routes/tripRoutes');

app.use(express.json());

app.use('/users', userRoutes)
app.use('/trips', tripRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
