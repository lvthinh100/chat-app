import { Fragment } from "react";
import Navigation from "./Navigation";
const Layout = function ({ children }) {
  return (
    <Fragment>
      <Navigation />
      {children}
    </Fragment>
  );
};

export default Layout;
