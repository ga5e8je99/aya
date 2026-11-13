import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "site-data.json");

function readData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    }
  } catch (e) {
    console.error(e);
  }
  return { messages: [] };
}

function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error(e);
  }
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-admin-pin"
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function GET() {
  const data = readData();
  return NextResponse.json(data.messages || [], { headers: corsHeaders() });
}

export async function POST(request) {
  try {
    const message = await request.json();
    const data = readData();
    const messages = data.messages || [];

    const newMsg = {
      id: "msg-" + Date.now(),
      createdAt: new Date().toISOString(),
      read: false,
      ...message
    };

    data.messages = [newMsg, ...messages];
    writeData(data);

    return NextResponse.json(
      { success: true, message: newMsg },
      { headers: corsHeaders() }
    );
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function PATCH(request) {
  try {
    const { id, read } = await request.json();
    const data = readData();
    const messages = data.messages || [];

    data.messages = messages.map((m) =>
      m.id === id ? { ...m, read: Boolean(read), updatedAt: new Date().toISOString() } : m
    );
    writeData(data);

    return NextResponse.json(
      { success: true, messages: data.messages },
      { headers: corsHeaders() }
    );
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const data = readData();
    const messages = data.messages || [];

    data.messages = messages.filter((m) => m.id !== id);
    writeData(data);

    return NextResponse.json(
      { success: true, messages: data.messages },
      { headers: corsHeaders() }
    );
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500, headers: corsHeaders() });
  }
}


