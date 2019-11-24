import Home from "../views/Home";
import LayoutContainer from "../views/LayoutContainer";
import ListContainer from "../views/ListContainer";

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
    path: "*",
    redirect: { name: "Map", params: { satellite: "ISS (ZARYA)" } }
  }
];
