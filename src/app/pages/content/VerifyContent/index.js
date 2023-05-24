import React, { useEffect, useState } from "react";
import {
  Card,
  Checkbox,
  IconButton,
  Stack,
  TableRow,
  Typography,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { VerifyItem } from "./VerifyItem.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllContent, getMyContent, getMyContentToVerify } from "app/redux/actions/contentAction.js";
import { verifyBulk } from "app/services/apis/verifyBulk.js";
import Swal from "sweetalert2";
import { contentLiveStatus } from "app/services/apis/contentLiveStatus.js";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog.js";
import ScheduleForm from "app/components/ScheduleForm/ScheduleForm.js";

const VerifyContentList = () => {
  const { showDialog, hideDialog } = useJumboDialog();

  const hideDialogAndRefreshContactsList = React.useCallback(() => {
    hideDialog();
  }, [hideDialog]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyContentToVerify());
  }, []);
  // Dummy data
  const { verifyContent } = useSelector((state) => state.contentReducer);

  // Calculate the total number of pages
  const totalPages = Math.ceil(verifyContent.length / itemsPerPage);

  // Get the current items to display on the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = verifyContent.slice(indexOfFirstItem, indexOfLastItem);

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

  // Handle delete action
  // const handleDelete = () => {
  //   // Perform delete action on selectedItems array
  //   console.log("Delete selected items:", selectedItems);
  //   setSelectedItems([]);
  // };

  // Handle edit action
  const handleEdit = async () => {
    // Perform edit action on selectedItems array
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
    // Perform edit action on selectedItems array
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
          content: <ScheduleForm onSave={hideDialogAndRefreshContactsList} items={selectedItems}/>,
        });
        break;
      // case 'delete':
      //     sweetAlerts()
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
        <Typography variant="h2">Verify Contents</Typography>
        {currentItems.map((item) => (
          <VerifyItem
            key={item._id}
            item={item}
            selected={selectedItems.includes(item._id)}
            onCheckboxChange={handleCheckboxChange}
          />
        ))}
        {/* <Stack direction="row" alignItems="center">
          <IconButton
            disabled={selectedItems.length === 0}
            onClick={handleDelete}
          >
            <Delete />
          </IconButton>
          <IconButton
            disabled={selectedItems.length === 0}
            onClick={handleEdit}
          >
            <Typography variant="button" sx={{
              "&:hover": {
                transform: "scale(1.2)",
                transition: "transform 0.3s ease",
                color:"green"
              },
            }}>Verify</Typography>
          </IconButton>
          <IconButton
            disabled={selectedItems.length === 0}
            onClick={handleLive}
          >
            <Typography variant="button" sx={{
              "&:hover": {
                transform: "scale(1.2)",
                transition: "transform 0.3s ease",
                color:"Highlight"
              },
            }}>Live</Typography>
          </IconButton>
          <IconButton
            disabled={selectedItems.length === 0}
            onClick={()=>{handleSchedule("schedule")}}
          >
            <Typography variant="button" sx={{
              "&:hover": {
                transform: "scale(1.2)",
                transition: "transform 0.3s ease",
                color:"darkmagenta"
              },
            }}>Schedule</Typography>
          </IconButton>
          <IconButton
            disabled={selectedItems.length === 0}
            onClick={handleDisable}
          >
            <Typography variant="button" sx={{
              "&:hover": {
                transform: "scale(1.2)",
                transition: "transform 0.3s ease",
                color:"firebrick"
              },
            }}>Disable</Typography>
          </IconButton>
        </Stack> */}
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </Card>
  );
};

export default VerifyContentList;
