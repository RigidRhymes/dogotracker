
import { Request, Response, NextFunction } from "express";
import {getAuth} from "../../../lib/better-auth/auth";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const auth = await getAuth()
    const session = await auth.api.getSession({
        headers: new Headers(
            Object.entries(req.headers).map(([key, value ]) => [key, String(value)])
        )
    });

    if (!session?.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    (req as any).user = session.user;
    next();
};
