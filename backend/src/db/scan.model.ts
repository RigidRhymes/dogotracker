import {db} from './index'

export async function createScan(userId: string, email: string) {
    const result = await db.query(
        `INSERT INTO scans (user_id, email, status, created_at, updated_at)
        VALUES ($1, $2, 'queued', NOW(), NOW()) RETURNING id`,
        [userId, email]
    )

    return result.rows[0];
}