import React, { Component } from 'react'
import "./index.less";
import { reqWeather }from '../../api/index';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig';
import { Modal,  Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {formateDate} from '../../utils/dateUtils'
import LinkButton from '../link-button/LinkButton'


 class Header extends Component {
    
    state={
        date:formateDate(Date.now()),//当前时间字符串
        dayPictureUrl:'',
        weather:'',
    }
    getTime=()=>{
      //每隔一秒获取当前时间
      setInterval(()=>{
        const currentTime=formateDate(Date.now());
        this.setState({
          date:currentTime,
        })
      },1000)
    }
    //第一次render()之后执行
    //一般在此执行异步操作or启动定时器
    componentDidMount(){
      this.getTime();
      this.getWeather();
    
  }
       
        
    
    getWeather = async () => {
      // 调用接口请求异步获取数据
      const {dayPictureUrl, weather} = await reqWeather('南昌')
      // 更新状态
      this.setState({dayPictureUrl, weather})
    }

    getTitle = () => {
        // 得到当前请求路径
        const path = this.props.location.pathname
       
        let title
        menuList.forEach(item => {
          if (item.key===path) { // 如果当前item对象的key与path一样,item的title就是需要显示的title
            title = item.title
          } else if (item.children) {
            // 在所有子item中查找匹配的
            const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
            // 如果有值才说明有匹配的
            if(cItem) {
              // 取出它的title
              title = cItem.title
            }
          }
        })
        return title
      }

      /*退出登录 */
      logout=()=>{
        Modal.confirm({
          title: '确定退出吗?',
          icon: <ExclamationCircleOutlined />,
        
          onOk:()=>{
            storageUtils.removeUser();
            memoryUtils.user={};
            this.props.history.replace('/login');
          },
          onCancel() {console.log('退出')},
        });
      }
    render() {
      const {date,dayPictureUrl,weather}=this.state;
        const username=memoryUtils.user.username;
        const title=this.getTitle();
        return (
            <div className="header">
               <div className="header-top">
                   <span>欢迎，{username}</span>
                   <LinkButton  onClick={this.logout}>退出</LinkButton>
                   </div>
               <div className="header-bottom">
                <div className="header-bottom-left">{title}</div>   
                <div className="header-bottom-right">
        <span>{date}</span>
        <img src={dayPictureUrl} alt=""></img> 
       <span>{weather}</span>
                    
                    </div>   
               </div>
            </div>
        )
    }
}

export default  withRouter(Header);