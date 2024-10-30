import { useEffect, useState } from "react";

interface PaginationProps {
  curPage?: number;
  setCurPage: React.Dispatch<React.SetStateAction<number>>;
  size?: number;
}

// function changePageToArrayPage

export default function Pagination({
  curPage = 1,
  setCurPage,
  size = 1,
}: PaginationProps) {
  const [arrayPage, setArrayPage] = useState<Array<number | string>>([1]);
  useEffect(() => {
    const right = size - curPage;
    const left = curPage;
    const distance = 8;
    if (left >= distance && right >= distance) {
      setArrayPage([
        1,
        2,
        "...",
        ...new Array(6).fill(0).map((_, i) => curPage - 2 + i),
        "...",
        size - 1,
        size,
      ]);
    } else if (left < distance && right >= distance) {
      setArrayPage([
        ...new Array(left).fill(0).map((_, i) => i + 1),
        ...new Array(3).fill(0).map((_, i) => curPage + i + 1),
        "...",
        size - 1,
        size,
      ]);
    } else if (left >= distance && right < distance) {
      setArrayPage([
        1,
        2,
        "...",
        ...new Array(3).fill(0).map((_, i) => curPage - 3 + i + 1),
        ...new Array(right).fill(0).map((_, i) => curPage + i + 1),
      ]);
    } else {
      setArrayPage([...new Array(size).fill(0).map((_, i) => i + 1)]);
    }
  }, [size, curPage]);
  return (
    <div className="flex items-center justify-center py-10 w-full">
      <div className="w-full flex items-center justify-between">
        <div
          className="flex items-center text-[--gray-200] hover:text-[--primary-500] cursor-pointer"
          onClick={() => {
            if (curPage > 1) setCurPage(curPage - 1);
          }}
        >
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.1665 4H12.8332"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.1665 4L4.49984 7.33333"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.1665 4.00002L4.49984 0.666687"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p className="text-sm ml-3 font-medium leading-none">Previous</p>
        </div>
        <div className="flex">
          {arrayPage.map((val) => {
            if (typeof val === "string") {
              return (
                <div className="page flex flex-col justify-center items-center text-sm w-[40px] h-[40px] font-medium leading-none cursor-pointer text-[--gray-200] mr-4 px-2 rounded-full">
                  {val}
                </div>
              );
            }
            return (
              <div
                className="page flex flex-col justify-center items-center text-sm w-[40px] h-[40px] font-medium leading-none cursor-pointer text-[--gray-200] mr-4 px-2 rounded-full"
                style={{
                  backgroundColor: `${
                    curPage === val ? "var(--primary-500)" : "white"
                  }`,
                  color: `${curPage === val ? "white" : "var(--gray-200)"}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--primary-500)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = `${
                    curPage === val ? "var(--primary-500)" : "white"
                  }`;
                  e.currentTarget.style.color = `${
                    curPage === val ? "white" : "var(--gray-200)"
                  }`;
                }}
                onClick={() => {
                  setCurPage(val);
                }}
              >
                {`${val < 10 ? "0" : ""}${val}`}
              </div>
            );
          })}
        </div>
        <div
          className="flex items-center text-[--gray-200] hover:text-[--primary-500] cursor-pointer"
          onClick={() => {
            if (curPage < size) setCurPage(curPage + 1);
          }}
        >
          <p className="text-sm font-medium leading-none mr-3">Next</p>
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.1665 4H12.8332"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.5 7.33333L12.8333 4"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.5 0.666687L12.8333 4.00002"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
