interface ComponentProps {
  children?: JSX.Element | string;
}
function Component({ children = <></> }: ComponentProps) {
  return (
    <div className="w-full h-full border-[1px] border-[--gray-100] p-[10px] min-h-[100px]">
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
      <Component>{items[2] ? items[2] : <></>}</Component>
      <Component>{items[3] ? items[3] : <></>}</Component>
      <Component>{items[4] ? items[4] : <></>}</Component>
      <div className="flex h-full">
        <Component>{items[5] ? items[5] : <></>}</Component>
        <Component>{items[6] ? items[6] : <></>}</Component>
        <Component>{items[7] ? items[7] : <></>}</Component>
      </div>
      <div className="flex h-full">
        <Component>{items[8] ? items[8] : <></>}</Component>
        <Component>{items[9] ? items[9] : <></>}</Component>
        <Component>{items[10] ? items[10] : <></>}</Component>
      </div>
      <div className="flex h-full">
        <Component>{items[11] ? items[11] : <></>}</Component>
        <Component>{items[12] ? items[12] : <></>}</Component>
        <Component>{items[13] ? items[13] : <></>}</Component>
      </div>
    </>
  );
}
