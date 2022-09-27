const express = require('express');
const app = express();
const port = 8080

app.use(express.static('public'))
app.listen(port, (req,res) => console.log(`listening on port ${port}!`))
app.get('/',(req,res)=>{
    res.send('API is running');


})
