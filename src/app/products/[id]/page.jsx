import React from "react";
import axios from "axios";

async function LoadProduct(productId){
   const res = await axios.get
   ('http://localhost:3000/api/products/' + productId);
   console.log(res);
}

function ProductPage({params}){

    LoadProduct(params.id)
    return(
        <div className="text-white">ProductPage</div>
    )
}

export default ProductPage