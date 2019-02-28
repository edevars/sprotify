import React, { Component } from "react";
import Header from "./header";
import Head from 'next/head'
import GlobalStyle from "../../../style/globalStyle";

const Layout = (props)=> {
  
    return (
      <>
        <GlobalStyle />
        <Head>
          <title>{props.title}</title>
        </Head>
        <Header/>
        {props.children}
      </>
    );
  }

export default Layout;
