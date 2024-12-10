import {
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { Heading5, Heading6 } from "../headings";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  openFormCategory,
  setDataChange,
  setId,
  setType,
} from "../../features";
import { CustomTooltip } from "../global";
import { useEffect, useState } from "react";
import { DeleteCategoryAPI, FindAllCategoriesAPI } from "../../apis";
import { IconWithBg } from "../icons";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toastError, toastSuccess } from "../toast";
import CustomAlertDialog from "../global/AlertDialog";

export default function DashboardCategory() {
  const id = useSelector((state: any) => state.openForm.id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDataChange = useSelector(
    (state: any) => state.changeData.isDataChange
  );
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<Array<any>>([]);

  async function findAllCategories() {
    const data = await FindAllCategoriesAPI({});
    if (data.isSuccess) {
      setCategories(data.metadata.categories);
    }
  }

  async function deleteCategoryById(id: string) {
    const data = await DeleteCategoryAPI(id);
    if (data.isSuccess) {
      toastSuccess(data.message);
    } else {
      toastError(data.message);
    }
  }

  useEffect(() => {
    console.log(isDataChange);
    findAllCategories();
  }, [isDataChange]);
  return (
    <>
      <div className="flex justify-between">
        <Heading5 name="Categories" />
        <CustomTooltip label="Create category">
          <IconButton
            aria-label="Create category"
            icon={<GoPlus size={30} />}
            borderRadius={"100%"}
            color={"var(--gray-200)"}
            background={"none"}
            border={"1px"}
            _hover={{
              color: "var(--primary-500)",
            }}
            onClick={() => {
              dispatch(openFormCategory());
              dispatch(setType("create"));
            }}
          />
        </CustomTooltip>
      </div>
      <div className="mt-6 space-y-1">
        <TableContainer>
          <Table variant="simple">
            <Thead color={"var(--gray-500)"}>
              <Tr>
                <Th w={"40%"}>CATEGORY</Th>
                <Th w={"20%"}>IMAGE</Th>
                <Th w={"20%"}>OPEN POSITIONS</Th>
                <Th w={"20%"}> ACTIONS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {categories.map((category) => (
                <Tr>
                  <Td>
                    <div className="flex items-center gap-3">
                      <IconWithBg
                        divSize={40}
                        imgSize={20}
                        src={category.iconUrl}
                        backgroundColor={"var(--primary-50)"}
                      />
                      <Heading6
                        name={category.name}
                        className="hover:text-[--primary-500] hover:underline cursor-pointer"
                      />
                    </div>
                  </Td>
                  <Td>
                    <img src={category.imageUrl} width={"80px"} />
                  </Td>
                  <Td>{category.openPositionNum}</Td>
                  <Td>
                    <div className="flex items-center gap-3">
                      <IconButton
                        icon={<CiEdit color="var(--primary-500)" size={20} />}
                        aria-label="edit"
                        _hover={{
                          bg: "var(--primary-50)",
                        }}
                        bg={"var(--primary-50)"}
                        onClick={() => {
                          dispatch(openFormCategory());
                          dispatch(setType("update"));
                          dispatch(setId(category._id));
                        }}
                      />
                      <IconButton
                        icon={<RiDeleteBin6Line color="var(--danger-500)" />}
                        aria-label="delete"
                        _hover={{
                          bg: "var(--danger-50)",
                        }}
                        bg={"var(--danger-50)"}
                        onClick={() => {
                          onOpen();
                          dispatch(setId(category._id));
                        }}
                      />
                    </div>
                  </Td>
                </Tr>
              ))}
              <CustomAlertDialog
                isOpen={isOpen}
                onClose={onClose}
                header="Delete Category"
                onDelete={() => {
                  async function __() {
                    await deleteCategoryById(id);
                    dispatch(setDataChange());
                  }
                  __();
                }}
              />
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
