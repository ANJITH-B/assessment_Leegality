import { useParams } from "react-router";
import { useProduct } from "../../hooks/useProduct";
import StarRating from "../../components/StarRating";
import { LoadingDetailPage } from "../../components/LoadingGrid";
import ErrorMessage from "../../components/ErrorMessage";
import ProductLayout from "./layout";
import { Typography } from "~/components/ui/typography";

export function meta() {
  return [
    { title: "Product Detail | ShopHub" },
    { name: "description", content: "Product details and reviews." },
  ];
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const {
    product,
    selectedImage,
    setSelectedImage,
    originalPrice,
    loading,
    error,
  } = useProduct(id);

  return (
    <div className=" bg-slate-50 h-screen overflow-hidden">
      {loading && <LoadingDetailPage />}
      {error && !loading && (
        <div className="mt-6">
          <ErrorMessage
            message={error}
            onRetry={() => window.location.reload()}
          />
        </div>
      )}

      <ProductLayout>
        {!loading && !error && product && (
          <>
            <ProductLayout.Gallery
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              images={product.images || []}
            />
            <ProductLayout.Info>
              <ProductLayout.Sections title={product.title}>
                <div className="flex flex-wrap items-end gap-4">
                  <p className="text-3xl font-semibold text-slate-950">
                    ${product.price.toFixed(2)}
                  </p>
                  {originalPrice && (
                    <p className="text-sm text-slate-500 line-through">
                      ${originalPrice}
                    </p>
                  )}
                  <StarRating rating={product.rating} size="md" />
                </div>

                {[
                  { label: "Brand", info: product.brand },
                  { label: "Category", info: product.category },
                  { label: "Stock", info: product.stock },
                ].map((info, idx) => (
                  <Typography key={idx} variant="title">
                    {info.label} :{" "}
                    <span className="font-medium text-slate-700">
                      {info.info}
                    </span>
                  </Typography>
                ))}
              </ProductLayout.Sections>
              <ProductLayout.Sections title="Description">
                <p>{product.description}</p>
              </ProductLayout.Sections>

              <ProductLayout.Sections title="Reviews">
                {product.reviews.length > 0 ? (
                  product.reviews.map((review, idx) => (
                    <ProductLayout.Review key={idx} review={review} />
                  ))
                ) : (
                  <p>No reviews yet</p>
                )}
              </ProductLayout.Sections>
            </ProductLayout.Info>
          </>
        )}
      </ProductLayout>
    </div>
  );
}

// <Typography variant="subtitle" className="mt-2">
//     {product.brand} - {product.category}
// </Typography>
// <p> Brand : {product.brand} </p>
// <p> Category : {product.category} </p>
// <p> Stock : {product.stock} </p>
