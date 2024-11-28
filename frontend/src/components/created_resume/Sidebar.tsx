import { useDraggable } from "@dnd-kit/core";
import { nanoid } from "nanoid";
import { useRef } from "react";
import { fields } from "./Fields";
import { CiText } from "react-icons/ci";

export function SidebarField(props) {
  const { field, overlay } = props;
  const { title } = field;

  let className = "sidebar-field";
  if (overlay) {
    className += " overlay";
  }

  return (
    <div
      className={`${className} flex flex-col items-center justify-center p-[10px] h-[200px]`}
    >
      <CiText size={30} />
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
      className="sidebar-field flex items-center justify-center h-[100px] w-[full] border-[1px] border-[--gray-100] cursor-pointer"
      {...listeners}
      {...attributes}
    >
      <SidebarField field={field} {...rest} />
    </div>
  );
}

export default function Sidebar(props) {
  const { fieldsRegKey } = props;

  return (
    <div
      key={fieldsRegKey}
      className="sidebar grid grid-cols-3 gap-2 p-[20px] h-full"
    >
      {fields.map((f) => (
        <DraggableSidebarField key={f.type} field={f} />
      ))}
    </div>
  );
}
