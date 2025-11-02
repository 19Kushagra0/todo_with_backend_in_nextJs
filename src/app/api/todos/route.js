import { NextResponse } from "next/server";

let todos = []; // This will store your todos in memory

export async function POST(request) {
  // receiving data from frontend
  const data = await request.json();
  // console.log(`Backend received data from frontend: ${data.todo} `);

  console.log(`Backend received data from frontend: `, data);

  if (data.todo) {
    todos.push(data.todo); // Store the received todo(s)
    // returning confirmation response to frontend
    return NextResponse.json({
      message: "Data received and todo added",
    });
  }

  if (data.deleteTodo !== undefined) {
    console.log(data.deleteTodo);
    todos = todos.filter((el, index, arr) => {
      if (index !== data.deleteTodo) {
        return true;
      } else {
        return false;
      }
    });
    return NextResponse.json({
      message: "data received and todo deleted",
    });
  }

  if (data.editTodo) {
    console.log(data.editTodo);
    todos = todos.map((el, index, arr) => {
      if (index === data.oldValue) {
        return data.editTodo;
      } else {
        return el;
      }
    });
    return NextResponse.json({
      message: "data recived and todo updated",
    });
  }
}

export async function GET() {
  // Return data to the frontend
  return NextResponse.json({ todos });
}
