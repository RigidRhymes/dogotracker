import { NextResponse } from "next/server";
import { getAuth } from "@/lib/better-auth/auth";
import { scanEmailRisk } from "@/backend/src/api/scanEmailRisk";
import { scans } from "../store";

export async function POST(req: Request){
    const auth = await getAuth()
    const session = await auth.api.getSession({ headers: req.headers });

    if( !session ){
        return NextResponse.json({ error: "Unauthorized"}, { status: 401})
    }

    const { email } = await req.json()

    const scanId = "scan-" + Date.now()
    scans[scanId] = email;
    return NextResponse.json({ scanId })
}

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const auth = await getAuth();
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = scans[params.id];
    if (!email) {
        return NextResponse.json({ error: "Scan not found" }, { status: 404 });
    }

    const result = await scanEmailRisk(email);
    return NextResponse.json({ status: "completed", result });
}

