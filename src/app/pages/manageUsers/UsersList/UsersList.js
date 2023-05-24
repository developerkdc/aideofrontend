import React, { useEffect, useState } from "react";
import UserItem from "./UserItem";
import {
  Typography,
  InputBase,
  InputAdornment,
  Autocomplete,
  TextField,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "app/redux/actions/userAction";
import SearchIcon from "@mui/icons-material/Search";

const UsersList = () => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.userReducer);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    const filteredUsers = allUsers?.filter(
      (user) =>
        user.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        user.email.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const filteredUsersByRole = roleFilter
      ? filteredUsers.filter((user) =>
          user?.role.toLowerCase().includes(roleFilter.toLowerCase())
        )
      : filteredUsers;

    setFilteredUsers(filteredUsersByRole);
  }, [allUsers, searchKeyword, roleFilter]);

  const handleRoleFilterChange = (event, value) => {
    setRoleFilter(value);
  };

  return (
    <React.Fragment>
      <Typography variant={"h2"} mb={3}>
        Users
      </Typography>
      <Box sx={{display:"flex", mb:5 , justifyContent:"space-between"}}>
        <InputBase
          sx={{
            color: "inherit",
            padding: 1,
            display: "flex",
            borderRadius: 24,
            backgroundColor: "white",
            width: "20%",
            border: "0.5px black solid",
          }}
          placeholder="Search User or Email"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          onChange={(event) => setSearchKeyword(event.target.value)}
          value={searchKeyword}
        />
        <Autocomplete
          value={roleFilter}
          onChange={handleRoleFilterChange}
          options={["", "Manager", "Creator"]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filter by Role"
              sx={{
                ml: 2,
                width: 200,
              }}
            />
          )}
        />
      </Box>

      {filteredUsers?.map((user, index) => (
        <UserItem user={user} key={index} />
      ))}
    </React.Fragment>
  );
};

export default UsersList;
