import { SavedCandidate } from "../candidate";
import { Heading5 } from "../headings";

export default function DashboardSavedCandidate() {
  return (
    <>
      <Heading5 name="Saved Cadidates" className="mb-2" />
      <SavedCandidate />
    </>
  );
}
