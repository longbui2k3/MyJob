import { PiCurrencyDollarLight } from "react-icons/pi";
import { Info } from "../../global";

interface SalaryInfoProps {
  info?: string;
}
export default function SalaryInfo({ info = "" }: SalaryInfoProps) {
  return <Info Icon={PiCurrencyDollarLight} info={info} />;
}
