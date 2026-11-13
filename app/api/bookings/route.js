export const dynamic = 'force-static';
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
  return { appointments: [] };
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
  return NextResponse.json(data.appointments || [], { headers: corsHeaders() });
}

export async function POST(request) {
  try {
    const booking = await request.json();
    const data = readData();
    const appointments = data.appointments || [];

    const newBooking = {
      id: "apt-" + Date.now(),
      createdAt: new Date().toISOString(),
      status: "Pending",
      ...booking
    };

    const updatedAppointments = [newBooking, ...appointments];
    data.appointments = updatedAppointments;
    writeData(data);

    return NextResponse.json(
      { success: true, booking: newBooking },
      { headers: corsHeaders() }
    );
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function PATCH(request) {
  try {
    const { id, status } = await request.json();
    const data = readData();
    const appointments = data.appointments || [];

    data.appointments = appointments.map((apt) =>
      apt.id === id ? { ...apt, status, updatedAt: new Date().toISOString() } : apt
    );
    writeData(data);

    return NextResponse.json(
      { success: true, appointments: data.appointments },
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
    const appointments = data.appointments || [];

    data.appointments = appointments.filter((apt) => apt.id !== id);
    writeData(data);

    return NextResponse.json(
      { success: true, appointments: data.appointments },
      { headers: corsHeaders() }
    );
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500, headers: corsHeaders() });
  }
}


