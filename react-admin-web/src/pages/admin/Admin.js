import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav/LeftNav'
import Header from '../../components/header/Header'
import Home from '../home/Home'
import Category from '../category/Category'
import User from '../user/User'
import Role from '../role/Role'
import Bar from '../charts/Bar'
import Pie from '../charts/Pie'
import Line from '../charts/Line'
import Product from '../product/Product'
import NotFound from '../not-found/not-found'
const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    //如果内存没有存储user===》当前没有登录
    if (!user || !user._id) {
      return <Redirect to="/login" />
    }
    return (

      <Layout style={{ height: 937 }}>
        <Sider><LeftNav /></Sider>
        <Layout>
          <Header />
          <Content style={{ margin: '20px', backgroundColor: 'white' }}>
            {/* <Route path='/home' component={Home} />
            <Route path='/category' component={Category} />
            <Route path='/product' component={Product} />
            <Route path='/role' component={Role} />
            <Route path='/user' component={User} />
            <Route path='/bar' component={Bar} />
            <Route path='/line' component={Line} />
            <Route path='/pie' component={Pie} /> */}

            <Switch>
              <Redirect from='/' exact to='/home' />
              <Route path='/home' component={Home} />
              <Route path='/category' component={Category} />
              <Route path='/product' component={Product} />
              <Route path='/user' component={User} />
              <Route path='/role' component={Role} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/pie" component={Pie} />
              <Route path="/charts/line" component={Line} />
              <Route component={NotFound}></Route>   
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: "rgb(204, 204, 204)" }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>

    )
  }
}
