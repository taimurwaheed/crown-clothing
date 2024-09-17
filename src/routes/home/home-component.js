import React from "react";
import Directory from "../../components/directory/directory-component";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    // This is the nested route outlet, Outlet tell route element where and when to render
    // the child routes within the page
    <div>
      <Outlet />
      <Directory />
    </div>
  );
};

export default Home;
