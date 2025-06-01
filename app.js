const express = require('express');
const route = require('./routes'); // This loads the routes/index.js

const app = express();
const PORT = 3000;

app.use('/',route); // Any request to "/" will go to routes/index.js    

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);  
})