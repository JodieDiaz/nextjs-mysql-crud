import { NextResponse } from "next/server";
import { conn } from "@/libs/db";


export async function GET() {
    try {
        const results = await conn.query("SELECT * FROM productjodie");
        console.log("Results:", results); 
        return NextResponse.json(results);
        

        }catch (error){
         return NextResponse.json({
            message: error.message,
         },
         {
            status:500,
         }
        );
     }
    }



export async function POST(request) {
  try {
    const { name, description, price } = await request.json();

    // Verifica si los campos necesarios están presentes
    if (!name || !description || !price) {
      throw new Error(
        "Todos los campos (name, description, price) son requeridos."
      );
    }

    // Realiza la inserción de datos en la base de datos
    const [result] = await conn.query("INSERT INTO productjodie SET ?", {
      name,
      description,
      price,
    });

    // Retorna la respuesta con el id insertado y los demás datos
    return NextResponse.json({
      id: result.insertId, // Captura correcta del ID generado
      name,
      description,
      price,
    });
  } catch (error) {
    // Muestra el error en la consola con detalles
    console.error("Error durante la inserción de datos:", error.message);
    console.error("Detalles completos del error:", error);

    // Retorna una respuesta con el mensaje de error y un código de estado 500
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
