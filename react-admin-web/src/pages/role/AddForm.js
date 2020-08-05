import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Select,
    Input,
  } from 'antd'
  

export default class AddForm extends Component {
    static propTypes = {
        // setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
      
      }
      getInputvalue=(e)=>{
       
        this.setState({
            msg:e.target.value,
        })
      
       
    }
    render() {
        return (
            <Form>  
                <Form.Item name="roleName" label="角色名称">  
            <Input rules={[{ required: true,message:'分类名称必须输入' }]} onChange={this.getInputvalue}  placeholder='请输入分类名称'></Input>
          </Form.Item></Form>
           
           
        )
    }
}
