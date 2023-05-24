import Div from "@jumbo/shared/Div/Div";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ContentItem } from "app/pages/content/AllContentList/ContentItem";
import {
  getAllContent,
  getContentByTags,
  getContentByTopic,
} from "app/redux/actions/contentAction";
import { getAllTags } from "app/redux/actions/tagAction";
import { configureTopic } from "app/services/apis/configureTopic";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { a } from "react-spring";
import Swal from "sweetalert2";

export default function ConfigureTopic() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { alltags } = useSelector((state) => state.tagReducer);
  let { allContent, error, topicContent } = useSelector(
    (state) => state.contentReducer
  );
  const { topic } = location.state;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [formData, setFormData] = useState({
    tags: [],
  });
  
  const [selectedItems, setSelectedItems] = useState([]);
  // console.log(selectedItems);
  let data = [];
  if (formData.tags.length < 1) {
    data = topicContent;
  } else {
    data = allContent;
  }
  // Calculate the total number of pages
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  // Get the current items to display on the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handle checkbox change
  const handleCheckboxChange = (event, itemId) => {
    const { checked } = event.target;

    if (checked) {
      // Check the maximum number of selected items (10)
      if (selectedItems.length < 10) {
        setSelectedItems((prevItems) => [...prevItems, itemId]);
      } else {
        // Show an error or perform the desired action when the maximum is reached
        // console.log("Maximum number of items selected (10)");
        event.target.checked = false; // Uncheck the checkbox
      }
    } else {
      // Deselect the item
      // console.log("unchecked");
      setSelectedItems((prevItems) => prevItems.filter((id) => id !== itemId));
    }
  };

  let tagIds = [];
  useEffect(() => {
    dispatch(getAllTags());
    dispatch(getContentByTopic(topic._id));
  }, []);

  useEffect(() => {
    const preSelected = topicContent?.map((item) => item._id) || [];
    setSelectedItems(preSelected);
  }, [topicContent]);  
  

  useEffect(() => {
    tagIds = formData?.tags.map((item) => {
      return item._id;
    });
    if (tagIds.length > 0) {
      dispatch(getContentByTags(tagIds));
    } else {
      dispatch(getContentByTopic(topic._id));
    }
  }, [formData]);

  const addContent = async () => {
    tagIds = formData?.tags.map((item) => {
      return item._id;
    });
    const body = {
      contentIds: selectedItems,
      tagIds: tagIds,
      topicId: topic._id,
    };
    const data = await configureTopic(body);
    dispatch(getContentByTopic(topic._id))
    Swal.fire({
      icon: "success",
      title: "Topic Updated Successfully",
      // text: "Done",
    });
    setFormData({ tags: [] });
  };

  return (
    <Div>
      <Box
        sx={{ display: "flex", justifyContent: "space-between" }}
        width={250}
      >
        <Button variant="contained" color="secondary">
          Auto Select
        </Button>
        <Button variant="contained" color="warning">
          Manual
        </Button>
      </Box>
      <Card sx={{ mt: 4 }}>
        <Stack spacing={2} p={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h2">
             {topic.name} <span>({selectedItems.length}/10 selected)</span>
            </Typography>
            <Button
              sx={{ minWidth: 92 }}
              disableElevation
              variant={"contained"}
              size={"small"}
              color={"success"}
              disabled={selectedItems.length < 1}
              onClick={addContent}
            >
              Add / Update
            </Button>
          </Box>

          <FormControl>
            <Div sx={{ width: 500, maxWidth: "100%" }}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={alltags}
                getOptionLabel={(option) => option.name}
                value={formData.tags}
                onChange={(event, value) => {
                  setFormData({ ...formData, tags: value });
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
            </Div>
          </FormControl>
          {currentItems?.map((item) => (
            <ContentItem
              key={item?._id}
              item={item}
              selected={selectedItems?.includes(item?._id)}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
        </Stack>
        <Pagination
          sx={{ paddingBottom: 1 }}
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Card>
    </Div>
  );
}
