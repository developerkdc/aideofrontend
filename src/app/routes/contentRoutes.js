import Page from "@jumbo/shared/Page/Page";
import Topic from "app/pages/Topic/TopicList/Topic";
import MailsList from "app/pages/Trial/components/MailsList/MailsList";
import LatestAlerts from "app/pages/content/AddContent/LatestAlerts/LatestAlerts";
import AllContentList from "app/pages/content/AllContentList/";
import MyContentList from "app/pages/content/MyContent";
import VerifyContentList from "app/pages/content/VerifyContent";
import AddTag from "app/pages/tag/AddTag/AddTag";

const contentRoutes = [
  {
    path: "/content",
    element: <Page component={AllContentList} layout={"vertical-default"} />,
  },
  {
    path: "/mycontent",
    element: <Page component={MyContentList} layout={"vertical-default"} />,
  },
  {
    path: "/add/content",
    element: <Page component={LatestAlerts} layout={"vertical-default"} />,
  },
  {
    path: "/verify/contents",
    element: <Page component={VerifyContentList} layout={"vertical-default"} />,
  },
];

export default contentRoutes;
