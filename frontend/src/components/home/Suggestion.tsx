import { Text } from "../text";

export default function Suggestion() {
  const suggestions = [
    {
      suggestion: "Designer",
      href: "#",
    },
    {
      suggestion: "Programming",
      href: "#",
    },
    {
      suggestion: "Digital Marketing",
      href: "#",
    },
    {
      suggestion: "Video",
      href: "#",
    },
    {
      suggestion: "Animation",
      href: "#",
    },
  ];

  return (
    <Text className="font-[600] mt-3">
      <span className="text-[--gray-200]">Suggestion:</span>{" "}
      {suggestions
        .map((suggestion) => (
          <a
            href={suggestion.href}
            className={
              suggestion.suggestion === "Digital Marketing"
                ? "text-[--primary-600]"
                : "text-[--gray-700]"
            }
          >
            {suggestion.suggestion}
          </a>
        ))
        .reduce((acc, x) =>
          !acc ? (
            x
          ) : (
            <>
              {acc}, {x}
            </>
          )
        )}
    </Text>
  );
}
