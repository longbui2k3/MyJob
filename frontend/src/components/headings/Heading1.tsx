import Heading from "./Heading";

interface Heading1Props {
  name: string;
  className?: string;
}
export default function Heading1({ name, className }: Heading1Props) {
  return <Heading name={name} className={className} size={40} />;
}
