import { GoBookmark } from "react-icons/go";

interface UnfavoriteCandidateIconProps {
  candidateId?: string;
  setIsFavoriteCandidate: (isFavoriteCandidate: boolean) => void;
}

export default function UnfavoriteCandidateIcon({
  candidateId = "",
  setIsFavoriteCandidate = () => {},
}: UnfavoriteCandidateIconProps) {
  async function favoriteCandidate(e: any) {
    e.preventDefault();
  }
  return (
    <GoBookmark
      fontSize={"25px"}
      className="my-auto"
      color="var(--primary-500)"
      onClick={favoriteCandidate}
    />
  );
}
