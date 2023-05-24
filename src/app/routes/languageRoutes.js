import Page from "@jumbo/shared/Page/Page";
import AddLanguage from "app/pages/language/AddLanguage/AddLanguage";
import LanguageList from "app/pages/language/LanguageList/LanguageList";

const languageRoutes = [
  {
    path: "/all/language",
    element: <Page component={LanguageList} layout={"vertical-default"} />,
  },
  {
    path: "/add/language",
    element: <Page component={AddLanguage} layout={"vertical-default"} />,
  },
];

export default languageRoutes;
