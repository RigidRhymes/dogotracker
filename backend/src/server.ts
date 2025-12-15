import express from 'express';
import {scanRouter} from "./api/scan.route";
import cors from 'cors'

export const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use('/api/scan', scanRouter);