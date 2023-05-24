import React, { useEffect, useState } from "react";
import { Typography, TextField, InputBase, InputAdornment } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllLanguages } from "app/redux/actions/languageAction";
import SearchIcon from "@mui/icons-material/Search";
import LanguageItem from "./LanguageItem";

const LanguageList = () => {
  const dispatch = useDispatch();
  const { alllanguages } = useSelector((state) => state.languageReducer);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredLanguages, setFilteredLanguages] = useState([]);

  useEffect(() => {
    dispatch(getAllLanguages());
  }, []);

  useEffect(() => {
    const filteredLanguages = alllanguages?.filter((language) =>
      language.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredLanguages(filteredLanguages);
  }, [alllanguages, searchKeyword]);

  return (
    <React.Fragment>
      <Typography variant={"h2"} mb={3}>
        Languages
      </Typography>
      <InputBase
        sx={{
          color: "inherit",
          padding: 1,
          display: "flex",
          borderRadius: 24,
          backgroundColor: "white",
          width: "20%",
          mb: 5,
          border: "0.5px black solid"
        }}
        placeholder="Search Language"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        onChange={(event) => setSearchKeyword(event.target.value)}
        value={searchKeyword}
      />
      {filteredLanguages.map((language, index) => (
        <LanguageItem language={language} key={index} />
      ))}
    </React.Fragment>
  );
};

export default LanguageList;
