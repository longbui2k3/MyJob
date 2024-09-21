import Heading from "./Heading";

interface Heading5Props {
  name: string;
  className?: string;
}
export default function Heading5({ name, className }: Heading5Props) {
  return <Heading name={name} className={className} size={20} />;
}
