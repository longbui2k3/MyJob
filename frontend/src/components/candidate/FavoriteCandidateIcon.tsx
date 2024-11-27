import { GoBookmarkFill } from "react-icons/go";

interface FavoriteCandidateIconProps {
  candidateId?: string;
  setIsFavoriteCandidate: (isFavoriteCandidate: boolean) => void;
}

export default function FavoriteCandidateIcon({
  candidateId = "",
  setIsFavoriteCandidate = () => {},
}: FavoriteCandidateIconProps) {
  async function unfavoriteCandidate(e: any) {
    e.preventDefault();
  }
  return (
    <GoBookmarkFill
      fontSize={"25px"}
      className="my-auto"
      color="var(--primary-500)"
      onClick={unfavoriteCandidate}
    />
  );
}
