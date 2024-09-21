import { GrayStar, YellowStar } from "../icons";

interface StarRatingProps {
  rating?: number;
}

export default function StarRating({ rating = 5 }: StarRatingProps) {
  return (
    <div className="flex items-center">
      {new Array(rating).fill(0).map((val) => (
        <YellowStar />
      ))}
      {new Array(5 - rating).fill(0).map((val) => (
        <GrayStar />
      ))}
    </div>
  );
}
