// import { NextResponse } from "next/server";

// const todos = []; // Your in-memory storage

// export async function POST(request) {
//   // receiving data from frontend
//   const data = await request.json();

//   console.log("Recived data from frontend", data);
//   return NextResponse.json({ message: "Data received" });
// }

import { NextResponse } from "next/server";

const todos = []; // This will store your todos in memory

export async function POST(request) {
  // receiving data from frontend
  const data = await request.json();
  // console.log(`Backend received data from frontend: ${data.todo} `);

  console.log(`Backend received data from frontend: `, data);

  todos.push(data.todo); // Store the received todo(s)
  // returning confirmation response to frontend
  return NextResponse.json({ message: "Data received and todo added", todos });
}

export async function GET() {
  // Return data to the frontend
  return NextResponse.json({ todos });
}
