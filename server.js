const express=require('express');
const connectDB=require('./config/db');
const app=express();
//connect to DB
connectDB();
//middleware
app.use(express.json({extended:false}));

app.get('/',(req,res)=>res.send('API running'));
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/list',require('./routes/api/list'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/subitem',require('./routes/api/subitem'));

const PORT=process.env.PORT ||5000;
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));  