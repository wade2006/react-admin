import React, { Component } from 'react'
import  './login.less';
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from './images/logo2.png';
import {reqLogin}  from '../../api/index'
import {message} from 'antd' 
import  memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils.js'
import {Redirect} from 'react-router-dom'


 class Login extends Component {
    onFinish= async (values)=>{
            const {username,password}=values;
            debugger
            const res=await reqLogin(username,password);
            if(res.status===0){
               message.success('登录成功!')
                  //保存user
                  const user=res.data;
                  memoryUtils.user=user;
                  storageUtils.saveUser(user);//保存到local中去

                 //跳转到管理界面(用replace不需要再回退回来)
                 this.props.history.replace("/home");
             }
             else{
                 message.error(res.msg);
                 
             }
        // reqLogin(username,password).then((res)=>{
        //     console.log(res);
        //    if(res.status===0){
        //      message.success('登录成功!')
        //         //保存user
        //         const user=res.data;
        //         memoryUtils.user=user;
        //         storageUtils.saveUser(user);//保存到local中去
        //        //跳转到管理界面(用replace不需要再回退回来)
        //        this.props.history.push("/home");
        //    }
        //    else{
        //        message.error(res.msg);
               
        //    }
            
        // }).catch((err)=>{
        //     console.log("请求失败");
            
        // })
    }
   
   
    render() {
        // 如果用户已经登陆, 自动跳转到后台管理界面
    const user = memoryUtils.user
    if(user && user._id) {
      return <Redirect to='/'/>
    }

       
        return (
            <div className="login" >
              
               <header className="login-header">
                   <img alt="" src={logo}></img>
                   <h1>React项目: 后台管理系统</h1>
               </header>
               <section className="login-content">
                   <h3>后台管理平台</h3>
                   { /*
          用户名/密码的的合法性要求
            1). 必须输入
            2). 必须大于等于4位
            3). 必须小于等于12位
            4). 必须是英文、数字或下划线组成
           */ }
               
                <Form
                 name="normal_login"
                 className="login-form"
                 initialValues={{
                   remember: true,
                 }}
                 onFinish={this.onFinish}
     
    >
      <Form.Item
      name="username"
      rules={[
          
        {
          required: true,
          message: '请输入你的用户名!',
        },
        {
         min: 4,
          message: '用户名至少4位',
        },
        {
         max: 12,
          message: '用户名最多12位',
        },
        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
      ]}
       
      >
        <Input className="input" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入你的密码！',
          },
          {
            min: 4,
             message: '密码至少4位',
           },
           {
            max: 12,
             message: '密码最多12位',
           },
           { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成' },
        ]}
       
      >
        <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
    

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form> </section>
            </div>
        )
    }
}
/*
async和await
1. 作用?
   简化promise对象的使用: 不用再使用then()来指定成功/失败的回调函数
   以同步编码(没有回调函数了)方式实现异步流程
2. 哪里写await?
    在返回promise的表达式左侧写await: 不想要promise, 想要promise异步执行的成功的value数据
3. 哪里写async?
    await所在函数(最近的)定义的左侧写async
 */


export default Login;