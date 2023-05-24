import React, { useEffect, useState } from "react";
import {
  Card,
  Checkbox,
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
import { getAllContent } from "app/redux/actions/contentAction.js";
import { verifyBulk } from "app/services/apis/verifyBulk.js";
import Swal from "sweetalert2";
import { contentLiveStatus } from "app/services/apis/contentLiveStatus.js";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog.js";
import ScheduleForm from "app/components/ScheduleForm/ScheduleForm.js";
import Div from "@jumbo/shared/Div/Div.js";

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
  }, []);
  // Dummy data
  const { allContent } = useSelector((state) => state.contentReducer);

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

  return (
    <Card>
      <Stack spacing={2} p={2}>
        <Typography variant="h2">Aideo List</Typography>
        <InputBase
          sx={{
            color: "inherit",
            padding:1,
            display: "flex",
            borderRadius: 24,
            width:"20%",
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
