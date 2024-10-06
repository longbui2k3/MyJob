import { PiCurrencyDollarLight } from "react-icons/pi";
import Info from "./Info";
interface SalaryInfoProps {
  info?: string;
}
export default function SalaryInfo({ info = "" }: SalaryInfoProps) {
  return <Info Icon={PiCurrencyDollarLight} info={info} />;
}
