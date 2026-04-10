import {getAuth} from "@/lib/better-auth/auth";
import {NextResponse} from "next/server";
import { scans } from "./store";

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