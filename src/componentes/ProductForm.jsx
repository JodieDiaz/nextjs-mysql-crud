"use client";
import { useState, useRef,useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation"; //para poder cambiar de pagina y redirigira principal despues de crear el producto.

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  const form = useRef(null);
  const router = useRouter();
  const params = useParams();
  console.log(params)

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  //cargar datos al formulario de edit/id
  useEffect(() => {
    if (params.id) {
      axios
        .get(`/api/products/${params.id}`)
        .then((res) => {
          if (res.data && Array.isArray(res.data)) {
            // Si la respuesta es un array, accedemos al primer elemento [0]
            const productData = res.data[0]; // Esto toma el primer objeto del array
            setProduct({
              name: productData.name || "",
              price: productData.price || "",
              description: productData.description || "",
            });
          } else {
            // Si no es un array, asignamos el objeto directamente
            setProduct({
              name: res.data.name || "",
              price: res.data.price || "",
              description: res.data.description || "",
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    }
  }, [params.id]);


 const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     let res;
     const config = {
       headers: {
         "Content-Type": "application/json",
       },
     };

     if (!params.id) {
       // Si no hay params.id, se crea un nuevo producto (POST)
       res = await axios.post("/api/products", product, config);
     } else {
       // Si hay params.id, se actualiza el producto existente (PUT)
       res = await axios.put(`/api/products/${params.id}`, product, config);
     }

     console.log(res);

     // Reiniciar el estado del producto
     setProduct({
       name: "",
       price: "",
       description: "",
     });

     // Redirigir a la página de productos
     router.push("/products");
     router.refresh();
   } catch (error) {
     console.error("Error submitting form:", error);
   }
 };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="bg-gray-900 shadow-md rounded-md px-8 py-6 mb-4 grid grid-cols-1 gap-y-6 max-w-sm w-full"
        onSubmit={handleSubmit}
        ref={form}
        style={{ minWidth: "300px" }}
      >
        {/* Product Name */}
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product Name:
        </label>
        <input
          name="name"
          type="text"
          placeholder="name"
          onChange={handleChange}
          value={product.name}
          className="shadow appearance-none border rounded w-full py-2 px-3"
          autoFocus
        />

        {/* Product Price */}
        <label
          htmlFor="price"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product Price:
        </label>
        <input
          name="price"
          type="text"
          placeholder="00.00"
          onChange={handleChange}
          value={product.price}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        {/* Product Description */}
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product Description:
        </label>
        <textarea
          name="description"
          rows={3}
          placeholder="description"
          onChange={handleChange}
          value={product.description}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <button className="text-wheat font-bold py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-700 text-white">
          {params.id ? "Update Product": "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
