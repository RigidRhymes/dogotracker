import { Router, Request } from 'express';
import { requireAuth } from "../middleware/requireAuth";
import { createScan } from "../db/scan.model";
import {db} from '../db'

export const scanRouter = Router();

scanRouter.post('/', requireAuth, async (req: Request & { user?: { id: string; email?: string } }, res) => {
    const { email } = req.body as { email: string };
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const scan = await createScan(userId, email);
      setTimeout(async ()=> {
          try {
              await db.query(
                  `UPDATE scans SET status = 'completed', updated_at = NOW() WHERE id = $1`,
                  [scan.id]
              )
          }catch (err){
              console.error('Failed to update scan status', err)
          }
      }, 5000)


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

