import React, { useContext, useEffect, useState } from "react";
import style from "./DashBoard.module.css";
import SideBarNav from "../../components/SideBarNav";
import NavBar from "../../components/NavBar";
import DashBoardHeading from "../../components/DashBoardHeading";
import DashBoardStats from "../../components/DashBoardStats";
import GraphChart from "../../components/GraphChart";
import BarChartStats from "../../components/BarChartStats";
import { data } from "../../store/Context";
import { getDashBoardStats } from "../../repository/statsRepo";
import { toast } from "react-toastify";
export default function DashBoard() {
  const [statsCardData, setStatsCardData] = useState(null);
  useEffect(() => {
    getDashBoardStats({
      onSuccess: (result) => {
        setStatsCardData(result.data.data);
      },
      onError: (error) => {
        toast.error(error);
      },
    });
  }, []);
  return (
    <div className={style.mainContainer}>
      <div className={`${style.section} ${style.mianView}`}>
        <DashBoardHeading
          heading="Platform Overview"
          subHeading="Real-time metrics across all users and content"
        >
          <div>
            <button
              className={style.btn}
              onClick={() => {
                toast.info("feature yet to be added");
              }}
            >
              Export Report
            </button>
            <button
              className={style.btn}
              onClick={() => {
                toast.info("feature yet to be added");
              }}
            >
              System Scan
            </button>
          </div>
        </DashBoardHeading>
        {statsCardData && <DashBoardStats statsCardData={statsCardData} />}
        <div className={style.sectionContainer}>
          <div className={style.container}>
            <GraphChart />
          </div>
          <div className={style.container}>
            <BarChartStats />
          </div>
        </div>
      </div>
    </div>
  );
}
