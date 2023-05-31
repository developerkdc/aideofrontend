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
import { configTopicType } from "app/services/apis/configTopicType";
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
  const tags = topic.tags.map((item) => {
    return item._id;
  });

  const [type, SetType] = useState(topic?.configType);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    tags: [],
    savedTags: topic?.tags?.map((tag) => tag) || [], // Include savedTags property
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
      if (selectedItems.length < 15) {
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
    let tagIds = [];
    if (formData.savedTags.length > 0) {
      tagIds = formData.savedTags.map((item) => item._id);
    }
    const body = {
      contentIds: selectedItems,
      tagIds: tagIds,
      topicId: topic._id,
    };
    const data = await configureTopic(body);
    dispatch(getContentByTopic(topic._id));
    Swal.fire({
      icon: "success",
      title: "Topic Updated Successfully",
    });
    setFormData({ ...formData, tags: [] }); // Clear both tags and savedTags
  };

  const handleConfigType = async (item) => {
    const data = await configTopicType(item, topic._id);
    SetType(data.data.configType);
  };
  return (
    <Div>
      <Box
        sx={{ display: "flex", justifyContent: "space-between" }}
        width={250}
      >
        <Button
          variant={type === "auto" ? "contained" : "outlined"}
          color="secondary"
          onClick={() => handleConfigType("auto")}
        >
          Auto Select
        </Button>
        <Button
          variant={type === "manual" ? "contained" : "outlined"}
          color="warning"
          onClick={() => handleConfigType("manual")}
        >
          Manual
        </Button>
      </Box>
      {type == "manual" ? (
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
                {topic.name} <span>({selectedItems.length}/15 selected)</span>
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
              <Div
                sx={{
                  width: "800",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Saved Tags
                </Typography>
                <Autocomplete
                  sx={{ width: "20%", ml: 2 }}
                  multiple
                  id="tags-standard"
                  options={alltags}
                  getOptionLabel={(option) => option.name}
                  value={formData.savedTags} // Use formData.savedTags instead of formData.tags
                  onChange={(event, value) => {
                    setFormData({ ...formData, savedTags: value }); // Update savedTags property
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
                      label="Tags To Save For Topic"
                      placeholder="Tags"
                    />
                  )}
                />

                <Typography variant="subtitle1" sx={{ mt: 2, ml: 10 }}>
                  Filter Aideos
                </Typography>
                <Autocomplete
                  sx={{ width: "20%", ml: 2 }}
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
                      label="Filter Aideos"
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
      ) : (
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
                {topic.name} <span>(Auto Select)</span>
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
                  sx={{ width: "80%", ml: 2 }}
                  multiple
                  id="tags-standard"
                  options={alltags}
                  getOptionLabel={(option) => option.name}
                  value={formData.savedTags} // Use formData.savedTags instead of formData.tags
                  onChange={(event, value) => {
                    setFormData({ ...formData, savedTags: value }); // Update savedTags property
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
                      label="Tags To Save For Topic"
                      placeholder="Tags"
                    />
                  )}
                />
              </Div>
            </FormControl>
          </Stack>
        </Card>
      )}
    </Div>
  );
}
