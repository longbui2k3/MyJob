import { FaPlus } from "react-icons/fa";
import { ButtonSolid } from "../../buttons";
interface ButtonAddProps {
  onClick?: (e) => void;
}
export default function ButtonAdd({ onClick = () => {} }: ButtonAddProps) {
  return (
    <ButtonSolid
      height="30px"
      leftIcon={<FaPlus size={16} />}
      onClick={onClick}
      className="my-[10px]"
    />
  );
}
