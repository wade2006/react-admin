import React, { Component } from 'react'
import {
    Card,
    Select,
    Button,
    Input,
    Table,message
} from 'antd'
import {PlusOutlined  } from '@ant-design/icons';
import LinkButton from '../../components/link-button/LinkButton'
import {reqProducts, reqSearchProducts, reqUpdateStatus} from '../../api'
import { PAGE_SIZE } from '../../utils/constans'
const Option = Select.Option;

export default class ProductHome extends Component {
    state={
        products:[],
        total:'',
        loading:false,
        searchName:'',
        searchType:'productName'
    }
    initColumns=()=>{
       this.columns = [
            {width:100,
              title: '商品名称',
              dataIndex: 'name',
             
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
             
            },
            {
              title: '价格',
              dataIndex: 'price',
              render:(price)=> '￥'+price //当前指定了对应的属性，传入的是对应的属性值。
             
            },
            {width:100,
              title: '状态',
              // dataIndex: 'status',
              render:(product)=> {
                const {status,_id}=product;
                const newstatus=status===1?2:1;
                  return (
                    <span>
                      <Button type="primary"
                      onClick={()=>{this.updateStatus(_id,newstatus)}}
                      
                      >{status===1?"下架":"上架"}</Button>
                  <span>{status===1?"在售":"已下架"}</span>
                    </span>
                  )
              } 
             
            },
            {width:100,
              title: '操作',
            
              render:(product)=>
              {
                  return (
                      <span>
                        {/* 将product对象使用state传给目标路由组件 */}
                     <LinkButton onClick={()=>{this.props.history.push('/product/detail/',{product})}}>详情</LinkButton>
                     <LinkButton onClick={()=>{this.props.history.push('/product/addupdate/',product)}}>修改</LinkButton>
                      </span>
                  )
              }
             
            },
          ];
    }
    /*
  获取指定页码的列表数据显示
   */
  getProducts = async (pageNum) => {
    this.pageNum=pageNum;//保存pageNum，让其他方法可以看得见
    this.setState({loading:true});

     const {searchName,searchType}=this.state;
     let result;
     if (searchName) {
       result = await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
      } else { // 一般分页请求
       result = await reqProducts(pageNum, PAGE_SIZE)
      } 

      //取出分页数据，显示分页列表
    if(result.status===0){
        const{total,list}=result.data;
        this.setState({
            total:total,
            products:list
        })
    }
    this.setState({loading:false});
  }
   /*
  更新指定商品的状态
   */
  updateStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status)
    if(result.status===0) {
      message.success('更新商品成功')
      this.getProducts(this.pageNum)
    }
  }


    componentWillMount(){
        this.initColumns();
    }
  
    componentDidMount(){
        this.getProducts(1);
    }
    render() {
         //取出数据
         const {products,total,loading,searchName,searchType}=this.state
        
        const title=(
            <span><Select 
            value={searchType} 
            style={{width:150}}
            onChange={value=>{this.setState({searchType:value})}}
            >
            <Option value='productName'>按名称搜索</Option>
            <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input placeholder="请输入关键字" style={{width:200,margin:'0 15px'}} value={searchName}
         onChange={event=>{this.setState({searchName:event.target.value})}}
        ></Input>
          <Button type="primary" onClick={()=>this.getProducts(1)}> 搜索</Button>
        </span>
        )

        const extra=(<Button onClick={()=>{this.props.history.push('/product/addupdate')}} type='primary'><PlusOutlined /><span>添加商品</span></Button>)
        

        return (
           <Card title={title} extra={extra}
           >
           <Table 
           loading={loading}
           pagination={{
             current:this.pageNum,
             defaultPageSize:PAGE_SIZE,
            showQuickJumper:true,
            total,
            onChange:this.getProducts,
            
        }} 
           bordered={true} 
           rowKey='_id'  
           dataSource={products} 
           columns={this.columns}/>

           </Card>
        )
    }
}
