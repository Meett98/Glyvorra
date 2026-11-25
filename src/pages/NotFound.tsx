import { Link } from "react-router-dom";
import { useSeo } from "../hooks/useSeo";

export default function NotFound() {
  useSeo("Page not found", undefined, undefined, { noindex: true });
  return (
    <div className="container-x py-32 text-center">
      <p className="eyebrow mb-3">404</p>
      <h1 className="text-5xl">This page could not be found.</h1>
      <Link to="/shop" className="btn-gold mt-10">Back to Shop</Link>
    </div>
  );
}
