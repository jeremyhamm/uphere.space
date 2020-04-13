import About from "../views/About";
import Advertising from "../views/Advertising";
import Contact from "../views/Contact";
import FourZeroFour from "../views/404";
import Privacy from "../views/Privacy";
import Sitemap from "../views/Sitemap";
import Terms from "../views/Terms";
import Timeout from "../views/SessionTimeout";

export default [
  {
    path: "/404",
    name: "FourZeroFour",
    component: FourZeroFour
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/adopt",
    name: "Advertising",
    component: Advertising
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: Privacy
  },
  {
    path: "/sitemap",
    name: "Sitemap",
    component: Sitemap
  },
  {
    path: "/terms",
    name: "Terms",
    component: Terms
  },
  {
    path: "/timeout",
    name: "Timeout",
    component: Timeout
  },
  {
    path: "*",
    redirect: { name: "FourZeroFour" }
  }
];
