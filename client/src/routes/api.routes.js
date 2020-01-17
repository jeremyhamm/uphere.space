import APIOverview from "../views/APIOverview";
import APIDocumentation from "../views/APIDocumentation";

export default [
  {
    path: "/development/api/overview",
    name: "API-Overview",
    component: APIOverview
  },
  {
    path: "/development/api/documentation",
    name: "API-Documentation",
    component: APIDocumentation
  }
];
