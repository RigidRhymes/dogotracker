import { getAuth } from "@/lib/better-auth/auth";
import { NextResponse } from "next/server";
import { createScan } from "@/backend/src/db/scan.model";

export async function POST(req: Request) {
    const auth = await getAuth();
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email } = await req.json();
    const scan = await createScan(session.user.id, email);

    return NextResponse.json({ scanId: scan.id });
}
