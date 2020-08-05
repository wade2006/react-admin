import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import ProductHome from './ProductHome'
import ProductDetail from './ProductDetail'
import ProductAddUpdate from './ProductAddUpdate'
import  './product.less';



/*
商品路由
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path='/product' component={ProductHome} exact/> {/*路径完全匹配*/}
        {/* <Route path='/product/addupdate' component={ProductAddUpdate}/> */}
        <Route path='/product/detail' component={ProductDetail}/>
        <Route path='/product/addupdate' component={ProductAddUpdate}/>
        <Redirect to='/product'/>
      </Switch>
    )
  }
}