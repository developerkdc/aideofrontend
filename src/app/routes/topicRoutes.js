import Page from "@jumbo/shared/Page/Page";
import AddTopic from "app/pages/Topic/AddTopic/AddTopic";
import ConfigureTopic from "app/pages/Topic/ConfigureTopic";
import Topic from "app/pages/Topic/TopicList/Topic";

const topicRoutes = [
  {
    path: "/all/topic",
    element: <Page component={Topic} layout={"vertical-default"} />,
  },
  {
    path: "/add/topic",
    element: <Page component={AddTopic} layout={"vertical-default"} />,
  },
  {
    path: "/configure/topic",
    element: <Page component={ConfigureTopic} layout={"vertical-default"} />,
  },
];

export default topicRoutes;
