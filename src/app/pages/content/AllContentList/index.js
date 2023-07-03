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
  MenuItem,
  Select,
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
import { getAllContent } from "app/redux/actions/contentAction.js";
import { verifyBulk } from "app/services/apis/verifyBulk.js";
import Swal from "sweetalert2";
import { contentLiveStatus } from "app/services/apis/contentLiveStatus.js";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog.js";
import ScheduleForm from "app/components/ScheduleForm/ScheduleForm.js";
import Div from "@jumbo/shared/Div/Div.js";
import { getAllUsers } from "app/redux/actions/userAction.js";
import { getAllTags } from "app/redux/actions/tagAction.js";

const AllContentList = () => {
  const { showDialog, hideDialog } = useJumboDialog();

  const hideDialogAndRefreshContactsList = React.useCallback(() => {
    hideDialog();
  }, [hideDialog]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const itemsPerPage = 5;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllContent());
    dispatch(getAllUsers());
    dispatch(getAllTags());
  }, []);

  // Dummy data
  const { allContent } = useSelector((state) => state.contentReducer);
  let { allUsers } = useSelector((state) => state.userReducer);
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

  // Handle edit action
  const handleEdit = async () => {
    await verifyBulk(selectedItems);
    Swal.fire({
      icon: "success",
      title: "Content Verified",
      text: "Successful",
    });
    dispatch(getAllContent());
    setSelectedItems([]);
  };

  const handleLive = async () => {
    const status = "Live";
    await contentLiveStatus(selectedItems, status);
    Swal.fire({
      icon: "success",
      title: "Content is Live Now",
      text: "Successful",
    });
    dispatch(getAllContent());
    setSelectedItems([]);
  };

  const handleSchedule = async (menuItem) => {
    switch (menuItem) {
      case "schedule":
        showDialog({
          title: "Schedule Live Date",
          content: (
            <ScheduleForm
              onSave={hideDialogAndRefreshContactsList}
              items={selectedItems}
            />
          ),
        });
        break;
    }
    setSelectedItems([]);
  };

  const handleDisable = async () => {
    const status = "Not Live";
    await contentLiveStatus(selectedItems, status);
    Swal.fire({
      icon: "success",
      title: "Content is Disabled Now",
      text: "Successful",
    });
    dispatch(getAllContent());
    setSelectedItems([]);
  };

  const [formValues, setFormValues] = useState({
    searchKeyword: "",
    selectedUser: null,
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

  useEffect(() => {
    dispatch(getAllContent(formValues));
  }, [formValues]);

  // Handle change for all fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    updateFormValues(name, value);
  };

  return (
    <Card sx={{ overflow: "scroll" }}>
      <Stack spacing={2} p={2}>
        <Typography variant="h2">Aideo List</Typography>
        <TableRow
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Box sx={{ minWidth: "150px" }}>
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
          <Box sx={{ minWidth: "150px", ml: -5 }}>
            <Autocomplete
              fullWidth
              multiple={false}
              id="user-standard"
              options={allUsers}
              getOptionLabel={(option) => option.name && option.email}
              limitTags={1}
              onChange={(event, newValue) => {
                updateFormValues("selectedUser", newValue);
              }}
              value={selectedUser}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 1, flexShrink: 0 } }}
                  {...props}
                >
                  {option.name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Creator"
                  placeholder="User"
                />
              )}
            />
          </Box>
          <Box sx={{ minWidth: "150px" }}>
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
          <Box sx={{ minWidth: "150px", mt: 2 }}>
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
          <Box sx={{ minWidth: "150px", mt: 2 }}>
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
          <Box sx={{ minWidth: "150px", mt: 2 }}>
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
                // width: "150px",
                "& input": {
                  fontSize: "12px",
                  padding: "8px",
                },
              }}
            />
          </Box>
          <Box sx={{ minWidth: "150px", mt: 2 }}>
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
                // width: "150px",
                "& input": {
                  fontSize: "12px",
                  padding: "8px",
                },
              }}
            />
          </Box>
        </TableRow>
        {currentItems.map((item) => (
          <ContentItem
            key={item._id}
            item={item}
            selected={selectedItems.includes(item._id)}
            onCheckboxChange={handleCheckboxChange}
          />
        ))}
        <Stack direction="row" alignItems="center">
          <IconButton
            disabled={selectedItems.length === 0}
            onClick={handleEdit}
          >
            <Typography
              variant="button"
              sx={{
                "&:hover": {
                  transform: "scale(1.2)",
                  transition: "transform 0.3s ease",
                  color: "green",
                },
              }}
            >
              Verify
            </Typography>
          </IconButton>
          <IconButton
            disabled={selectedItems.length === 0}
            onClick={handleLive}
          >
            <Typography
              variant="button"
              sx={{
                "&:hover": {
                  transform: "scale(1.2)",
                  transition: "transform 0.3s ease",
                  color: "Highlight",
                },
              }}
            >
              Live
            </Typography>
          </IconButton>
          <IconButton
            disabled={selectedItems.length === 0}
            onClick={() => {
              handleSchedule("schedule");
            }}
          >
            <Typography
              variant="button"
              sx={{
                "&:hover": {
                  transform: "scale(1.2)",
                  transition: "transform 0.3s ease",
                  color: "darkmagenta",
                },
              }}
            >
              Schedule
            </Typography>
          </IconButton>
          <IconButton
            disabled={selectedItems.length === 0}
            onClick={handleDisable}
          >
            <Typography
              variant="button"
              sx={{
                "&:hover": {
                  transform: "scale(1.2)",
                  transition: "transform 0.3s ease",
                  color: "firebrick",
                },
              }}
            >
              Disable
            </Typography>
          </IconButton>
        </Stack>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </Card>
  );
};

export default AllContentList;
