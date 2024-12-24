import { HiMiniXMark } from "react-icons/hi2";
import useOpenConversation from "../../zustand/useOpenConversation";
import { useEffect, useState } from "react";
import useConversations from "../../zustand/useConversations";
import {
  CreateConversationAPI,
  FindCompaniesAPI,
  FindUsersAPI,
} from "../../apis";
import { Avatar, CircularProgress } from "@chakra-ui/react";
import { useAuthContext } from "../../context";
import { UserTypes } from "../../helpers/constants";

export default function FormCreateConversation() {
  const { user: userAuth } = useAuthContext();
  const { setIsOpenConversation } = useOpenConversation();
  const { conversations, setConversations } = useConversations();
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<Array<any>>([]);
  const [companies, setCompanies] = useState<Array<any>>([]);
  const [infor, setInfor] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<Array<any>>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!userAuth || typeof userAuth === "string") return;
    if (userAuth.userType === UserTypes.EMPLOYER)
      (async () => {
        const data = await FindUsersAPI({
          search,
          userType: UserTypes.EMPLOYEE,
          allow_empty: true,
        });
        if (data.isSuccess) {
          setUsers(data.metadata.users);
          setInfor(null);
        } else {
          setUsers([]);
          setInfor(data.message);
        }
      })();
    else if (userAuth.userType === UserTypes.EMPLOYEE) {
      (async () => {
        const data = await FindCompaniesAPI({
          search,
          allow_empty: true,
        });
        if (data.isSuccess) {
          setCompanies(data.metadata.companies);
          setInfor(null);
        } else {
          setCompanies([]);
          setInfor(data.message);
        }
      })();
    }
  }, [search]);

  async function handleSubmit(e) {
    if (!userAuth || typeof userAuth === "string") return;
    e.preventDefault();
    setIsLoading(true);
    const participants: { [key: string]: string[] } = {
      employer: selectedUsers.map((user) => user._id),
      employee: selectedCompanies.map((company) => company.user._id),
    };
    const data = await CreateConversationAPI(participants[userAuth.userType]);
    if (data.isSuccess) {
      setConversations([...conversations, data.metadata.conversation]);
      setIsOpenConversation(false);
      setIsLoading(false);
    }
  }

  const resultSearch: { [key: string]: JSX.Element[] } = {
    employer: users.map((user) => (
      <div
        className={`flex justify-between hover:bg-[rgb(239,239,239)] px-6 py-[6px]`}
      >
        <div className="flex items-center space-x-4">
          <Avatar
            src={user?.profile.avatar}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h4 className="font-medium text-[14px]">
              {user?.profile.fullName}
            </h4>
            <p className="mt-[3px] text-gray-500 text-[13px]">
              {user.username}
            </p>
          </div>
        </div>
        <input
          id={`${user._id}`}
          checked={Boolean(
            selectedUsers.find((selectedUser) => selectedUser._id === user._id)
          )}
          type="checkbox"
          className="w-6 h-6 my-auto"
          name={user._id}
          value={user._id}
          onChange={(e) => {
            if (e.target.checked) setSelectedUsers([...selectedUsers, user]);
            else {
              let ind = -1;
              for (let i = 0; i < selectedUsers.length; i++) {
                if (selectedUsers[i]._id === user._id) {
                  ind = i;
                  break;
                }
              }
              setSelectedUsers([
                ...selectedUsers.slice(0, ind),
                ...selectedUsers.slice(ind + 1),
              ]);
            }
            setSearch("");
          }}
        />
        <label htmlFor={`${user._id}`} className="hidden"></label>
      </div>
    )),
    employee: companies.map((company) => (
      <div
        className={`flex justify-between hover:bg-[rgb(239,239,239)] px-6 py-[6px]`}
      >
        <div className="flex items-center space-x-4">
          <Avatar src={company.logo} className="w-12 h-12 rounded-full" />
          <div>
            <h4 className="font-medium text-[14px]">{company.companyName}</h4>
            <p className="mt-[3px] text-gray-500 text-[13px]">
              {company?.user?.profile?.fullName}
            </p>
          </div>
        </div>
        <input
          id={`${company._id}`}
          checked={Boolean(
            selectedCompanies.find(
              (selectedCompany) => selectedCompany._id === company._id
            )
          )}
          type="checkbox"
          className="w-6 h-6 my-auto"
          name={company._id}
          value={company._id}
          onChange={(e) => {
            if (e.target.checked)
              setSelectedCompanies([...selectedCompanies, company]);
            else {
              let ind = -1;
              for (let i = 0; i < selectedCompanies.length; i++) {
                if (selectedCompanies[i]._id === company._id) {
                  ind = i;
                  break;
                }
              }
              setSelectedCompanies([
                ...selectedCompanies.slice(0, ind),
                ...selectedCompanies.slice(ind + 1),
              ]);
            }
            setSearch("");
          }}
        />
        <label htmlFor={`${company._id}`} className="hidden"></label>
      </div>
    )),
  };

  const selectedResult: { [key: string]: JSX.Element[] } = {
    employer: selectedUsers.map((selectedUser) => (
      <div className="flex justify-center bg-[#e0f1ff] rounded-md mx-1 mb-1 px-2 py-[1px] border-[1px] border-[--primary-500] text-[--primary-500]">
        <div className="me-1 my-auto font-[600]">
          {selectedUser.profile.fullName}
        </div>
        <HiMiniXMark
          className="my-auto fill-[--primary-500] text-[22px]"
          onClick={function () {
            setSelectedUsers(
              selectedUsers.filter((user) => user._id !== selectedUser._id)
            );
          }}
        />
      </div>
    )),
    employee: selectedCompanies.map((selectedCompany) => (
      <div className="flex justify-center bg-[#e0f1ff] rounded-md mx-1 mb-1 px-2 py-[1px] border-[1px] border-[--primary-500] text-[--primary-500]">
        <div className="me-1 my-auto font-[600]">
          {selectedCompany.companyName}
        </div>
        <HiMiniXMark
          className="my-auto fill-[--primary-500] text-[22px]"
          onClick={function () {
            setSelectedCompanies(
              selectedCompanies.filter(
                (company) => company._id !== selectedCompany._id
              )
            );
          }}
        />
      </div>
    )),
  };
  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 backdrop-brightness-[0.7] w-full h-full z-[1000] flex flex-col justify-center">
        <form className="relative flex flex-col mx-auto w-[550px] h-[450px] bg-[white] rounded-2xl">
          <HiMiniXMark
            className="absolute right-5 top-[16px] text-[25px]"
            onClick={function () {
              setIsOpenConversation(false);
            }}
          />
          <div className="text-center text-black border-b-[1px] border-gray-200 py-4 font-[600]">
            New message
          </div>
          <div className="flex flex-wrap px-4 py-2 border-b-[1px] border-gray-200">
            <span className="my-auto me-1">To:</span>
            {userAuth && typeof userAuth !== "string"
              ? selectedResult[userAuth.userType]
              : ""}

            <input
              type="text"
              placeholder="Search..."
              className="ms-[16px] outline-none flex-grow"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex-grow w-full h-[250px] overflow-y-scroll">
            <div className="px-4 py-2 text-[14px]">{infor ? infor : ""}</div>
            <div>
              {userAuth && typeof userAuth !== "string"
                ? resultSearch[userAuth.userType]
                : ""}
            </div>
          </div>
          <div className="px-4 py-4">
            <button
              className={`px-3 py-3 bg-[--primary-500] text-white font-medium transition duration-200 text-[14px] rounded-md w-full ${
                selectedUsers.length !== 0 || selectedCompanies.length !== 0
                  ? ""
                  : "opacity-50"
              }`}
              onClick={handleSubmit}
              disabled={
                !(selectedUsers.length !== 0 || selectedCompanies.length !== 0)
              }
            >
              {isLoading ? (
                <CircularProgress
                  isIndeterminate
                  color="var(--primary-500)"
                  size="20px"
                />
              ) : (
                "Chat"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
