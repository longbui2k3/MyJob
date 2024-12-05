import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import { renderers } from "./Fields";
import LayoutCV from "./LayoutCV";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSelectedElement } from "../../features";
import WrapperPopUp from "./WrapperPopUp";

function getRenderer(type) {
  if (type === "spacer") {
    return () => {
      return (
        <div
          id="space"
          className="spacer bg-[--gray-200] w-[full] h-full"
        ></div>
      );
    };
  }

  return renderers[type]
    ? React.forwardRef(({ attributes, listeners }, ref: any) => {
        const dispatch = useDispatch();
        const divRef = useRef<any>(null);
        const wrapperRef = useRef<any>(null);
        useEffect(() => {
          function handleClickOutside(event: any) {
            const properties = document.getElementById("properties");
            if (properties && properties.contains(event.target)) {
              return;
            }
            if (divRef.current && !divRef.current.contains(event.target)) {
              dispatch(setSelectedElement(null));
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, []);
        return (
          <div className="relative" ref={ref}>
            <WrapperPopUp
              ref={wrapperRef}
              attributes={attributes}
              listeners={listeners}
              type={type}
            ></WrapperPopUp>
            <div
              ref={divRef}
              onClick={(e: any) => {
                if (!divRef) {
                  return;
                }
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
              onMouseOver={(e) => {
                if (!wrapperRef.current) return;
                wrapperRef.current.style.display = "block";
              }}
              onMouseLeave={(e) => {
                if (!wrapperRef.current) return;
                if (wrapperRef.current.childNodes[0].matches(":hover")) return;
                wrapperRef.current.style.display = "none";
              }}
              className="h-full cursor-pointer"
            >
              {renderers[type]}
            </div>
          </div>
        );
      })
    : () => <div>No renderer found for {type}</div>;
}

export const Field = React.forwardRef((props: any, ref) => {
  const { field, overlay, ...rest } = props;
  const { type } = field;

  const Component = getRenderer(type);

  let className = "canvas-field";
  if (overlay) {
    className += " overlay";
  }

  return (
    <div className={className} style={{ height: "100%" }}>
      <Component {...rest} ref={ref} />
    </div>
  );
});

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
    height: "100%",
  };

  return (
    <div style={style}>
      <Field
        ref={setNodeRef}
        field={field}
        attributes={attributes}
        listeners={listeners}
      />
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
      className="canvas flex-[1] border-[1px] border-[--gray-100] bg-[--gray-100] py-[25px] px-[20px]  flex flex-col w-fit h-fit overflow-auto"
      style={{ ...style }}
      {...attributes}
      {...listeners}
    >
      <div
        id="cvPdf"
        className="canvas-fields flex flex-col w-[840px] h-[full] bg-white"
      >
        <LayoutCV
          items={fields?.map((f, i) => (
            <SortableField key={f.id} id={f.id} field={f} index={i} />
          ))}
        />
      </div>
    </div>
  );
}
