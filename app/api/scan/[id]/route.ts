import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Define the type with a Promise for params
type Context = {
    params: Promise<{ id: string }>;
};

export async function GET(
    request: NextRequest,
    context: Context
) {
    // 1. Await params (Required in Next.js 15)
    const { id } = await context.params;

    // 2. Manual cookie forwarding (if proxying auth)
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();

    const res = await fetch(`https://dogo-backend-7idt.onrender.com/api/scan/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Cookie": allCookies // Forwarding auth to backend
        },
    });

    if (!res.ok) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
}
