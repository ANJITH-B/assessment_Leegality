import { useNavigate } from "react-router";
import StarRating from "../../components/StarRating";
import type { Review } from "~/types/product";
import Button from "~/components/ui/button";

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" p-4 sm:px-6 xl:px-8 relative h-[calc(100vh-4rem)] overflow-y-auto">
      <div className=" mx-auto max-w-7xl ">{children}</div>
    </div>
  );
};

const Gallery = ({
  images,
  setSelectedImage,
  selectedImage,
}: {
  images: string[];
  setSelectedImage: (image: string) => void;
  selectedImage: string;
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-5 md:w-[400px] lg:w-[600px] py-8 md:fixed top-16 pl-6  ">
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate("/products")}
        aria-label="Back to product list"
      >
        {" "}
        ← Back{" "}
      </Button>
      <div className="flex flex-col justify-center space-y-6">
        <img
          src={selectedImage}
          alt={"https://placehold.co/400x400?text=No+Image"}
          className="h-[420px] w-full object-contain transition duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/400x400?text=No+Image";
          }}
        />
        <div className="flex flex-row w-full justify-center ">
          {images && images.length > 1 && (
            <div className=" flex gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`overflow-hidden h-20 w-20 p-2 rounded border ${
                    selectedImage === img
                      ? "border-indigo-600 shadow-sm"
                      : "border-slate-200"
                  } bg-white transition`}
                  onClick={() => setSelectedImage(img)}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`preview ${idx + 1}`}
                    className="object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/80x80?text=Img";
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Info = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex justify-end">
      <div className="md:w-1/2">{children}</div>
    </div>
  );
};

const Review = ({ review }: { review: Review }) => {
  return (
    <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-semibold text-slate-950">
          {review.reviewerName}
        </span>
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
  );
};

const Sections = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="mt-10 border-b border-slate-200 pb-6 space-y-4 ">
      <p className="text-lg font-semibold text-slate-950">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
};

ProductLayout.Gallery = Gallery;
ProductLayout.Info = Info;
ProductLayout.Sections = Sections;
ProductLayout.Review = Review;

export default ProductLayout;
