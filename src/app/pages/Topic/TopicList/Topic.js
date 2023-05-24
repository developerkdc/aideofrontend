import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import DndTopic from "./components/DndTopic";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAllTopics } from "app/redux/actions/topicAction";

const DragAndDrop = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTopics());
  }, []);
  let { alltopics } = useSelector((state) => state.topicReducer);
  return (
    <React.Fragment>
      <Typography variant={"h1"} mb={3}>
        All Topics
      </Typography>
      <DndTopic topics={alltopics} />
    </React.Fragment>
  );
};

export default DragAndDrop;
