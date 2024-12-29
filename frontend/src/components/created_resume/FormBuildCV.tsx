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
  Sidebar,
  SidebarField,
} from "../../components/created_resume";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@chakra-ui/react";
import { ButtonSolid } from "../../components/buttons";
import { IoSaveOutline } from "react-icons/io5";
import {
  CreateCreatedResumeAPI,
  FindProfileByUserAPI,
  FindResumeByIdAPI,
  UpdateCreatedResumeAPI,
} from "../../apis";
import { toastError, toastSuccess } from "../../components/toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  setDataChange,
  setDeletedFields,
  setDeleteType,
  setFields,
  setState,
} from "../../features";
import Properties from "./Properties";
import { ButtonPrint } from "./Components";
import { getRoute, MY_CV_KEY } from "../../helpers/constants";
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
  const navigate = useNavigate();
  const { id } = useParams();
  const fieldsState = useSelector((state) => state.createCV.fields);
  const deletedFieldsState = useSelector(
    (state) => state.createCV.deletedFields
  );
  const deleteType = useSelector((state) => state.createCV.deleteType);
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
    console.log(active, over);
    // We dropped outside of the over so clean up so we can start fresh.
    // if (!over) {
    //   cleanUp();
    //   // updateData((draft) => {
    //   //   draft.fields = draft.fields.filter((f) => f.type !== "spacer");
    //   // });
    //   return;
    // }

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
        const filterState = fieldsState.find(
          (field) => field.type === nextField.type
        );
        dispatch(
          setFields(
            fieldsState.filter((field) => field.type !== nextField.type)
          )
        );
        if (filterState)
          dispatch(setDeletedFields([...deletedFieldsState, filterState]));
        if (activeData.index !== undefined && overData.index !== undefined)
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
  useEffect(() => {
    updateData((draft: any) => {
      draft.fields = [
        {
          id: "e0TugEJOM_xOQvhUTjjx1",
          type: "business_card",
          name: "business_card1",
          parent: null,
        },
        {
          id: "WkvTP1xoCEXYcINmoDivT",
          type: "personal_information",
          name: "personal_information2",
          parent: null,
        },
        {
          id: "aPXwGSAC8Ip73N1T8G3y7",
          type: "objective",
          name: "objective3",
          parent: null,
        },
        {
          id: "AD4_roVkwfnp43pSVJOjA",
          type: "work_experience",
          name: "work_experience4",
          parent: null,
        },
        {
          id: "VjGo95AA5hZALSigTP-If",
          type: "projects",
          name: "projects5",
          parent: null,
        },
        {
          id: "NgkEp3JbgjLOvb4g27q7B",
          type: "education",
          name: "education6",
          parent: null,
        },
        {
          id: "0_AmN01k9KHz53CGbr_2D",
          type: "skills",
          name: "skills7",
          parent: null,
        },
        {
          id: "fPseX59YIxHBsg7WV9SoO",
          type: "awards",
          name: "awards8",
          parent: null,
        },
        {
          id: "aIFTsivp12w4qqO_JZOXk",
          type: "certifications",
          name: "certifications9",
          parent: null,
        },
        {
          id: "vY_MW0GZ8Isl5gYbc-fpi",
          type: "referrers",
          name: "referrers10",
          parent: null,
        },
        {
          id: "PFp4inBe5QuuxC5f-pejG",
          type: "activities",
          name: "activities11",
          parent: null,
        },
        {
          id: "bSfIa_R_j_M7awwQzmFDo",
          type: "interests",
          name: "interests12",
          parent: null,
        },
        {
          id: "1V2PJ7boBb0rRcaP-zBqO",
          type: "additionalInformation",
          name: "additionalInformation13",
          parent: null,
        },
      ];
      const otherFields = [];
      const deletedFields = [];
      for (let f of fieldsState) {
        const field = draft.fields.find((t) => t.type === f.type);
        if (field) {
          deletedFields.push(f);
        } else {
          otherFields.push(f);
        }
      }
      dispatch(setFields(otherFields));
      dispatch(setDeletedFields(deletedFields));
    });
  }, []);
  console.log("Fields", fields);
  console.log("Deleted fields", deletedFieldsState);

  useEffect(() => {
    if (deleteType) {
      updateData((draft) => {
        draft.fields = draft.fields.filter(
          (field) => field.type !== deleteType
        );
        const deletedField = deletedFieldsState.find(
          (field) => field.type === deleteType
        );
        const fields = Object.assign([], fieldsState);
        fields.splice(deletedField.id, 0, deletedField);

        dispatch(setFields(fields));
        dispatch(
          setDeletedFields(
            deletedFieldsState.filter(
              (field) => field.type !== deletedField.type
            )
          )
        );
        dispatch(setDeleteType(undefined));
      });
    }
  }, [deleteType]);

  async function getProfile() {
    if (type !== "create") return;
    const data = await FindProfileByUserAPI();
    console.log("Profile", data);
    if (data.isSuccess) {
      const profile = data.metadata.profile;
      dispatch(
        setState({
          key: "fullName",
          value: profile.fullName,
        })
      );
      dispatch(
        setState({
          key: "position",
          value: profile.title,
        })
      );
      dispatch(
        setState({
          key: "email",
          value: profile.email,
        })
      );
      dispatch(
        setState({
          key: "phone",
          value: profile.mobile,
        })
      );
      dispatch(
        setState({
          key: "location",
          value: profile.mapLocation,
        })
      );
    }
  }

  const state = useSelector((state: any) => state.createCV.state);
  useEffect(() => {
    getProfile();
  }, []);
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
      navigate(getRoute(MY_CV_KEY).path);
      dispatch(setDataChange());
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
      dispatch(setDataChange());
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
      dispatch(setState({ key: "", value: data.metadata.resume.resume }));
      updateData((draft: any) => {
        const template = data.metadata.resume.resume.template;
        draft.fields = template;
        const otherFields = [];
        const deletedFields = [];
        for (let f of fieldsState) {
          const field = template.find((t) => t.type === f.type);
          if (field) {
            deletedFields.push(f);
          } else {
            otherFields.push(f);
          }
        }
        dispatch(setFields(otherFields));
        dispatch(setDeletedFields(deletedFields));
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
      <div className="z-[1] h-[60px] w-full border-[1px] border-[--gray-100] flex justify-between px-[20px] py-[10px]">
        <Input
          placeholder="Your CV name"
          width="350px"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <div className="flex items-center gap-3">
          <ButtonSolid
            leftIcon={<IoSaveOutline size={18} />}
            children={type === "create" ? "Create" : "Save"}
            width="100px"
            onClick={(e) => {
              e.preventDefault();
              if (type === "create") {
                createCreatedResume();
              } else if (type === "update") {
                updateCreatedResume();
              }
            }}
            height="40px"
          />
          <ButtonPrint
            id={"cvPdf"}
            label={`${type === "create" ? "Create" : "Save"} and Download`}
            name={name}
            onClick={() => {
              if (type === "create") {
                createCreatedResume();
              } else if (type === "update") {
                updateCreatedResume();
              }
            }}
          />
        </div>
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
            height: "calc(100vh - 190px)",
          }}
        >
          <Panel
            defaultSize={15}
            maxSize={15}
            minSize={15}
            className="border-[1px] border-[--gray-100]"
            style={{
              overflow: "auto",
            }}
          >
            <Sidebar fieldsRegKey={sidebarFieldsRegenKey} />
          </Panel>
          <PanelResizeHandle />
          <Panel
            defaultSize={59}
            className="border-[1px] border-[--gray-100]"
            style={{
              overflow: "auto",
            }}
          >
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
            defaultSize={26}
            maxSize={26}
            minSize={26}
            className="border-[1px] border-[--gray-100]"
            style={{
              overflow: "auto",
            }}
            id="properties"
          >
            <Properties />
          </Panel>
        </PanelGroup>
      </DndContext>
    </>
  );
}
