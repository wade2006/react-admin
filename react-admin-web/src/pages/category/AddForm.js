import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Select,
    Input,
  } from 'antd'
  


const { Option } = Select;

export default class AddForm extends Component {
    static propTypes = {
        // setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
        categorys: PropTypes.array.isRequired, // 一级分类的数组
        parentId: PropTypes.string.isRequired, // 父分类的ID
      }
      getInputvalue=(e)=>{
       
        this.setState({
            msg:e.target.value,
        })
      
       
    }
    render() {
        const {categorys,parentId} =this.props;
        return (
           <Form>
             <Form.Item name="parentId" initialValue={parentId}>  

                 <Select>
                   <Option value='0'>一级分类</Option>
        {categorys.map((v,k)=><Option key={k} value={v._id}>{v.name}</Option>)}
                </Select></Form.Item>
              <Input onChange={this.getInputvalue}  placeholder="请输入"></Input>
           </Form>
        )
    }
}
