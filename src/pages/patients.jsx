import { Transition } from "@headlessui/react";
import { sub } from "date-fns";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { AiOutlineUndo } from "react-icons/ai";
import { FaUndo } from "react-icons/fa";
import { GrFilter, GrSearch } from "react-icons/gr";
import { HiOutlineArrowSmLeft, HiOutlineFilter } from "react-icons/hi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom/dist";
import { SERVER_URL } from "../utils/config";
import axios from "axios";
import { formatDate } from "../utils/helper";
import { API } from "../config";

const Patients = () => {
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [customDateFilter, setCustomDateFilter] = useState(null);

  const isLap = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const [patience, setpatience] = useState();
 

  const [searchQuery, setSearchQuery] = useState("");
  const [sortedData, setSortedData] = useState();

  const filteredData = patience?.filter((item) =>
    item?.firstName?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  const handleSortByDate = () => {
    const copiedData = [...sortedData];
    const sorted = copiedData.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
    setSortedData(sorted);
  };

  const TOKEN = localStorage.getItem("access_token");

  const fetchsubCategory = async (e) => {
    try {
      const data = await axios.get(
        `${API}/get-web-patience`,
        {
          headers: { authtoken: `${TOKEN}` },
        }
      );
      setpatience(data?.data?.patients);
    } catch (e) {
      console.log(e);
    }
  };

  console.log("patience",patience)

  useEffect(() => {
    fetchsubCategory();
  }, [searchQuery]);

  useEffect(() => {
    setSortedData(patience);
  }, [patience]);

  useEffect(() => {
    if (!isLap) setOpenFilter(false);

    axios.post(`${SERVER_URL}/register-web-patience`);
  }, [isLap]);

  return (
    <div className="mainContainer xs:mt-12">
      <div className="flex justify-between py-3 xs:hidden">
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            <HiOutlineArrowSmLeft className="text-3xl" />
          </button>
          <h1 className="text-2xl font-medium  ">Lab Patients</h1>
        </div>
      </div>

      <div className=" justify-between hidden xs:flex items-center">
        <div>
          <h1 className="text-lg font-medium text-black-500 ">All Patients</h1>
          <p className="text-[#B5B5C3] mt-2">
            {patience?.length === 0 ? (
              "No Patients Yet!"
            ) : (
              <>{patience?.length} available records</>
            )}
          </p>
        </div>
      </div>
      {/* Filter */}
      <div className="my-8">
        <div className="flex space-x-6 justify-between md:justify-normal  items-center">
          <div className="md:max-w-[280px] w-full relative">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search for patients"
              className="bg-[#F1F1F1] border-none focus:border-none focus:outline-none p-4  w-full md:max-w-[280px] rounded-[10px]  pr-10 "
            />
            <div className="absolute right-4  text-xl top-[18px] text-[#F1F1F1]">
              <GrSearch className="searchSvg" />
            </div>
          </div>
          <div className="block md:hidden">
            <button
              onClick={() => {
                setOpenFilter((prev) => !prev);
              }}
              className="bg-[#497BEA] p-3 rounded-full"
            >
              <svg
                width={26}
                height={26}
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.479 5.41667H19.229M14.8957 3.25V7.58333M14.8957 5.41667H2.979M7.31234 13H2.979M11.6457 10.8333V15.1667M23.5623 13H11.6457M22.479 20.5833H19.229M14.8957 18.4167V22.75M14.8957 20.5833H2.979"
                  stroke="white"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex bg-[#273142]  items-center    rounded-[10px] ">
            <button className="text-white  p-5  border-r border-white ">
              <HiOutlineFilter className="text-white" />
            </button>
            <button
              className="text-white  p-4  border-r border-white"
              onClick={handleSortByDate}
            >
              Filter by Date{" "}
              <span>
                <MdOutlineKeyboardArrowDown className="inline ml-2 text-2xl" />
              </span>
            </button>
            <button className="flex items-center  text-[#FF8743]  px-4   border-white ">
              <span>
                <svg
                  className="mr-2"
                  width="20"
                  height="20"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.70898 6.55078H2.70898V3.55078"
                    stroke="#FF8743"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.83398 12.2068C5.60299 12.9765 6.58299 13.5007 7.65001 13.7133C8.71703 13.9259 9.82313 13.8173 10.8284 13.4011C11.8336 12.985 12.6929 12.28 13.2974 11.3754C13.902 10.4709 14.2247 9.40733 14.2247 8.31934C14.2247 7.23135 13.902 6.1678 13.2974 5.26324C12.6929 4.35867 11.8336 3.65372 10.8284 3.23757C9.82313 2.82142 8.71703 2.71277 7.65001 2.92535C6.58299 3.13793 5.60299 3.6622 4.83398 4.43184L2.70898 6.55059"
                    stroke="#FF8743"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Reset FIlter
            </button>
          </div>
        </div>
      </div>
      {/* No Info */}
      {!patience ? (
        <div className="py-60 flex flex-col items-center justify-center">
          <div className="text-center mt-3">
            <h1 className="text-lg  font-medium text-black-500 ">
              {patience?.length === 0 ? (
                "No Patients Yet!"
              ) : (
                <>{patience?.length}</>
              )}
            </h1>
            <p className="text-[#B5B5C3] mt-1">
              Book for a sample test now and get patient details
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap m-6">
          {filteredData?.map((sub, i) => {
            return (
              <div className="flex flex-wrap" key={i}>
                <div
                  className=" m-5 mt-[114px] rounded-[21px] h-[160px] w-[260px] shadow-2xl"
                  style={{
                    boxShadow:
                      "0px 12px 12px -12px rgba(0, 0, 0, 0.1), 12px 0px 12px -12px rgba(0, 0, 0, 0.1), -12px 0px 12px -12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="flex flex-col">
                    <p className="font-nunito-sans text-base leading-[22px] pt-6 pl-3">
                      {sub.firstName} {sub.lastName}
                    </p>
                    <div className="flex flex-col">
                      <p className="font-nunito-sans text-[12px] text-[#B5B5C3] leading-[14px] pt-2 pl-3">
                        {sub?.subcategories?.map((sub) => sub.name)}
                      </p>
                      <p className="font-nunito-sans text-[12px] text-[#B5B5C3] leading-[14px] pt-2 pl-3">
                        {formatDate(sub?.pickupTime)}
                      </p>
                    </div>
                  </div>
                  <hr className="border-[#B5B5C3] border-t-1 mt-[18px] pl-[10px]" />
                  <div className="flex w-full justify-between items-center">
                    <div className="ml-2 mt-3">
                      <p className="font-Roboto text-[16px] text-[#497BEA] leading-[22px]">
                        ₹ {sub?.amount}
                      </p>
                    </div>
                    <div className="mt-3 mr-5">
                      <Link
                        to={`/patient/${sub._id}`}
                        className="bg-primary w-[80px]  py-2.5 text-sm px-4 rounded-[22px] text-white font-semibold"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {openFilter && (
        <div
          onClick={() => {
            setOpenFilter((prev) => !prev);
          }}
          className="fixed top-0 left-0 right-0 bottom-0 bg-black/50  z-10"
        ></div>
      )}

      <div className="relative">
        <Transition
          show={openFilter}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
          className="fixed bottom-0 h-[375px] py-8 z-20 bg-white p-5 w-full left-0 right-0"
        >
          <button
            onClick={() => {
              setOpenFilter((prev) => !prev);
            }}
            className="absolute top-3 left-[50%] translate-x-[-50%]"
          >
            <svg
              width="48"
              height="5"
              viewBox="0 0 48 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1.75"
                y1="2.74072"
                x2="46.25"
                y2="2.74072"
                stroke="#D1D1D1"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <h1 className="text-xl font-medium">Sort by Date</h1>
          <div className="my-4">
            <button
              onClick={() => {
                setDateFilter("today");
                setCustomDateFilter(null);
              }}
              className={` ${
                dateFilter === "today" && "border-[#B82C3A]"
              } my-5 justify-between w-full flex items-center p-2 px-4 border  rounded-md `}
            >
              <div>
                <h1 className="font-medium text-left py-1.5">Today</h1>
                <p className="text-xs text-[#ABABAB]">
                  {format(new Date(), "do MMM yyyy")}
                </p>
              </div>
              <div>
                {dateFilter === "today" && (
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.825684 12.4536C0.825684 9.27102 2.08997 6.21877 4.3404 3.96833C6.59084 1.7179 9.64309 0.453613 12.8257 0.453613C16.0083 0.453613 19.0605 1.7179 21.311 3.96833C23.5614 6.21877 24.8257 9.27102 24.8257 12.4536C24.8257 15.6362 23.5614 18.6885 21.311 20.9389C19.0605 23.1893 16.0083 24.4536 12.8257 24.4536C9.64309 24.4536 6.59084 23.1893 4.3404 20.9389C2.08997 18.6885 0.825684 15.6362 0.825684 12.4536ZM12.1409 17.5896L19.0497 8.95281L17.8017 7.95441L11.9105 15.316L7.73768 11.8392L6.71368 13.068L12.1409 17.5912V17.5896Z"
                      fill="#B82C3A"
                    />
                  </svg>
                )}
              </div>
            </button>
            <button
              onClick={() => {
                setDateFilter("yesterday");
                setCustomDateFilter(null);
              }}
              className={` ${
                dateFilter === "yesterday" && "border-[#B82C3A]"
              } my-5 justify-between w-full flex items-center p-2 px-4 border  rounded-md `}
            >
              <div>
                <h1 className="font-medium text-left py-1.5">Yesterday</h1>
                <p className="text-xs text-[#ABABAB]">
                  {format(
                    sub(new Date(), {
                      days: 1,
                    }),
                    "do MMM yyyy"
                  )}
                </p>
              </div>
              <div>
                {dateFilter === "yesterday" && (
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.825684 12.4536C0.825684 9.27102 2.08997 6.21877 4.3404 3.96833C6.59084 1.7179 9.64309 0.453613 12.8257 0.453613C16.0083 0.453613 19.0605 1.7179 21.311 3.96833C23.5614 6.21877 24.8257 9.27102 24.8257 12.4536C24.8257 15.6362 23.5614 18.6885 21.311 20.9389C19.0605 23.1893 16.0083 24.4536 12.8257 24.4536C9.64309 24.4536 6.59084 23.1893 4.3404 20.9389C2.08997 18.6885 0.825684 15.6362 0.825684 12.4536ZM12.1409 17.5896L19.0497 8.95281L17.8017 7.95441L11.9105 15.316L7.73768 11.8392L6.71368 13.068L12.1409 17.5912V17.5896Z"
                      fill="#B82C3A"
                    />
                  </svg>
                )}
              </div>
            </button>
            <button
              onClick={() => {
                setCustomDateFilter("test");
                setDateFilter("");
              }}
              className={` ${
                customDateFilter && "border-[#B82C3A]"
              } my-5 justify-between w-full flex items-center p-2 px-4 border  rounded-md `}
            >
              <div>
                <h1 className="font-medium text-left py-1.5">Custom range</h1>
                <p className="text-xs text-[#ABABAB]">Select date</p>
              </div>
              <div>
                {customDateFilter && (
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.825684 12.4536C0.825684 9.27102 2.08997 6.21877 4.3404 3.96833C6.59084 1.7179 9.64309 0.453613 12.8257 0.453613C16.0083 0.453613 19.0605 1.7179 21.311 3.96833C23.5614 6.21877 24.8257 9.27102 24.8257 12.4536C24.8257 15.6362 23.5614 18.6885 21.311 20.9389C19.0605 23.1893 16.0083 24.4536 12.8257 24.4536C9.64309 24.4536 6.59084 23.1893 4.3404 20.9389C2.08997 18.6885 0.825684 15.6362 0.825684 12.4536ZM12.1409 17.5896L19.0497 8.95281L17.8017 7.95441L11.9105 15.316L7.73768 11.8392L6.71368 13.068L12.1409 17.5912V17.5896Z"
                      fill="#B82C3A"
                    />
                  </svg>
                )}
              </div>
            </button>
          </div>
        </Transition>
      </div>

      {/* EF No Info */}
    </div>
  );
};

export default Patients;
