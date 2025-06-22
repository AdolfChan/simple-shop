export function renderStars(rating: number) {
  return Array.from({ length: 5 }).map((_, index) => (
    <span
      key={index}
      className={`text-xl ${
        index < rating ? "text-yellow-400" : "text-gray-300"
      }`}
    >
      ★
    </span>
  ));
}
type StarsProps = {
  rating: number;
  setRating: (rating: number) => void;
};
export function RenderdynamicStars({ rating, setRating }: StarsProps) {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => setRating(index + 1)}
          className={`text-xl ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
