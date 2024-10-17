import { DEFAULT_PADDING_X } from "../../helpers/constants";
import { Heading3, Heading6 } from "../headings";
import { Text } from "../text";

export default function MostPopularVacancies() {
  const vacancies = [
    { name: "Anesthesiologists", num_open_positions: 45904, href: "#" },
    { name: "Surgeons", num_open_positions: 50364, href: "#" },
    {
      name: "Obstetricians-Gynecologists",
      num_open_positions: 4339,
      href: "#",
    },
    { name: "Orthodontists", num_open_positions: 20079, href: "#" },
    { name: "Maxillofacial Surgeons", num_open_positions: 74875, href: "#" },
    { name: "Software Developer", num_open_positions: 43359, href: "#" },
    { name: "Psychiatrists", num_open_positions: 18599, href: "#" },
    { name: "Data Scientist", num_open_positions: 28200, href: "#" },
    { name: "Financial Manager", num_open_positions: 61391, href: "#" },
    { name: "Management Analysis", num_open_positions: 93046, href: "#" },
    { name: "IT Manager", num_open_positions: 50963, href: "#" },
    {
      name: "Operations Research Analysis",
      num_open_positions: 16627,
      href: "#",
    },
  ];
  return (
    <div
      className={`w-full h-[400px]`}
      style={{
        padding: `80px ${DEFAULT_PADDING_X}`,
      }}
    >
      <Heading3 name="Most Popular Vacancies" />
      <div className="w-full mt-10 grid grid-cols-4 gap-5 content-around">
        {vacancies.map((vacancy) => (
          <div>
            <a href={vacancy.href}>
              <Heading6
                name={vacancy.name}
                className="hover:text-[--primary-500] hover:underline"
              />
            </a>
            <Text
              children={`${vacancy.num_open_positions} Open Positions`}
              className="mt-[6px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
