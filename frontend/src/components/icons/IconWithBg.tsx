import { div } from "framer-motion/client";

interface IconWithBgProps {
  divSize?: number;
  imgSize?: number;
  backgroundColor?: string;
  src?: string;
}

export default function IconWithBg({
  divSize = 54,
  imgSize = 40,
  backgroundColor = "white",
  src = "",
}: IconWithBgProps) {
  return (
    <div
      className={`flex justify-center rounded-md`}
      style={{
        backgroundColor,
        width: `${divSize}px`,
        height: `${divSize}px`,
      }}
    >
      <img src={src} style={{ width: `${imgSize}px` }}></img>
    </div>
  );
}
