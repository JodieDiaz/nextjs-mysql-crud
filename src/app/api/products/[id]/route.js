import { NextResponse } from "next/server";
import { conn } from "@/libs/db";

export async function GET(request, { params }) {
  // Extraer el id del parámetro
  const { id } = params;

  // Ejecutar la consulta con el id extraído
  try {
    const [result] = await conn.query(
      "SELECT * FROM productjodie WHERE id = ?",
      [id]
    );

    if (result.length == 0){
      return NextResponse.json(
        {
          message: "producto no encontrado",
        },
        {
          status : 404,
        }
      );
    }
    console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error en la consulta:", error);
    return NextResponse.json(
      { message: "Error al obtener el producto" },
      { status: 500 }
    );
  }
}

export async function DELETE(request,{ params }) {
  try {
    const result = await conn.query("DELETE FROM productjodie WHERE id= ?", [
      params.id,
    ]);

     if (result.affectedRows == 0){
      return NextResponse.json(
        {
          message: "producto no encontrado",
        },
        {
          status : 404,
        }
      );

    } 
      return new Response(null, {
        status: 204,
      });
  
    } catch (error) {
      return NextResponse.json(
       { message: "Error al eliminar producto" },
       { status: 500 }
     );
  }
}


export async function PUT(request, {params}) {
  try {
    const data = await request.json();
    const result = await conn.query("UPDATE productjodie SET ? WHERE id = ?", [
      data,
      params.id,
    ]);

    if (result.affectedRows == 0) {
      return NextResponse.json(
        {
          message: "producto no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    const updatedProduct = await conn.query(
      "SELECT * FROM productjodie WHERE id = ?",
      [params.id]
    );

    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    return NextResponse.json(
      { message: "Error al actualizar producto" },
      { status: 500 }
    );
  }
}