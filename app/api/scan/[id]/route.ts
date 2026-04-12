import { NextResponse } from "next/server";
import { getAuth } from "@/lib/better-auth/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const auth = await getAuth();
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`https://dogo-backend-7idt.onrender.com/api/scan/${params.id}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    return NextResponse.json(data);
}
