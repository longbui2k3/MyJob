import Heading from "./Heading";

interface Heading6Props {
  name: string;
  className?: string;
}
export default function Heading6({ name, className }: Heading6Props) {
  return <Heading name={name} className={className} size={15} />;
}
