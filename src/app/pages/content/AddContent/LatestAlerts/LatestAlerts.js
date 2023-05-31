import React from "react";
import Chip from "@mui/material/Chip";
import { CardActions, Link, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
// import {latestNotifications} from "./data";
import { TabContext, TabPanel } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import Divider from "@mui/material/Divider";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
// import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import { useTranslation } from "react-i18next";
import JumboScrollbar from "@jumbo/components/JumboScrollbar/JumboScrollbar";
import { latestNotifications } from "./data";
import Step1Form from "./components/Step1Form";
import Step2Form from "./components/Step2Form";
import Step3Form from "./components/Step3Form";

// import MessagesList from "./components/FeedMessages/MessagesList";
// import FeedsList from "./components/FeedsList";
// import InvitationsList from "./components/InvitationsList";

const NotificationListComponents = {
  // "MESSAGES": MessagesList,
  // "FEEDS": FeedsList,
  // "INVITATIONS": InvitationsList
};

const LatestAlerts = ({ scrollHeight }) => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState("step1");
  return (
    <JumboCardQuick
      noWrapper
      title={"Add Aideo"}
      sx={{ width: "70%" }}
    // action={<Chip size={"small"} label={"2 New"} color={"secondary"}/>}
    >
      <TabContext value={value}>
        <TabList
          sx={{ borderBottom: 1, borderColor: "divider" }}
          // onChange={(event, newValue) => setValue(newValue)}
        >
          <Tab label={"Step 1"} value={"step1"} sx={{ flex: "1 1 auto" }} />
          <Tab label={"Step 2"} value={"step2"} sx={{ flex: "1 1 auto" }} />
          <Tab label={"Step 3"} value={"step3"} sx={{ flex: "1 1 auto" }} />
        </TabList>
        <TabPanel value="step1" sx={{ p: 0 }}>
          <JumboScrollbar
            autoHeight
            autoHeightMin={scrollHeight ? scrollHeight : 900}
            autoHide
            autoHideDuration={200}
            autoHideTimeout={500}
          ><Step1Form setValue={setValue}/></JumboScrollbar>
        </TabPanel>
        <TabPanel value="step2" sx={{ p: 0 }}>
        <JumboScrollbar
            autoHeight
            autoHeightMin={scrollHeight ? scrollHeight : 700}
            autoHide
            autoHideDuration={200}
            autoHideTimeout={500}
          ><Step2Form setValue={setValue}/></JumboScrollbar>
        </TabPanel>
        <TabPanel value="step3" sx={{ p: 0 }}>
        <JumboScrollbar
            autoHeight
            autoHeightMin={scrollHeight ? scrollHeight : 608}
            autoHide
            autoHideDuration={200}
            autoHideTimeout={500}
          ><Step3Form/></JumboScrollbar>
        </TabPanel>
      </TabContext>
      <Divider />
      {/* <CardActions sx={{py: theme => theme.spacing(1.5)}}>
                <Link href={"#/"} underline={"none"} lineHeight={1.2}>Learn More</Link>
            </CardActions> */}
    </JumboCardQuick>
  );
};

export default LatestAlerts;
