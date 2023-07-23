import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { API } from "../config";
import { tableStyles } from "../styles/patience";

const TestInfo = () => {
  const tableclasses = tableStyles();

  const TOKEN = localStorage.getItem("logintoken");

  const [rows, setRows] = useState();
  const params = useParams();

  console.log("get-single-patience", rows);

  const fetchData = async (id) => {
    try {
      const response = await axios.get(
        `${API}/get-web-patience/${params.id}`,
        {
          headers: { authtoken: `${TOKEN}` },
        }
      );
      console.log("get-single-patience", response.data);
      setRows(response?.data?.WebPatience)
       
    } catch (error) {
      console.error("Fetching Data Error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  return (
    <div className={tableclasses.root}>
      <div className={tableclasses.body}>
        <div className={tableclasses.header} style={{display: 'flex', flexDirection:"column"}}>
          <div className={tableclasses.name}>
            <div className={tableclasses.h2}>
             <Box style={{marginLeft:"25px"}}>
             <Box>
                <p>
                  {rows?.firstName} {rows?.lastName}
                </p>
              </Box>
              <Box>
                <Typography className={tableclasses.patienceTypo}>
                  Patient ID: {rows?.pat_id}
                </Typography>
              </Box>
              <Box>
                <Typography className={tableclasses.patienceTypo}>
                  Status: {rows?.sampleStatus}
                </Typography>
              </Box>
             </Box>

              <Box
                style={{
                  display: "flex",
                  marginRight: "400px",
                  margin: "20px",
                  justifyContent:"space-between"
                }}
              >
                <Box>
                  <Typography className={tableclasses.patienceTypo}>
                    Lab: {rows?.labnumber}
                  </Typography>
                  <Typography className={tableclasses.patienceTypo}>
                    Patience Name: {rows?.firstName} {rows?.lastName}{" "}
                  </Typography>
                  <Typography className={tableclasses.patienceTypo}>
                    Age/Sex : {rows?.age}/{rows?.gender}{" "}
                  </Typography>
                  <Typography className={tableclasses.patienceTypo}>
                    Mobile: {rows?.phone}
                  </Typography>
                  <Typography className={tableclasses.patienceTypo}>
                    Email Address:{rows?.email}
                  </Typography>
                </Box>

                <Box style={{ marginLeft: "100px" }}>
                  <Typography className={tableclasses.patienceTypo}>
                    Refered By:{rows?.referedby}
                  </Typography>
                  <Typography className={tableclasses.patienceTypo}>
                    Lab: {rows?.labnumber}
                  </Typography>
                  <Typography className={tableclasses.patienceTypo}>
                    Created Date :{formatDate(rows?.pickupTime)}
                  </Typography>
                  <Typography className={tableclasses.patienceTypo}>
                    Address : {rows?.address}
                  </Typography>
                  <Typography className={tableclasses.patienceTypo}>
                    No of test: 2
                  </Typography>
                </Box>
              </Box>
            </div>
          </div>

          <div className='border border-[#F8F8F8] rounded-md mb-5  pt-3.5 w-full'>
          <div className=' text-sm xs:text-base border-b border-[#F8F8F8] p-2.5 xs:px-5'>
            <div className='flex justify-between items-center pb-2.5'>
              <h1>Diagnostic Center</h1>
              <p className='font-medium'>Health at Home</p>
            </div>
            <div className='text-sm xs:text-base'>
              {rows?.reportSubcategory?.map(test => {
                const { id, name, Rate } = test;
                return (
                  <div
                    key={id}
                    className='flex justify-between items-center pb-2.5'
                  >
                    <h1>{name}</h1>
                    <p className='font-medium text-green'>INR. {Rate}</p>
                  </div>
                );
              })}
            </div>
            <div className='flex justify-between items-center pb-2.5'>
              <h1>Discount</h1>
              <p className='font-medium text-green'>INR. 100</p>
            </div>
          </div>
          <div className='flex text-sm xs:text-base justify-between items-center py-2.5 p-2.5 xs:px-5'>
            <h1>Total Amount</h1>
            <p className='font-medium text-primary'>
              INR.{' '}
              {rows?.reportSubcategory?.reduce((accumulator, currentValue) => {
                return (accumulator = accumulator + currentValue.Rate);
              }, -100)}
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TestInfo;
