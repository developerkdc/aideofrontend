import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Card,
  Checkbox,
  Chip,
  IconButton,
  InputAdornment,
  InputBase,
  Stack,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { ContentItem } from "./ContentItem.js";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllContent,
  getMyContent,
} from "app/redux/actions/contentAction.js";
import { verifyBulk } from "app/services/apis/verifyBulk.js";
import Swal from "sweetalert2";
import { contentLiveStatus } from "app/services/apis/contentLiveStatus.js";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog.js";
import ScheduleForm from "app/components/ScheduleForm/ScheduleForm.js";
import Div from "@jumbo/shared/Div/Div.js";
import { getAllTags } from "app/redux/actions/tagAction.js";

const MyContentList = () => {
  const { showDialog, hideDialog } = useJumboDialog();

  const hideDialogAndRefreshContactsList = React.useCallback(() => {
    hideDialog();
  }, [hideDialog]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyContent());
    dispatch(getAllTags());
  }, []);

  // Dummy data
  const { allContent } = useSelector((state) => state.contentReducer);
  const { alltags } = useSelector((state) => state.tagReducer);

  // Calculate the total number of pages
  const totalPages = Math.ceil(allContent.length / itemsPerPage);

  // Get the current items to display on the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredItems = allContent.filter((item) =>
    item.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );
  const currentItems = searchKeyword
    ? filteredItems
    : allContent.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handle checkbox change
  const handleCheckboxChange = (event, itemId) => {
    if (event.target.checked) {
      setSelectedItems((prevItems) => [...prevItems, itemId]);
    } else {
      setSelectedItems((prevItems) => prevItems.filter((id) => id !== itemId));
    }
  };

  const [formValues, setFormValues] = useState({
    searchKeyword: "",
    selectedTags: [],
    ageRating: "",
    status: "",
    fromDate: "",
    toDate: "",
  });
  // Destructure form values
  const { selectedUser, selectedTags, ageRating, status, fromDate, toDate } =
    formValues;

  // Update form values
  const updateFormValues = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateFormValues(name, value);
  };

  useEffect(() => {
    dispatch(getMyContent(formValues));
  }, [formValues]);

  return (
    <Card>
      <Stack spacing={2} p={2}>
        <Typography variant="h2">Aideo List</Typography>
        <Div
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ width: "14%" }}>
            <InputBase
              sx={{
                color: "inherit",
                padding: 0.5,
                display: "flex",
                borderRadius: 24,
                width: "80%",
                mt: 1.5,
                backgroundColor: (theme) =>
                  theme.jumboComponents.JumboSearch.background,
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
          </Box>
          <Box sx={{ width: "19%" }}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={alltags}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => {
                updateFormValues("selectedTags", value);
              }}
              value={selectedTags}
              renderTags={(value, getTagProps) => {
                const displayedTags = value.slice(0, 1); // Limit the displayed tags to 2
                const remainingCount = value.length - displayedTags.length;
                return (
                  <>
                    {displayedTags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag.name}
                        {...getTagProps({ index })}
                      />
                    ))}
                    {remainingCount > 0 && (
                      <Chip label={`+${remainingCount} more`} />
                    )}
                  </>
                );
              }}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {option.name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Choose Tags"
                  placeholder="Tags"
                />
              )}
            />
          </Box>
          <Box sx={{ width: "9%", mt: 2 }}>
            <Autocomplete
              multiple={false}
              id="ageRating-standard"
              options={["Naughty", "Adult", "Universal"]}
              getOptionLabel={(option) => option && option}
              //   defaultValue={[countries[0]]}
              limitTags={1}
              onChange={(event, newValue) => {
                updateFormValues("ageRating", newValue);
              }}
              value={ageRating}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 1, flexShrink: 0 } }}
                  {...props}
                >
                  {option}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label=""
                  placeholder="Age Rating"
                />
              )}
            />
          </Box>
          <Box sx={{ width: "9%", mt: 2 }}>
            <Autocomplete
              multiple={false}
              id="status-standard"
              options={["Live", "Not Live"]}
              getOptionLabel={(option) => option && option}
              //   defaultValue={[countries[0]]}
              limitTags={1}
              onChange={(event, newValue) => {
                updateFormValues("status", newValue);
              }}
              value={status}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 1, flexShrink: 0 } }}
                  {...props}
                >
                  {option}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label=""
                  placeholder="Status"
                />
              )}
            />
          </Box>
          <Box sx={{ width: "10%", mt: 2 }}>
            <TextField
              id="date"
              type="date"
              label="From"
              onChange={handleChange}
              name="fromDate"
              value={fromDate}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                width: "150px",
                "& input": {
                  fontSize: "12px",
                  padding: "8px",
                },
              }}
            />
          </Box>
          <Box sx={{ width: "10%", mt: 2 }}>
            <TextField
              id="date"
              type="date"
              label="To"
              onChange={handleChange}
              name="toDate"
              value={toDate}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                width: "150px",
                "& input": {
                  fontSize: "12px",
                  padding: "8px",
                },
              }}
            />
          </Box>
        </Div>
        {currentItems.map((item) => (
          <ContentItem
            key={item._id}
            item={item}
            selected={selectedItems.includes(item._id)}
            onCheckboxChange={handleCheckboxChange}
          />
        ))}
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </Card>
  );
};

export default MyContentList;
