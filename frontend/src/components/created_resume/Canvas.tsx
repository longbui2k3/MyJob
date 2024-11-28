import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import { renderers } from "./Fields";
import LayoutCV from "./LayoutCV";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setSelectedElement } from "../../features";

function getRenderer(type) {
  if (type === "spacer") {
    return () => {
      return (
        <div
          id="space"
          className="spacer bg-[black] w-[full] h-full opacity-20"
        ></div>
      );
    };
  }

  return renderers[type]
    ? () => {
        const dispatch = useDispatch();
        const divRef = useRef<any>(null);
        return (
          <div
            ref={divRef}
            onClick={(e: any) => {
              if (!divRef) return;
              const selectedElement = divRef.current.childNodes[0];
              if (selectedElement) {
                if (selectedElement?.id !== "space") {
                  dispatch(setSelectedElement(selectedElement));
                } else {
                  dispatch(setSelectedElement(null));
                }
              } else {
                dispatch(setSelectedElement(null));
              }
            }}
          >
            {renderers[type]}
          </div>
        );
      }
    : () => <div>No renderer found for {type}</div>;
}

export function Field(props) {
  const { field, overlay, ...rest } = props;
  const { type } = field;

  const Component = getRenderer(type);

  let className = "canvas-field";
  if (overlay) {
    className += " overlay";
  }

  return (
    <div className={className}>
      <Component {...rest} />
    </div>
  );
}

function SortableField(props) {
  const { id, index, field } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: {
        index,
        id,
        field,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Field field={field} />
    </div>
  );
}

export default function Canvas(props) {
  const { fields } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useDroppable({
      id: "canvas_droppable",
      data: {
        parent: null,
        isContainer: true,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className="canvas flex-[1] border-[1px] border-[--gray-100] bg-[--gray-100] p-[10px] flex flex-col w-full h-full overflow-auto"
      style={{ ...style }}
      {...attributes}
      {...listeners}
    >
      <div className="canvas-fields flex flex-col h-full bg-white">
        <LayoutCV
          items={fields?.map((f, i) => (
            <SortableField key={f.id} id={f.id} field={f} index={i} />
          ))}
        />
      </div>
    </div>
  );
}
