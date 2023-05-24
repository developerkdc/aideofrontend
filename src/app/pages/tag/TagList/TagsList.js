import React, { useEffect, useState } from "react";
import TagItem from "./TagItem";
import { Typography, TextField, InputBase, InputAdornment } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags } from "app/redux/actions/tagAction";
import SearchIcon from "@mui/icons-material/Search";
const TagsList = () => {
  const dispatch = useDispatch();
  const { alltags } = useSelector((state) => state.tagReducer);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredTags, setFilteredTags] = useState([]);

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  useEffect(() => {
    const filteredTags = alltags?.filter((tag) =>
      tag.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredTags(filteredTags);
  }, [alltags, searchKeyword]);

  return (
    <React.Fragment>
      <Typography variant={"h2"} mb={3}>
        Tags
      </Typography>
      <InputBase
          sx={{
            color: "inherit",
            padding:1,
            display: "flex",
            borderRadius: 24,
            backgroundColor: "white",
            width:"20%",
            mb:5,
            border:"0.5px black solid"
          }}
          placeholder="Search Title"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          onChange={(event) => setSearchKeyword(event.target.value)}
          value={searchKeyword}
        />
      {filteredTags.map((tag, index) => (
        <TagItem tag={tag} key={index} />
      ))}
    </React.Fragment>
  );
};

export default TagsList;
