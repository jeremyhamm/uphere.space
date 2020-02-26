import About from "../views/About";
import Privacy from "../views/Privacy";
import Terms from "../views/Terms";
import Contact from "../views/Contact";
import Sitemap from "../views/Sitemap";
import FourZeroFour from "../views/404";

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
  },
  {
    path: "/sitemap",
    name: "Sitemap",
    component: Sitemap
  },
  {
    path: "/404",
    name: "FourZeroFour",
    component: FourZeroFour
  },
  {
    path: "*",
    redirect: { name: "FourZeroFour" }
  }
];
