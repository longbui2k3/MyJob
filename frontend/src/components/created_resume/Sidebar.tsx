import { useDraggable } from "@dnd-kit/core";
import { nanoid } from "nanoid";
import { useRef } from "react";
import { CiText } from "react-icons/ci";
import { useSelector } from "react-redux";

export function SidebarField(props) {
  const { field, overlay } = props;
  const { title } = field;

  let className = "sidebar-field";
  if (overlay) {
    className += " overlay";
  }

  return (
    <div className={`${className} flex items-center gap-3 w-full p-[10px]`}>
      <CiText size={20} />
      <div className="text-center">{title}</div>
    </div>
  );
}

function DraggableSidebarField(props) {
  const { field, ...rest } = props;

  const id = useRef(nanoid());

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id.current,
    data: {
      field,
      fromSidebar: true,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className="sidebar-field flex items-center justify-center h-[40px] border-[1px] border-[--gray-100] cursor-pointer text-[13px] w-full bg-[--primary-500] text-white rounded-md"
      {...listeners}
      {...attributes}
    >
      <SidebarField field={field} {...rest} />
    </div>
  );
}

export default function Sidebar(props) {
  const { fieldsRegKey } = props;
  const fields = useSelector((state) => state.createCV.fields);
  return (
    <div
      key={fieldsRegKey}
      className="sidebar flex flex-col gap-2 p-[20px] h-fit"
    >
      {fields.map((f) => (
        <DraggableSidebarField key={f.type} field={f} />
      ))}
    </div>
  );
}
