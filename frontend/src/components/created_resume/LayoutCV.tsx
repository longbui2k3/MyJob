interface ComponentProps {
  children?: JSX.Element | string;
}
function Component({ children = <></> }: ComponentProps) {
  return (
    <div className="w-full border-[1px] border-[--gray-100] p-[10px] min-h-[120px]">
      {children}
    </div>
  );
}

interface LayoutCVProps {
  items: JSX.Element[];
}

export default function LayoutCV({ items = [] }: LayoutCVProps) {
  return (
    <>
      <div className="flex h-full">
        <Component>{items[0] ? items[0] : <></>}</Component>
        <Component>{items[1] ? items[1] : <></>}</Component>
      </div>
      <div className="flex h-full">
        <Component>{items[2] ? items[2] : <></>}</Component>
      </div>
      <div className="flex h-full">
        <Component>{items[3] ? items[3] : <></>}</Component>
      </div>
      <div className="flex h-full">
        <Component>{items[4] ? items[4] : <></>}</Component>
      </div>
      <div className="flex h-full">
        <Component>{items[5] ? items[5] : <></>}</Component>
        <Component>{items[6] ? items[6] : <></>}</Component>
      </div>
      <div className="flex h-full">
        <Component>{items[7] ? items[7] : <></>}</Component>
        <Component>{items[8] ? items[8] : <></>}</Component>
        <Component>{items[9] ? items[9] : <></>}</Component>
      </div>
      <div className="flex h-full">
        <Component>{items[10] ? items[10] : <></>}</Component>
        <Component>{items[11] ? items[11] : <></>}</Component>
        <Component>{items[12] ? items[12] : <></>}</Component>
      </div>
    </>
  );
}
