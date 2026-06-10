import React from "react";
import { useParams, useNavigate } from "react-router";
import { useProduct } from "../../hooks/useProduct";
import Navbar from "../../components/Navbar";
import StarRating from "../../components/StarRating";
import { LoadingDetailPage } from "../../components/LoadingGrid";
import ErrorMessage from "../../components/ErrorMessage";
import { button } from "../../components/ui";
import ProductLayout from "./layout";

export function meta() {
    return [
        { title: "Product Detail | ShopHub" },
        { name: "description", content: "Product details and reviews." },
    ];
}

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { product, selectedImage, setSelectedImage, originalPrice, loading, error } = useProduct(id);

    const backButtonClass = button({
        variant: "outline",
        size: "sm",
        className: "inline-flex items-center gap-2",
    });

    return (
        <div className="min-h-screen bg-slate-50 pb-10">
            <Navbar />
            {loading && <LoadingDetailPage />}

            {error && !loading && (
                <div className="mt-6">
                    <ErrorMessage message={error} onRetry={() => window.location.reload()} />
                </div>
            )}

            <ProductLayout>
                {!loading && !error && product && (<>
                    <ProductLayout.Gallery selectedImage={selectedImage} setSelectedImage={setSelectedImage} images={product.images || []} />
                    <ProductLayout.Info>
                        <ProductLayout.Sections title={product.title}>
                            <div className="flex flex-wrap items-end gap-4">
                                <p className="text-3xl font-semibold text-slate-950">${product.price.toFixed(2)}</p>
                                {originalPrice && <p className="text-sm text-slate-500 line-through">${originalPrice}</p>}
                                <StarRating rating={product.rating} size="md" />
                            </div>
                            <p> Brand : {product.brand} </p>
                            <p> Category : {product.category} </p>
                            <p> Stock : {product.stock} </p>
                        </ProductLayout.Sections>
                        <ProductLayout.Sections title="Description">
                            <p>{product.description}</p>
                        </ProductLayout.Sections>
                        <ProductLayout.Sections title="Reviews">
                            {product.reviews.length > 0 ? (
                                product.reviews.map((review, idx) => (
                                    <ProductLayout.Review key={idx} review={review} />
                                ))
                            ) : (<p>No reviews yet</p>)}
                        </ProductLayout.Sections>
                    </ProductLayout.Info>
                </>
                )}
            </ProductLayout>
        </div>
    );
}
