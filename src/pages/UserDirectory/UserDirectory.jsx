import React from "react";
import style from "./UserDirectory.module.css";
import SideBarNav from "../../components/SideBarNav";
import NavBar from "../../components/NavBar";
import DashBoardHeading from "../../components/DashBoardHeading";
import { Search, Filter, MoreHorizontal } from "lucide-react";
import { Outlet } from "react-router";
export default function UserDirectory() {

  return (
   <Outlet/>
  );
}
