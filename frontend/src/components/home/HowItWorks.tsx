import { Heading, Heading3 } from "../headings";
import { Text } from "../text";

export default function HowItWorks() {
  const steps = [
    {
      step: "Create account",
      content: "Aliquam facilisis egestas sapien, nec tempor leo tristique et.",
      image_url: "/create_account.svg",
      featured: false,
    },
    {
      step: "Upload CV/Resume",
      content:
        "Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales.",
      image_url: "/upload_file.svg",
      featured: true,
    },
    {
      step: "Find suitable job",
      content: "Phasellus quis eleifend ex. Morbi nec fringilla nibh.",
      image_url: "/search_plus.svg",
      featured: false,
    },
    {
      step: "Apply job",
      content:
        "Curabitur sit amet maximus ligula. Nam a nulla ante, Nam sodales purus.",
      image_url: "/tick.svg",
      featured: false,
    },
  ];
  return (
    <div className="w-full bg-[--gray-100] px-[240px] py-[80px]">
      <div className="flex justify-center w-full">
        <div>
          <Heading3 name="How jobpilot work" className="text-center" />
          <div className="relative flex mt-10 space-x-4">
            <img
              src="/arrow_down.svg"
              className="absolute left-[170px] w-[190px]"
            />
            <img
              src="/arrow_up.svg"
              className="absolute top-[80px] left-[410px] w-[190px]"
            />
            <img
              src="/arrow_down.svg"
              className="absolute left-[660px] w-[190px]"
            />
            {steps.map((step) => (
              <div
                className="flex flex-col p-5 rounded-lg"
                style={{
                  backgroundColor: `${step.featured ? "white" : "none"}`,
                }}
              >
                <div
                  className="mx-auto bg-white p-4 rounded-full"
                  style={{
                    backgroundColor: `${
                      step.featured ? "var(--primary-600)" : "white"
                    }`,
                  }}
                >
                  <img src={step.image_url} className="w-[40px]" />
                </div>
                <Heading
                  name={step.step}
                  className="text-center mt-10"
                  size={17}
                />
                <Text children={step.content} className="text-center" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
