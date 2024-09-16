export default function Background() {
  const items = [
    {
      name: "Live Job",
      number: "175,324",
    },
    {
      name: "Companies",
      number: "97,354",
    },
    {
      name: "New Jobs",
      number: "7,532",
    },
  ];
  return (
    <div className="relative w-[50%] z-[999]">
      <img src="/background_authen.png" className="w-full h-full" />
      <div className="absolute top-[360px] left-[100px]">
        <div className="w-[560px] text-white text-[40px] font-medium leading-[48px]">
          Over 1,750,324 candidates waiting for good employees
        </div>
        <div className="mt-[50px] flex justify-between">
          {items.map((item) => (
            <div className="flex-col">
              <div className="h-16 p-4 bg-white/10 rounded-lg justify-start items-start gap-2.5 inline-flex">
                <div className="w-8 h-8 relative">
                  <img src="/briefcase_duotone.svg"></img>
                </div>
              </div>
              <div className="w-[180px] text-white text-xl font-medium leading-loose">
                {item.number}
              </div>
              <div className="w-[180px] opacity-70 text-white text-sm font-normal  leading-tight">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
