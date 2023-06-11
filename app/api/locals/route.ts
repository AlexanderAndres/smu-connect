import { NextResponse } from "next/server";
import prisma from "../../utils/prismadb";

export async function POST(request: Request) {
  const { rut, role } = await request.json();
  var data
  switch (role) {
    case 1 || 2:
        data = await prisma.local.findMany({
          })
        break;
    case 3:
        data = await prisma.local.findMany({
            where: {
              "jefeSuper_rut": rut,
            },
          })
        break;
    case 4:
        data = await prisma.local.findMany({
            where: {
              "supervisor_rut": rut,
            },
          })
        break;
    case 5:
        data = await prisma.local.findMany({
            where: {
              "administrador_rut": rut,
            },
          })
        break;
  }
  return NextResponse.json({ rut, role, data });
 
}


