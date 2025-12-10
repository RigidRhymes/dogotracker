import express from 'express';
import {scanRouter} from "./api/scan.route";

export const app = express();
app.use(express.json())
app.use('/api/scan', scanRouter);