import {getAuth} from "@/lib/better-auth/auth";
import {NextResponse} from "next/server";
import {createSocialScan} from "@/backend/src/db/scan.service";

export async function POST(req: Request){
    const auth = await getAuth();
    const session = await auth.api.getSession({headers: req.headers});
    if(!session) return NextResponse.json({ error: "Unauthorized" });

    const { platform, handle } = await req.json();

    const scan = await createSocialScan(session.user.id, platform, handle);
    return NextResponse.json({ scanId: scan.id });
}