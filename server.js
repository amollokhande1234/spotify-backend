require('dotenv').config();
const app = require('./src/app')
const connectDB = require('./src/db/db')

// Moongo-DB connection 
connectDB();






app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server stated successfully on ${process.env.PORT ?? 3000}`);

})