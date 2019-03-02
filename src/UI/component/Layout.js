import React from "react";
import Header from "./header";
import Head from "next/head";
import GlobalStyle from "../../../style/globalStyle";
import NProgress from "nprogress";
import Router from "next/router";

Router.events.on("routeChangeStart", url => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const Layout = props => {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>{props.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      {props.children}
    </>
  );
};

export default Layout;
