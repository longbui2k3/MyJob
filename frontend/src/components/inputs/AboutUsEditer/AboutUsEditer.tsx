import { Text } from "@chakra-ui/react";
import { RichTextEditer } from "../RichTextEditer";

interface AboutUsEditerProps {
  value?: string;
  onChange: (e) => void;
}

export default function AboutUsEditer({ value, onChange }: AboutUsEditerProps) {
  return (
    <div className="relative w-full">
      <Text className="font-normal text-sm mb-2">Abouts us</Text>
      <RichTextEditer
        value={value}
        onChange={onChange}
        placeholder="Write down about your company here. Let the candidate know who we are..."
      />
    </div>
  );
}
