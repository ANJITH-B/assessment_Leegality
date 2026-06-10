import { useNavigate } from "react-router";
import StarRating from "../../components/StarRating";
import type { Review } from "~/types/product"
import { Button } from "~/components/ui";


const ProductLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex mx-auto max-w-7xl px-4 py-8 sm:px-6 xl:px-8">{children}</div>
    )
}

const Gallery = ({ images, setSelectedImage, selectedImage }: { images: string[]; setSelectedImage: (image: string) => void; selectedImage: string }) => {
    const navigate = useNavigate();

    return (
        <div>
            <Button type="button" variant="outline" onClick={() => navigate("/products")} aria-label="Back to product list"> ← Back </Button>

            <img
                src={selectedImage}
                alt={"https://placehold.co/400x400?text=No+Image"}
                className="h-[420px] w-full object-cover transition duration-300 hover:scale-105"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/400x400?text=No+Image";
                }}
            />

            {images && images.length > 1 && (
                <div className="grid gap-3 grid-cols-4">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            type="button"
                            className={`overflow-hidden rounded-2xl border ${selectedImage === img ? "border-indigo-600 shadow-sm" : "border-slate-200"
                                } bg-white transition`}
                            onClick={() => setSelectedImage(img)}
                            aria-label={`View image ${idx + 1}`}
                        >
                            <img
                                src={img}
                                // alt={`${product.title} view ${idx + 1}`}
                                alt="nn"
                                className="h-20 w-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://placehold.co/80x80?text=Img";
                                }}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

const Info = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="space-y-5 w-1/2">
            {children}
        </div>
    )
}

const Review = ({ review }: { review: Review }) => {
    return (
        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-semibold text-slate-950">{review.reviewerName}</span>
                <StarRating rating={review.rating} size="sm" />
            </div>
            <p className="mt-3 text-sm text-slate-700">{review.comment}</p>
            {review.date && (
                <p className="mt-3 text-xs text-slate-500">
                    {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            )}
        </div>
    )
}

const Sections = ({ children, title }: { children: React.ReactNode; title: string }) => {
    return (
        <div className="mt-10 border-b border-slate-200 pb-6 space-y-4 ">
            <p className="text-lg font-semibold text-slate-950">{title}</p>
            <div className="space-y-2">{children}</div>
        </div>
    )
}


ProductLayout.Gallery = Gallery;
ProductLayout.Info = Info;
ProductLayout.Sections = Sections;
ProductLayout.Review = Review;

export default ProductLayout;