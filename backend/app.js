const express =require('express');
const mongoose=require('mongoose');
const cors=require('cors')
const app=express();
const dotenv=require('dotenv');

// MiddleWare
app.use(cors());
app.use(express.json());
dotenv.config();
// MongoDB Schema
const DetailSchema=new mongoose.Schema({
  name:String,
  email: String,
  message:String,
},{timestamps:true})

const detail=mongoose.model('Detail',DetailSchema);

app.post('/api/details',async(req,res)=>{
  try{
    const {name, email , message}=req.body;
    const newDetail=new detail({name,email,message});
    const saveDetail=await newDetail.save();
    res.status(201).json(saveDetail);
  }catch(error){
    console.error('Error Savinf detail:', error);
    res.status(500).json({error:'Failed to Save data'});
  }
});

app.get('/api/datails',async (req,res)=>{
  try{
    const details=await detail.find();
    res.status(200).json(details);
  }catch(error){
    console.error("error fetching data:",error);
    res.status(500).json({error:'Failed to Save Data'});
  }
})

mongoose.connect(`${process.env.MONGO_URI}`)
  .then(()=> console.log("MongoDB Connected"))
  .catch(err=> console.log(err));

app.listen(5000,()=>console.log('Server running on port 5000'))