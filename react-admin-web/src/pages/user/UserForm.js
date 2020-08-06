import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Select,
    Input,
  } from 'antd'
  const Option=Select.Option;

export default class UserForm extends PureComponent {
    static propTypes = {
        // setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
      
      }
      getInputvalueU=(e)=>{
       
        this.setState({
            username:e.target.value,
        })  
    }
      getInputvalueP=(e)=>{
       
        this.setState({
            password:e.target.value,
        })  
    }
      getInputvaluePhone=(e)=>{
       
        this.setState({
            phone:e.target.value,
        })  
    }
  
      getInputvalueE=(e)=>{
       
        this.setState({
            email:e.target.value,
        })  
    }
      getInputvalueR=(value)=>{
       
        this.setState({
            role_id:value,
        })  
    }
  
    


    render() {
      const {roles,user}=this.props;
        return (
            <Form onFinish={this.onFinish}>  
                <Form.Item initialValue={user.username} name="username" label="用户名">  
            <Input rules={[{ required: true,message:'用户名必须输入' }]}  onChange={this.getInputvalueU}   placeholder='请输入用户名'></Input>
          </Form.Item>
         {user._id?null: <Form.Item initialValue={user.password}  name="password" label="&nbsp;&nbsp;&nbsp;&nbsp;密码">  
           <Input  type="password" rules={[{ required: true,message:'密码必须输入' }]}  onChange={this.getInputvalueP} placeholder='请输入密码'></Input>
          </Form.Item>}
                <Form.Item initialValue={user.phone} name="phone" label="手机号">  
            <Input rules={[{ required: true,message:'手机号必须输入' }]}  onChange={this.getInputvaluePhone} placeholder='请输入手机号'></Input>
          </Form.Item>
                <Form.Item initialValue={user.email} name="email" label="&nbsp;&nbsp;&nbsp;&nbsp;邮箱">  
            <Input rules={[{ required: true,message:'邮箱必须输入' }]} onChange={this.getInputvalueE}  placeholder='请输入邮箱'></Input>
          </Form.Item>
          
                <Form.Item initialValue={user.role_id} name="role_id" label="&nbsp;&nbsp;&nbsp;&nbsp;角色">  
            <Select  onChange={this.getInputvalueR}>
              {
                roles.map((role)=> <Option  key={role._id} value={role._id}>{role.name}</Option>)
              }
          
            </Select>
          </Form.Item>
          
          
          
          </Form>
           
           
        )
    }
}
