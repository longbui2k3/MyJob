import {
  Avatar,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { Heading5, Heading6 } from "../headings";
import { useEffect, useState } from "react";
import { ActiveUserAPI, FindUsersAPI, InactiveUserAPI } from "../../apis";
import { FaUserCircle } from "react-icons/fa";
import { changeDateToString } from "../../utils";
import { MdBlock, MdOutlineCheck } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toastSuccess } from "../toast";
import { setDataChange, setId } from "../../features";
import CustomAlertDialog from "../global/AlertDialog";
import { UserStatuses, UserTypes } from "../../helpers/constants";
import { NotFoundList, Pagination, usePagination } from "../global";
import { UserTypeSelect, useUserTypeSelect } from "../select/UserTypeSelect";
import {
  UserStatusSelect,
  useUserStatusSelect,
} from "../select/UserRoleSelect";
import { SearchUserInput, useSearchCategoryInput } from "../inputs";

export default function DashboardUsers() {
  const id = useSelector((state: any) => state.openForm.id);
  const isDataChange = useSelector(
    (state: any) => state.changeData.isDataChange
  );
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState<Array<any>>([]);
  const { curPage, setCurPage } = usePagination();
  const [size, setSize] = useState(1);
  const { userType, setUserType } = useUserTypeSelect();
  const { userStatus, setUserStatus } = useUserStatusSelect();
  const { search, setSearch } = useSearchCategoryInput();
  async function getUsers() {
    const limit = 8;
    const data = await FindUsersAPI({
      limit,
      page: curPage,
      userType,
      status: userStatus,
      search: search || undefined,
    });
    if (data.isSuccess) {
      setUsers(data.metadata.users);
      setSize(data.metadata.meta.size);
    }
  }

  async function inactiveUser(userId: string) {
    const data = await InactiveUserAPI(userId);
    if (data.isSuccess) {
      toastSuccess(data.message);
    }
  }

  async function activeUser(userId: string) {
    const data = await ActiveUserAPI(userId);
    if (data.isSuccess) {
      toastSuccess(data.message);
    }
  }

  useEffect(() => {
    setCurPage(1);
    getUsers();
  }, [userType, userStatus, search]);

  useEffect(() => {
    getUsers();
  }, [isDataChange, curPage]);

  const userTypes: { [key: string]: any } = {
    employee: (
      <Tag
        bg="var(--primary-50)"
        textColor={"var(--primary-500)"}
        fontSize={"13px"}
        paddingX={"8px"}
        paddingY="4px"
        marginY="auto"
      >
        {"Employee"}
      </Tag>
    ),
    employer: (
      <Tag
        bg="var(--success-50)"
        textColor={"var(--success-500)"}
        fontSize={"13px"}
        paddingX={"8px"}
        paddingY="4px"
        marginY="auto"
      >
        {"Employer"}
      </Tag>
    ),
    admin: (
      <Tag
        bg="var(--danger-50)"
        textColor={"var(--danger-500)"}
        fontSize={"13px"}
        paddingX={"8px"}
        paddingY="4px"
        marginY="auto"
      >
        {"Admin"}
      </Tag>
    ),
  };

  const statuses: { [key: string]: any } = {
    unverified: (
      <Tag
        bg="var(--warning-50)"
        textColor={"var(--warning-500)"}
        fontSize={"13px"}
        paddingX={"8px"}
        paddingY="4px"
        marginY="auto"
      >
        {"Unverified"}
      </Tag>
    ),
    active: (
      <Tag
        bg="var(--success-50)"
        textColor={"var(--success-500)"}
        fontSize={"13px"}
        paddingX={"8px"}
        paddingY="4px"
        marginY="auto"
      >
        {"Active"}
      </Tag>
    ),
    inactive: (
      <Tag
        bg="var(--danger-50)"
        textColor={"var(--danger-500)"}
        fontSize={"13px"}
        paddingX={"8px"}
        paddingY="4px"
        marginY="auto"
      >
        {"Inactive"}
      </Tag>
    ),
  };

  return (
    <>
      <div className="flex justify-between">
        <Heading5 name="Users" />
        <div className="flex gap-3">
          <SearchUserInput search={search} setSearch={setSearch} />
          <UserTypeSelect
            handleUserTypeChange={setUserType}
            userType={userType}
          />
          <UserStatusSelect
            handleUserStatusChange={setUserStatus}
            userStatus={userStatus}
          />
        </div>
      </div>
      <div className="mt-6 space-y-1">
        {users.length === 0 ? (
          <NotFoundList info="No users matching your requirements have been found yet." />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead color={"var(--gray-500)"}>
                <Tr>
                  <Th w={"30%"}>USER</Th>
                  <Th w={"20%"}>USER TYPE</Th>
                  <Th w={"20%"}>STATUS</Th>
                  <Th w={"20%"}>LAST LOGIN</Th>
                  <Th w={"10%"}>ACTIONS</Th>
                </Tr>
              </Thead>

              <Tbody>
                {users.map((user) => (
                  <Tr>
                    <Td>
                      <div className="flex gap-3 items-center cursor-pointer">
                        {user?.profile?.avatar ? (
                          <Avatar
                            height={"40px"}
                            width={"40px"}
                            src={user?.profile?.avatar}
                          />
                        ) : (
                          <FaUserCircle
                            size="40px"
                            color="var(--default-avatar)"
                          />
                        )}
                        <div>
                          <div className="flex space-x-3 items-center">
                            <Heading6 name={user?.username} />
                          </div>
                          <p className="text-sm">{user?.email}</p>
                        </div>
                      </div>
                    </Td>
                    <Td>{userTypes[user?.userType]}</Td>
                    <Td>{statuses[user?.status]}</Td>
                    <Td>
                      {user?.lastLogin
                        ? changeDateToString(user?.lastLogin)
                        : ""}
                    </Td>
                    <Td>
                      {user?.userType === UserTypes.ADMIN ? (
                        ""
                      ) : [
                          UserStatuses.ACTIVE.toString(),
                          UserStatuses.UNVERIFIED.toString(),
                        ].includes(user?.status) ? (
                        <MdBlock
                          color="var(--danger-500)"
                          size={25}
                          onClick={() => {
                            onOpen();
                            dispatch(setId(user._id));
                          }}
                        />
                      ) : (
                        <MdOutlineCheck
                          color="var(--success-500)"
                          size={25}
                          onClick={() => {
                            async function __() {
                              await activeUser(user._id);
                              dispatch(setDataChange());
                            }
                            __();
                          }}
                        />
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
        <Pagination curPage={curPage} setCurPage={setCurPage} size={size} />
        <CustomAlertDialog
          isOpen={isOpen}
          onClose={onClose}
          header="Inactive User"
          onDelete={() => {
            async function __() {
              await inactiveUser(id);
              dispatch(setDataChange());
            }
            __();
          }}
        />
      </div>
    </>
  );
}
