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
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Head>
        <Header/>
        {props.children}
      </>
    );
  }

export default Layout;
