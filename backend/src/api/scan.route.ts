import { Router, Request } from 'express';
import { requireAuth } from "../middleware/requireAuth";
import { createScan } from "../db/scan.model";
import {db} from '../db'
import { scanEmailRisk } from "./scanEmailRisk"


// This file is for search mentions
export const scanRouter = Router();

scanRouter.post('/', requireAuth, async (req: Request & { user?: { id: string; email?: string } }, res) => {
    const { email } = req.body as { email: string };
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {

        const scan = await createScan(userId, email)
        res.status(201).json({scanId: scan.id})


        setTimeout(async () => {
            try {
                const riskResult = await scanEmailRisk(email);

                const breaches = riskResult.publicMentions.map((url: string) => ({
                    name: new URL(url).hostname,
                    date: new Date().toISOString(),
                    exposed: ["email"],
                    risk: riskResult.hasGravatar || riskResult.foundOnGitHub ? "High" : "Medium",
                    source: url,
                }));

                const result = {
                    breaches,
                    totalMentions: riskResult.publicMentions.length,
                    signals: {
                        isValid: riskResult.isValid,
                        hasGravatar: riskResult.hasGravatar,
                        foundOnGitHub: riskResult.foundOnGitHub,
                        foundInBreaches: riskResult.foundInBreaches,
                    },
                    summary: riskResult.summary,
                };

                console.log(`Scanning email: ${email}`);
                console.log(`Found ${riskResult.publicMentions.length} mentions`);

                await db.query(
                    `UPDATE scans SET status = 'completed', updated_at = NOW(), result = $2 WHERE id = $1`,
                    [scan.id, JSON.stringify(result)]
                );
            } catch (err) {
                console.error("Failed to update scan status", err);
                const errorMessage = err instanceof Error ? err.message : String(err);
                await db.query(
                    `UPDATE scans SET status = 'failed', updated_at = NOW(), result = $2 WHERE id = $1`,
                    [scan.id, JSON.stringify({ error: errorMessage })]
                );
            }
        }, 5000);

    } catch (err) {
        console.error('Scan creation failed:', err);
        return res.status(500).json({ error: 'Database error' });
    }

});

scanRouter.get('/:id', requireAuth, async (req: Request & {user?: {id: string} }, res) => {
    const {id} = req.params;

    try {
        const result = await db.query(
            `SELECT * FROM scans WHERE id= $1 AND user_id = $2`,
            [id, req.user?.id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({error: 'Scan not found'})
        }
        return res.json(result.rows[0]);
    }catch (err){
        console.error('Scan fetch failed:', err);
        return res.status(500).json({error: 'Database error'})
    }
})

