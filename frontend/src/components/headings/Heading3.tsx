import Heading from "./Heading";

interface Heading3Props {
  name?: string;
  className?: string;
}
export default function Heading3({ name, className }: Heading3Props) {
  return <Heading name={name} className={className} size={30} />;
}
