import About from "../views/About";
import Privacy from "../views/Privacy";
import Terms from "../views/Terms";
import Contact from "../views/Contact";

export default [
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: Privacy
  },
  {
    path: "/terms",
    name: "Terms",
    component: Terms
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact
  }
];
