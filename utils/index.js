require('colors');
const express = require('express')
const app = express();

// Configuration
require('dotenv').config({path:'./config/.env'});
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.1';
// asyncErrors to errorHandler 
require('express-async-errors');
// Connect to DB 
require('./config/db')()

// Middlewares 
// Accept/parse JSON requests 
app.use(express.json())
 
// Logger middleware 
app.use(require('./middlewares/logger'));


// Authorization 
app.use(require('./middlewares/authorization'));

// res.getModelList()
app.use(require('./middlewares/query'))

// Home Path 
app.all('/', (req, res)=>{  
    res.status(200).json({
        success: true,
        message:'Welcome to Flight Reservation API', 
        documents: '/api/documents',
        user: req.user
    })

})


// Routes 
app.use('/api', require('./routes'))



// Express Error Handler 
app.use(require('./middlewares/errorHandler'));

// Run the server 
app.listen(PORT, console.log(`Server running on http://${HOST}:${PORT}`.green))

