import { Router } from 'express';
import { requireAuth } from "../middleware/requireAuth";
import { createScan } from "../db/scan.model";

export const scanRouter = Router();

scanRouter.post('/', requireAuth, async (req, res) => {
    const { email } = req.body as { email: string };
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const scan = await createScan(userId, email);
        return res.status(201).json({ scanId: scan.id });
    } catch (err) {
        console.error('Scan creation failed:', err);
        return res.status(500).json({ error: 'Database error' });
    }
});