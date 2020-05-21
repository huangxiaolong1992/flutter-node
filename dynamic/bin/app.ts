import express from 'express';
import bodyParser from 'body-parser';
const app: any = express();
const cors = require('cors');

import './db/connectDB';

const routers = require('./router-index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routers);

app.listen(8080, ()=>{
    console.log('服务器连接成功');
});

    
module.exports  = app;