import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

type RequestWithUser = Request & { user?: JwtPayload & { id: string; email?: string } };

export function requireAuth(req: RequestWithUser, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        // Server misconfiguration: no JWT secret
        return res.status(500).json({ error: 'Server configuration error' });
    }
    console.log('JWT_secret:', secret)
    console.log('Token', token)
    try {
        const decoded = jwt.verify(token, secret) as JwtPayload | string;
        if (typeof decoded === 'string') {
            // Unexpected token payload format
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.user = decoded as JwtPayload & { id: string; email?: string };
        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}