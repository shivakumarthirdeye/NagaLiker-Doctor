import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom/dist";
import { API } from "../config";

const AllTests = () => {
  const navigate = useNavigate();

  const [subcategory, setsubCategory] = useState();


  const fetchsubCategory = async (e) => {
    try {
      const data = await axios.get(
        `${API}/gettestsubcategorys`
      );
      setsubCategory(data?.data?.subTestCategory);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchsubCategory();
  }, []);

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
          <h1 className="text-2xl font-medium  ">All Tests</h1>
        </div>
      </div>
      <div className="hidden xs:flex justify-between items-center">
        <div>
          <h1 className="text-lg font-medium text-black-500 ">
            All Available Report test
          </h1>
          <p className="text-[#B5B5C3] mt-2">
            {!subcategory ? 'No test Yet!':<>{subcategory.length} {' '}test available</>}
          </p>
          <div className="flex flex-wrap">
          {subcategory?.map((sub,i) => {
            return (
              <div className="flex flex-wrap m-5" key={i}>
                <div
                  className="border-[2px] border-t-[#B82C3A] mt-[114px] rounded-bl-[21px] rounded-br-[21px] h-[140px] w-[260px] shadow-2xl"
                  style={{ boxShadow: "12px 12px 12px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="flex flex-col">
                    <p className="font-nunito-sans text-base leading-[22px] pt-6 pl-3">
                      {sub.name}
                    </p>
                    <p className="font-nunito-sans text-[12px] text-[#B5B5C3] leading-[14px] pt-2 pl-3">
                      {sub.shortname}
                    </p>
                  </div>
                  <hr className="border-[#B5B5C3] border-t-1 mt-[18px] pl-[10px]" />
                  <div className="flex w-full justify-between items-center">
                    <div className="ml-2 mt-2">
                      <p className="font-Roboto text-[16px] text-[#497BEA] leading-[22px]">
                        ₹ {sub.Rate}
                      </p>
                    </div>
                    <div className="mr-2">
                      <img src="./microscope.jpg" alt="lab" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTests;
