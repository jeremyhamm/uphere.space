import Home from "../views/Home";
import LayoutContainer from "../views/LayoutContainer";
import ListContainer from "../views/ListContainer";
import API from "../views/API";

export default [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/list",
    name: "List",
    component: ListContainer
  },
  {
    path: "/satellites/:satellite",
    name: "Map",
    component: LayoutContainer
  },
  {
    path: "/api",
    name: "API",
    component: API
  },
  {
    path: "*",
    redirect: { name: "FourZeroFour" }
  }
];
