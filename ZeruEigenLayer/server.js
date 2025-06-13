import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import restakersR from './routes/restaker.route.js';
import validatorsR from './routes/validator.route.js';
import rewardsR from './routes/reward.route.js';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);
console.log('MongoDB connected');

const app = express();
app.use(express.json());
app.get('/', (_,res)=>res.send('EigenLayer Restake API'));
app.use('/restakers', restakersR);
app.use('/validators', validatorsR);
app.use('/rewards', rewardsR);
app.listen(process.env.PORT, ()=>console.log('Listening', process.env.PORT));
