import { STORAGE_NAME } from "@/libs/constants";

export async function POST(request: Request) {
  const res = await request.json();

  localStorage.setItem(STORAGE_NAME, JSON.stringify(res));

  return new Response(localStorage.getItem(STORAGE_NAME), { status: 200 });
}
