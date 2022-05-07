import React from 'react';
import {Users} from "../../constants/Auth/Users";
import BasicUser from "./BasicUser";

const AllUsers = () => {
  return (
    <div className={`vstack h-85 w-100 overflow-y-scroll px-3 my-1 mt-2 thumb-slim thumb-light`}>
      {Users.map((user, index) => <BasicUser index={index} user={user}/>)}
      {Users.map((user, index) => <BasicUser index={index} user={user}/>)}
    </div>
  );
};

export default AllUsers;