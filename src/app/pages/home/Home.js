import { loadUser } from "app/redux/actions/userAction";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Home = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  //   if (isAuthenticated === "true") {
  //     dispatch(loadUser());
  //     // console.log("rehan");
  //   }
  // }, []);

  return (
    <div>
      <h2>Sample blank page</h2>
      <p>This page is just to showcase the way you can add your own pages.</p>
      <p>Happy Coding!</p>
    </div>
  );
};

export default Home;
