import React, { Component } from "react";
import Header from "./header";
import Head from "next/head";
import GlobalStyle from "../../../style/globalStyle";

class Layout extends Component {
  render() {
    const { children, title } = this.props;
    return (
      <>
        <GlobalStyle />
        <Head>
          <title>{title}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Header />
        {children}
      </>
    );
  }
}

export default Layout;
