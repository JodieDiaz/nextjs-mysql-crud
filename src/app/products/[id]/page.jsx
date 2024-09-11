import React from "react";
import axios from "axios";
import Buttons from "./Buttons";

async function LoadProduct(productId){
   const {data} = await axios.get
   ('http://localhost:3000/api/products/' + productId);

   return data[0]; //soluciona el problema de doble array accediendo al primer elemento 
}

async function ProductPage({params}){

    const product = await LoadProduct(params.id);
    console.log(product)

    return (
      <section className="flex justify-center items-center">
        <div className="text-black bg-white py-6 px-9 ">
          <p>Name: {product.name}</p>
          <p>Price: {product.price}</p>
          <p>Description: {product.description}</p>
          <Buttons productId = {product.id}/>
        </div>
      </section>
    );
    
}

export default ProductPage