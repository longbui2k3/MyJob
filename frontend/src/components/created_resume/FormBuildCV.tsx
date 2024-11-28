import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useImmer } from "use-immer";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import {
  Canvas,
  Field,
  Properties,
  Sidebar,
  SidebarField,
} from "../../components/created_resume";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@chakra-ui/react";
import { ButtonSolid } from "../../components/buttons";
import { IoSaveOutline } from "react-icons/io5";
import {
  CreateCreatedResumeAPI,
  FindResumeByIdAPI,
  UpdateCreatedResumeAPI,
} from "../../apis";
import { toastError, toastSuccess } from "../../components/toast";
import { useParams } from "react-router-dom";
import { setState } from "../../features";
function getData(prop: any) {
  return prop?.data?.current ?? {};
}

function createSpacer({ id }: { id: any }) {
  return {
    id,
    type: "spacer",
    title: "spacer",
  };
}

interface FormBuildCVProps {
  type?: string;
}

export default function FormBuildCV({ type = "create" }: FormBuildCVProps) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState(
    Date.now()
  );
  const spacerInsertedRef = useRef<any>();
  const currentDragFieldRef = useRef<any>();
  const [activeSidebarField, setActiveSidebarField] = useState<any>(); // only for fields from the sidebar
  const [activeField, setActiveField] = useState<any>(); // only for fields that are in the form.
  const [data, updateData] = useImmer<any>({
    fields: [],
  });

  const cleanUp = () => {
    setActiveSidebarField(null);
    setActiveField(null);
    currentDragFieldRef.current = null;
    spacerInsertedRef.current = false;
  };

  const handleDragStart = (e) => {
    const { active } = e;
    const activeData = getData(active);

    // This is where the cloning starts.
    // We set up a ref to the field we're dragging
    // from the sidebar so that we can finish the clone
    // in the onDragEnd handler.
    if (activeData.fromSidebar) {
      const { field } = activeData;
      const { type } = field;
      setActiveSidebarField(field);
      // Create a new field that'll be added to the fields array
      // if we drag it over the canvas.
      currentDragFieldRef.current = {
        id: active.id,
        type,
        name: `${type}${fields.length + 1}`,
        parent: null,
      };
      return;
    }

    // We aren't creating a new element so go ahead and just insert the spacer
    // since this field already belongs to the canvas.
    const { field, index } = activeData;

    setActiveField(field);
    currentDragFieldRef.current = field;
    updateData((draft) => {
      draft.fields.splice(index, 1, createSpacer({ id: active.id }));
    });

    return false;
  };

  const handleDragOver = (e) => {
    const { active, over } = e;
    const activeData = getData(active);

    // Once we detect that a sidebar field is being moved over the canvas
    // we create the spacer using the sidebar fields id with a spacer suffix and add into the
    // fields array so that it'll be rendered on the canvas.

    // 🐑 CLONING 🐑
    // This is where the clone occurs. We're taking the id that was assigned to
    // sidebar field and reusing it for the spacer that we insert to the canvas.
    if (activeData.fromSidebar) {
      const overData = getData(over);

      if (!spacerInsertedRef.current) {
        const spacer = createSpacer({
          id: active.id + "-spacer",
        });

        updateData((draft) => {
          if (!draft.fields.length) {
            draft.fields.push(spacer);
          } else {
            const nextIndex =
              overData.index > -1 ? overData.index : draft.fields.length;

            draft.fields.splice(nextIndex, 0, spacer);
          }
          spacerInsertedRef.current = true;
        });
      } else if (!over) {
        // This solves the issue where you could have a spacer handing out in the canvas if you drug
        // a sidebar item on and then off
        updateData((draft) => {
          draft.fields = draft.fields.filter((f) => f.type !== "spacer");
        });
        spacerInsertedRef.current = false;
      } else {
        // Since we're still technically dragging the sidebar draggable and not one of the sortable draggables
        // we need to make sure we're updating the spacer position to reflect where our drop will occur.
        // We find the spacer and then swap it with the over skipping the op if the two indexes are the same
        updateData((draft) => {
          const spacerIndex = draft.fields.findIndex(
            (f) => f.id === active.id + "-spacer"
          );

          const nextIndex =
            overData.index > -1 ? overData.index : draft.fields.length - 1;

          if (nextIndex === spacerIndex) {
            return;
          }

          draft.fields = arrayMove(draft.fields, spacerIndex, overData.index);
        });
      }
    }
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;

    // We dropped outside of the over so clean up so we can start fresh.
    if (!over) {
      cleanUp();
      updateData((draft) => {
        draft.fields = draft.fields.filter((f) => f.type !== "spacer");
      });
      return;
    }

    // This is where we commit the clone.
    // We take the field from the this ref and replace the spacer we inserted.
    // Since the ref just holds a reference to a field that the context is aware of
    // we just swap out the spacer with the referenced field.
    let nextField = currentDragFieldRef.current;

    if (nextField) {
      const overData = getData(over);
      const activeData = getData(active);
      updateData((draft) => {
        const spacerIndex = draft.fields.findIndex((f) => f.type === "spacer");
        draft.fields.splice(spacerIndex, 1, nextField);

        draft.fields = arrayMove(
          draft.fields,
          activeData.index || 0,
          overData.index || 0
        );
      });
    }

    setSidebarFieldsRegenKey(Date.now());
    cleanUp();
  };

  const handleDragCancel = useCallback(() => {
    setActiveField(null);
  }, []);

  const { fields } = data;
  // useEffect(() => {
  //   updateData((draft: any) => {
  //     draft.fields = [];
  //   });
  // }, []);
  console.log("Fields", fields);

  const state = useSelector((state: any) => state.createCV.state);
  useEffect(() => {
    console.log("State data", state);
  }, [state]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const [name, setName] = useState<string>("");
  async function createCreatedResume() {
    const data = await CreateCreatedResumeAPI({
      name,
      ...state,
      template: fields,
    });
    if (data.isSuccess) {
      toastSuccess(data.message);
    } else {
      toastError(data.message);
    }
  }

  async function updateCreatedResume() {
    if (!id) return;
    const data = await UpdateCreatedResumeAPI(id, {
      name,
      ...state,
      template: fields,
    });
    if (data.isSuccess) {
      toastSuccess(data.message);
    } else {
      toastError(data.message);
    }
  }

  const [resume, setResume] = useState<any>();
  async function findResumeById(id: string) {
    const data = await FindResumeByIdAPI(id);
    if (data.isSuccess) {
      console.log(data);
      setResume(data.metadata.resume);
      setName(data.metadata.resume.name);
      dispatch(setState(data.metadata.resume.resume));
      updateData((draft: any) => {
        const template = data.metadata.resume.resume.template;
        draft.fields = template;
      });
    }
  }

  useEffect(() => {
    if (!id) return;
    if (type === "update") {
      findResumeById(id);
    }
  }, [id]);

  return (
    <>
      {/* <BreadcrumbHeader breadcrumbRoutes={getBreadcrumb(CREATE_CV_KEY)} /> */}
      <div className="h-[60px] w-full border-[1px] border-[--gray-100] flex justify-between px-[20px] py-[10px]">
        <Input
          placeholder="Your CV name"
          width="350px"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <ButtonSolid
          leftIcon={<IoSaveOutline size={18} />}
          children={"Save"}
          width="100px"
          onClick={(e) => {
            e.preventDefault();
            if (type === "create") {
              createCreatedResume();
            } else if (type === "update") {
              updateCreatedResume();
            }
          }}
        />
      </div>
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        sensors={sensors}
        autoScroll
      >
        <PanelGroup
          direction="horizontal"
          style={{
            height: "100%",
            flexGrow: "1",
          }}
        >
          <Panel
            defaultSize={25}
            maxSize={30}
            minSize={15}
            className="border-[1px] border-[--gray-100]"
          >
            <Sidebar fieldsRegKey={sidebarFieldsRegenKey} />
          </Panel>
          <PanelResizeHandle />
          <Panel defaultSize={50} className="border-[1px] border-[--gray-100]">
            <SortableContext
              strategy={rectSortingStrategy}
              items={fields.map((f) => f.id)}
            >
              <Canvas fields={fields} />
            </SortableContext>
            <DragOverlay dropAnimation={null}>
              {activeSidebarField ? (
                <SidebarField overlay field={activeSidebarField} />
              ) : null}
              {activeField ? <Field field={activeField} /> : null}
            </DragOverlay>
          </Panel>
          <PanelResizeHandle />
          <Panel
            defaultSize={25}
            maxSize={30}
            minSize={15}
            className="border-[1px] border-[--gray-100]"
          >
            <Properties />
          </Panel>
        </PanelGroup>
      </DndContext>
    </>
  );
}
