import React, { Component } from 'react';
//import './App.css';

import Header from './App/TopNav';
import Footer from './App/Footer';
import Content from './App/Content';


import { Layout } from 'antd';

class App extends Component {

  render() {

    return (
      <Layout>
        <Header />
        <Content />
        <Footer />
      </Layout>
    );
  }
}

export default App;
