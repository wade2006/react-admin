import React, { Component } from 'react'
import {
    Form,
    Input,
    message
  } from 'antd'
  import PropTypes from 'prop-types'

export default class UpdateForm extends Component {
    // static propTypes={
    //     categoryName:PropTypes.string.isRequired
    // }
   constructor(props){
       super(props);
       this.state={
           msg:'',
       }
   }
    getInputvalue=(e)=>{
       
        this.setState({
            msg:e.target.value,
        })
      
       
    }
    render() {
         const {categoryName}=this.props;
        return (
            
            
        <Input rules={[{ required: true,message:'分类名称必须输入' }]} onChange={this.getInputvalue} defaultValue={categoryName} placeholder='请输入分类名称'></Input>
          
        )
    }
}
