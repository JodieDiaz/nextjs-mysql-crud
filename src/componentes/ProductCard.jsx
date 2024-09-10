import Link from "next/link";

function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} className="product-card">
      <div className="product-card">
        <h1 className="product-name">{product.name}</h1>
        <h2 className="product-price">{product.price}</h2>
        <p className="product-description">{product.description}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
