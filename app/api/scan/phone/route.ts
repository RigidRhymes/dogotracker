import {getAuth} from "@/lib/better-auth/auth";
import {NextResponse} from "next/server";
import {createPhoneScan} from "@/backend/src/db/scan.service";


export async function POST(req: Request){
    const auth = await getAuth();
    const session = await auth.api.getSession({headers: req.headers});
    if(!session) return NextResponse.json({ error: "Unauthorized" });

    const { phone } = await req.json();

    const scan = await createPhoneScan(session.user.id, phone);
    return NextResponse.json({ scanId: scan.id });
}