import React, { Component } from 'react'
import './index.less'
import logo from './images/logo2.png'
import {Link,withRouter} from 'react-router-dom'
import { Menu} from 'antd';
import menuList from '../../config/menuConfig'
import memoryUtils from "../../utils/memoryUtils";
const { SubMenu } = Menu;
 class LeftNav extends Component {
    state = {
        collapsed: false,
      };
    
      toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
        
       /*
  判断当前登陆用户对item是否有权限
   */
  hasAuth = (item) => {
    const {key, isPublic} = item

    const menus = memoryUtils.user.role.menus
    const username = memoryUtils.user.username
    /*
    1. 如果当前用户是admin
    2. 如果当前item是公开的
    3. 当前用户有此item的权限: key有没有menus中
     */
    if(username==='admin' || isPublic || menus.indexOf(key)!==-1) {
      return true
    } else if(item.children){ // 4. 如果当前用户有此item的某个子item的权限
      return !!item.children.find(child =>  menus.indexOf(child.key)!==-1)
    }

    return false
  }

      getMenuNodes=(menuList)=>{
          //得到当前请求的路由路径
        return menuList.map((item)=>
        {
          if(this.hasAuth(item)){
            //如果当前用户有item对应的权限，才需要显示对应的菜单项
          if(!item.children) {
            return (
              <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.key}>{item.title}</Link>
             </Menu.Item>
            )
          } else {
            //查找与当前路径匹配的子item
            return (
              <SubMenu key={item.key} icon={item.icon} title={item.title}>
                {this.getMenuNodes(item.children)}
            </SubMenu>
            )
          }
    
          }
        })
      }
     
    render() {
      const menuNodes=this.getMenuNodes(menuList);
      
      //得到当前请求的路由路径
      const path=this.props.location.pathname;

      const openKey=this.openKey;
        return (
            <div className="left-nav">
               <header className="left-nav-header">
                   <img  src={logo} alt=""></img>
                   <h1>后台管理</h1>
               </header>
               <div style={{ width: 200 }}>
        
        <Menu
         
          mode="inline"
          theme="dark"

          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
        >
            {menuNodes}
        
        </Menu>
      </div>
            </div>
        )
    }
}
export default withRouter(LeftNav);