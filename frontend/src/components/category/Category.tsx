import { Heading6 } from "../headings";
import { IconWithBg } from "../icons";
import { Text } from "../text";
interface CategoryProps {
  iconUrl?: string;
  href?: string;
  categoryName?: string;
  num_open_positions?: number;
  className?: string;
  hasTools?: boolean;
}
export default function Category({
  iconUrl = "",
  href = "#",
  categoryName = "",
  num_open_positions = 0,
  className = "",
  hasTools = false,
}: CategoryProps) {
  return (
    <div className={`flex space-x-2 p-6 ${className}`}>
      <IconWithBg
        divSize={54}
        imgSize={25}
        src={iconUrl}
        backgroundColor={"var(--primary-50)"}
      />
      <div className="flex flex-col justify-center">
        {hasTools ? (
          <Heading6
            name={categoryName}
            className="hover:text-[--primary-500] hover:underline cursor-pointer"
          />
        ) : (
          <a href={href}>
            <Heading6
              name={categoryName}
              className="hover:text-[--primary-500] hover:underline cursor-pointer"
            />
          </a>
        )}

        <Text
          children={`${num_open_positions} Open position`}
          className="mt-[4px]"
        />
      </div>
    </div>
  );
}
