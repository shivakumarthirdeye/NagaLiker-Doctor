/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { Form, Formik, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import CustomSelect from "../common/Form/CustomSelect";
import React, { Fragment, useRef, useState } from "react";
import DatePicker from "../common/Form/DatePicker";
import { Link } from "react-router-dom";
import SubmitBtn from "../common/Form/SubmitBtn";
import { Popover, Transition } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import { AiOutlineMinus } from "react-icons/ai";
import ErrorBox from "../common/Form/ErrorBox";
import { MdOutlineAdd } from "react-icons/md";
import { ADD_TEST_MODAL } from "../../utils/constant";
import { showModal } from "../../redux/features/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { addTest, removeTest } from "../../redux/features/newBooking";
import axios from "axios";
import { useEffect } from "react";
import SelectTests from "../common/Form/SelectTests";
import { API } from "../../config";

const Investigation = ({
  currentStep,
  setCurrentStep,
  testInfoValues,
  setTestInfoValues,
}) => {
  const dispatch = useDispatch();
  const { tests } = useSelector((state) => state.newBooking);
  const [category, setRows] = useState();
  const TOKEN = localStorage.getItem("access_token");

  // console.log("CustomSelec",testInfoValues.tests)
  
  
  console.log("Investigation", tests);
  const initialValues = testInfoValues || {
    reportCategory: "",
    sample: "",
    tests: "",
    pickupTime: new Date(),
  };

  const fetchTest = async (e) => {
    try {
      const data = await axios.get(
        `${API}/gettestcategory`,
        {
          headers: { authtoken: `${TOKEN}` },
        }
      );
      setRows(data?.data?.testCategory);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(()=>{
    fetchTest()
  },[])

  const validationSchema = Yup.object({
    reportCategory: Yup.string().required("Report Category Name is required"),
    sample: Yup.string().required("Sample Name is required"),
    pickupTime: Yup.string().required("Pickup Time Name is required"),
    tests: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.string(),
          name: Yup.string(),
          shortName: Yup.string(),
          price: Yup.number(),
        })
      )
      .required("Tests List is required"),
  });

  return (
    <div className="max-w-4xl  mx-auto">
      <h1 className="text-xl hidden xs:block mb-8 font-medium">
        Test information
      </h1>
      <p className="my-4 text-[#2B2B2B] text-xs">
        Lorem Ipsum has been the industry's standard dummy text.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, fn) => {
          if (!tests.length) {
            return fn.setFieldError("tests", "required");
          }
          setTestInfoValues({ ...values, tests });
          setCurrentStep(3);
        }}
      >
        {(formik) => {
          const { values, setFieldValue, setTouched, touched } = formik;

          return (
            <Form className="my-6 xs:my-4">
              <div className="block xs:hidden my-4 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setTouched({
                      tests: true,
                    });
                    // dispatch(
                    //   showModal({
                    //     modalType: ADD_TEST_MODAL,
                    //     modalProps: {
                    //       subcategory,
                    //     },
                    //   })
                    // );
                  }}
                  className="flex  items-center space-x-3 text-[#B82C3A] text-sm font-semibold"
                >
                  <span className=" w-5 h-5 rounded-full flex items-center justify-center  bg-[#B82C3A]/20 ">
                    <MdOutlineAdd className="text-lg" />
                  </span>
                  <span>Add test</span>
                </button>
                {touched.tests && !values.tests.length && !tests.length && (
                  <ErrorBox msg="Test List is required" />
                )}
                <div className="grid md:grid-cols-2 my-5 gap-5 ">
                  {tests?.map((test) => {
                    const { name, id, shortname, Rate } = test;
                    return (
                      <div
                        key={id}
                        className="p-[14px] relative text-sm rounded-md border  border-[#F6AFAF]"
                      >
                        <h1 className="font-medium">{name}</h1>
                        <p className="py-1 pb-2 text-[#ABABAB] text-xs">
                          {shortname}
                        </p>
                        <h2 className="text-[#497BEA] font-semibold">
                          {" "}
                          ₹{Rate}
                        </h2>

                        <button
                          onClick={() => {
                            dispatch(removeTest({ testId: test.id }));
                            setFieldValue("tests", [
                              ...testInfoValues?.tests.filter(
                                (obj) => obj.id !== test.id
                              ),
                            ]);
                          }}
                          className="absolute top-5 right-5  w-5 text-primary text-xl h-5 flex items-center justify-center bg-[#FDF4F4] rounded-full"
                        >
                          <AiOutlineMinus />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex  space-x-10">
                <div className="flex-1">
                  <SelectTests
                    label="Report Category*"
                    name="reportCategory"
                    id="reportCategory"
                    placeholder="Select Report Category"
                    options={[
                      {
                        label: "Urine",
                        value: "urine",
                      },
                      {
                        label: "Blood",
                        value: "blood",
                      },
                    ]}
                  />
                </div>
                <div className="hidden md:block flex-1"></div>
              </div>
              <div className="hidden xs:block">
                <SelectTest
                  testInfoValues={testInfoValues}
                  setTestInfoValues={setTestInfoValues}
                />
                <div className="grid md:grid-cols-2 gap-5 ">
                  {tests?.map((test) => {
                    const { name, _id, shortname, Rate } = test;
                    return (
                      <div
                        key={_id}
                        className="p-[14px] relative text-sm rounded-md border  border-[#F6AFAF]"
                      >
                        <h1 className="font-medium">{name}</h1>
                        <p className="py-1 pb-2 text-[#ABABAB] text-xs">
                          {shortname}
                        </p>
                        <h2 className="text-[#497BEA] font-semibold">
                          {" "}
                          ₹{Rate}
                        </h2>

                        <button
                          onClick={() => {
                            dispatch(removeTest({ testId: test.id }));
                            setFieldValue("tests", [
                              ...testInfoValues?.tests.filter(
                                (obj) => obj?.id !== test.id
                              ),
                            ]);
                          }}
                          className="absolute top-5 right-5  w-5 text-primary text-xl h-5 flex items-center justify-center bg-[#FDF4F4] rounded-full"
                        >
                          <AiOutlineMinus />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="text-sm flex py-3 pb-5 justify-between">
                  <h1>Selected count({tests?.length})</h1>
                  <h1>
                    Total amount:{" "}
                    <span className="font-bold ">
                      {" "}
                      ₹
                      {tests?.reduce((accumulator, currentValue) => {
                        return (accumulator = accumulator + currentValue.Rate);
                      }, 0)}
                    </span>
                  </h1>
                </div>
              </div>
              <div className="flex flex-col md:flex-row w-full  md:space-x-10">
                <div className="flex-1">
                  <CustomSelect
                    label="Sample*"
                    name="sample"
                    id="sample"
                    placeholder="Select Sample"
                    options={[
                      {
                        label: "Urine",
                        value: "urine",
                      },
                      {
                        label: "Blood",
                        value: "blood",
                      },
                    ]}
                  />
                </div>
                <div className="flex-1">
                  <DatePicker
                    label="Sample pickup time*"
                    name="pickupTime"
                    id="pickupTime"
                    placeholder="Select Sample pickup time"
                    showTime={true}
                  />
                </div>
              </div>
              <div className="my-2 xs:my-10 flex items-center justify-center space-x-4">
                <button
                  onClick={() => {
                    setCurrentStep(1);
                  }}
                  className="py-3 hidden xs:block text-sm lg:text-base px-8 bg-[#C9C9C9] text-white rounded  font-semibold"
                >
                  Previous
                </button>
                <SubmitBtn
                  // isSubmitting={!values.tests.length}
                  text="Proceed"
                  className="!py-3 w-full text-sm lg:text-base !px-8 bg-primary xs:max-w-[110px] rounded text-white font-semibold"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Investigation;

function SelectTest({ testInfoValues, setTestInfoValues }) {
  const dispatch = useDispatch();
  const { tests } = useSelector((state) => state.newBooking);
  console.log("")

  const TOKEN = localStorage.getItem("access_token");

  const [field, meta] = useField({ name: "tests" });
  
  const [subcategory, setsubCategory] = useState();

  

  const fetchsubCategory = async (e) => {
    try {
      const data = await axios.get(
        `${API}/gettestsubcategorys`,
        {
          headers: { authtoken: `${TOKEN}` },
        }
      );
      setsubCategory(data?.data?.subTestCategory);
      console.log("data?.data?.subTestCategory", data?.data?.subTestCategory);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // fetchTest();
    fetchsubCategory();
    
  }, []);

  const { values, setFieldValue, setTouched, setErrors, setFieldError } =
    useFormikContext();

  const handleClose = (close, value) => {
    setTouched({
      tests: true,
    });
    if (tests.findIndex((obj) => obj.id === value.id) !== -1) {
      setFieldValue("tests", [...tests.filter((obj) => obj.id !== value.id)]);
      dispatch(removeTest({ testId: value.id }));
    } else {
      dispatch(addTest({ newTest: value }));
      setFieldValue("tests", [...tests, value]);
    }
    close();
  };

  const searchInput = useRef();

  const [searchValue, setSearchValue] = useState("");

  console.log("searchValue",searchValue)

  return (
    <div
      className="my-4"
      onFocus={() => {
        setTouched({
          tests: true,
        });
      }}
    >
      <label className=" text-sm block mb-2 "> Select Test*</label>
      <Popover className="relative">
        {({ open, ...props }) => {
          return (
            <>
              {open ? (
                <input
                  className="flex items-center justify-between w-full 
                  py-3 px-5 rounded-md border border-[#C9C9C9]
                  text-sm focus:outline-none"
                  autoFocus={open}
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter & search"
                />
              ) : (
                <Popover.Button className="flex items-center justify-between 
                w-full py-3 px-5 rounded-md border border-[#C9C9C9]
                text-sm text-[#C9C9C9] focus:outline-none">
                  <span>Enter & search</span>
                  <HiChevronDown aria-hidden="true" className="text-2xl" />
                </Popover.Button>
              )}

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-[90vw] max-w-4xl -translate-x-1/2 transform  sm:px-0 lg:max-w-4xl bg-white  rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  {(props) => {
                    const { open, close } = props;

                    return (
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-[#FAFAFA] text-[#B5B5C3]">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-6"
                              >
                                Test
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold "
                              >
                                Short Name
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold "
                              >
                                Rate/price
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-dark-500">
                            {subcategory?.filter((testItem) => {
                                return testItem.name
                                  .toLowerCase()
                                  .includes(searchValue.toLowerCase());
                              })
                              .map((test, personIdx) => {
                                const { _id, name, Rate, shortname } = test;

                                return (
                                  <tr
                                    onClick={() => {
                                      handleClose(close, test);
                                    }}
                                    key={_id}
                                    className={`cursor-pointer bg-white text-[#464E5F] font-semibold relative`}
                                  >
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                                      {name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm ">
                                      {shortname}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm ">
                                      ₹{Rate}
                                    </td>
                                    {tests &&
                                      tests?.findIndex(
                                        (obj) => obj.id === test._id
                                      ) !== -1 && (
                                        <div className="absolute top-3 right-5">
                                          <svg
                                            width="23"
                                            height="23"
                                            viewBox="0 0 23 23"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <g clipPath="url(#clip0_883_7878)">
                                              <path
                                                d="M6.94873 11.9486L10.2406 15.055L16.8244 8.39844"
                                                stroke="#27AE60"
                                                strokeWidth="2.88241"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </g>
                                            <rect
                                              x="1.31374"
                                              y="1.15359"
                                              width="21.146"
                                              height="21.146"
                                              rx="3.84321"
                                              stroke="#27AE60"
                                              strokeWidth="0.854047"
                                            />
                                            <defs>
                                              <clipPath id="clip0_883_7878">
                                                <rect
                                                  x="0.886719"
                                                  y="0.726562"
                                                  width="22"
                                                  height="22"
                                                  rx="4.27023"
                                                  fill="white"
                                                />
                                              </clipPath>
                                            </defs>
                                          </svg>
                                        </div>
                                      )}
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    );
                  }}
                </Popover.Panel>
              </Transition>
            </>
          );
        }}
      </Popover>
      {meta.touched && !meta.value.length && !tests.length && (
        <ErrorBox msg="Test List is required" />
      )}
    </div>
  );
}
