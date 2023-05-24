import Page from "@jumbo/shared/Page/Page";
import AddTag from "app/pages/tag/AddTag/AddTag";
import TagsList from "app/pages/tag/TagList/TagsList";

const tagRoutes = [
  {
    path: "/all/tags",
    element: <Page component={TagsList} layout={"vertical-default"} />,
  },
  {
    path: "/add/tags",
    element: <Page component={AddTag} layout={"vertical-default"} />,
  },
];

export default tagRoutes;
