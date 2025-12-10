"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanRouter = void 0;
const express_1 = require("express");
const requireAuth_1 = require("../middleware/requireAuth");
const scan_model_1 = require("../db/scan.model");
exports.scanRouter = (0, express_1.Router)();
exports.scanRouter.post('/', requireAuth_1.requireAuth, async (req, res) => {
    const { email } = req.body;
    const userId = req.user.id;
    try {
        const scan = await (0, scan_model_1.createScan)(userId, email);
        res.status(201).json({ scanId: scan.id });
    }
    catch (err) {
        console.error('Scan creation failed:', err);
        res.status(500).json({ error: 'Database error' });
    }
});
