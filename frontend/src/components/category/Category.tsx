import { Heading6 } from "../headings";
import { IconWithBg } from "../icons";
import { Text } from "../text";
interface CategoryProps {
  img_src?: string;
  href?: string;
  category?: string;
  num_open_positions?: number;
}
export default function Category({
  img_src = "",
  href = "#",
  category = "",
  num_open_positions = 0,
}: CategoryProps) {
  return (
    <div className="flex space-x-2 p-6">
      <IconWithBg
        divSize={54}
        imgSize={25}
        src={img_src}
        backgroundColor={"var(--primary-50)"}
      />
      <div className="flex flex-col justify-center">
        <a href={href}>
          <Heading6
            name={category}
            className="hover:text-[--primary-500] hover:underline"
          />
        </a>
        <Text
          children={`${num_open_positions} Open position`}
          className="mt-[4px]"
        />
      </div>
    </div>
  );
}
