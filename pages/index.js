import { Component } from "react";
import Error from "../src/UI/component/_error";
import "isomorphic-fetch";
import Layout from "../src/UI/component/Layout";
import ChannelGrid from "../src/UI/component/ChannelGrid";

class Home extends Component {
  static async getInitialProps({ res }) {
    try {
      let req = await fetch("https://api.audioboom.com/channels/recommended");
      let { body: channels } = await req.json();
      return { channels, statusCode: 200 };
    } catch (e) {
      res.statusCode = 503;
      return { channels: null, statusCode: 503 };
    }
  }

  render() {
    const { channels, statusCode } = this.props;
    if (statusCode != 200) {
      return <Error statusCode={statusCode} />;
    }

    return (
      <Layout title="Sprotify">
        <ChannelGrid channels={channels}/>
      </Layout>
    );
  }
}

export default Home;
