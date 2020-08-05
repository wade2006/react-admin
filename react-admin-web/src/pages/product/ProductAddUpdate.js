import React, { Component } from 'react'
import {
    Card,
    Form,
    Input,
    Cascader,
    Upload,
    Button, message

} from 'antd'
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkButton from '../../components/link-button/LinkButton'
import { reqCategorys,reqAddOrUpdateProduct, reqAddCategory, reqCategory } from '../../api/index'
import PictruesWall from './PicturesWall';
import RichTextEditor from './RichTextEditor'
import htmlToDraft from 'html-to-draftjs' 
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// const options = [
//     {
//         value: 'zhejiang',
//         label: 'Zhejiang',
//         isLeaf: false,
//     },
//     {
//         value: 'jiangsu',
//         label: 'Jiangsu',
//         isLeaf: false,
//     },
// ];
const Item = Form.Item;
const { TextArea } = Input;
export default class ProductAddUpdate extends Component {

 state = {
        options: [],
    }
    constructor(props) {
        super(props)

        // 创建用来保存ref标识的标签对象的容器
        this.pw = React.createRef()
        this.editor = React.createRef()
    }
    loadData = async selectedOptions => {
        //得到选择的option对象
        const targetOption = selectedOptions[selectedOptions.length - 1];
        //显示loading
        targetOption.loading = true;

        //根据选中的分类，请求获取二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value)
        //隐藏loading
        targetOption.loading = false;

        if (subCategorys && subCategorys.length > 0) {
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))
            targetOption.children = childOptions;
        } else {  //当前选中的分类没有二级分类
            targetOption.isLeaf = true;
        }

        //并更新option状态
        this.setState({
            options: [...this.state.options],
        });
    }
    initOptions = async (categorys) => {
        //根据categorys生成options数组
        const options = categorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false,
        }))

        //如果是一个二级分类商品的更新
        const { isUpdate, product } = this;
        const { pCategoryId, categoryId } = product;
        if (isUpdate && pCategoryId !== '0') {
            //获取对应的二级分类列表
            const subCategorys = await this.getCategorys(pCategoryId)
            //生成二级下拉列表的options
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))
            // 找到当前商品对应的一级option对象
            const targetOption = options.find(option => option.value === pCategoryId)
            // 关联对应的一级option上
            targetOption.children = childOptions
        }

        this.setState({
            options
        })
    }
    //获取一级/二级分类列表显示
    getCategorys = async (parentId) => {
        const result = await reqCategorys(parentId);
        console.log(result);
        if (result.status === 0) {
            const categorys = result.data;
            //如果是一级分类列表
            if (parentId === '0') {
                this.initOptions(categorys);
            } else {   //二级分类列表
                return categorys;  //返回二级列表==》当前async返回的promise就会成功且value就为categorys
            }
        }
    }
    onFinish = async (values) => {
        // 1. 收集数据, 并封装成product对象
        const {name, desc, price, categoryIds} = values
        let pCategoryId, categoryId
        if (categoryIds.length===1) {
          pCategoryId = '0'
          categoryId = categoryIds[0]
        } else {
          pCategoryId = categoryIds[0]
          categoryId = categoryIds[1]
        }
        const imgs = this.pw.current.getImgs()
        const detail = this.editor.current.getDetail()

        const product = {name, desc, price, imgs, detail, pCategoryId, categoryId}

        // 如果是更新, 需要添加_id
        if(this.isUpdate) {
          product._id = this.product._id
        }

        // 2. 调用接口请求函数去添加/更新
        const result = await reqAddOrUpdateProduct(product)

        // 3. 根据结果提示
        if (result.status===0) {
          message.success(`${this.isUpdate ? '更新' : '添加'}商品成功!`)
          this.props.history.goBack()
        } else {
          message.error(`${this.isUpdate ? '更新' : '添加'}商品失败!`)
        }
    }

    //第一次render之前执行
    componentWillMount() {
        //取出携带的state
        const product = this.props.location.state; //如果是添加没值，否则有值
        //保存是否更新的标识
        this.isUpdate = !!product;
        //保存商品(如果没有，保存{})
        this.product = product || {};
    }
    componentDidMount() {
        this.getCategorys('0');
    }
    render() {
        const { isUpdate, product} = this;
        const { pCategoryId, categoryId ,imgs,detail } = product;
        // 用来接收级联分类ID的数组
        const categoryIds = []
        if (isUpdate) {
            // 商品是一个一级分类的商品
            if (pCategoryId === '0') {
                categoryIds.push(categoryId)
            } else {
                // 商品是一个二级分类的商品
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
        }
        //指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 2 }, //左侧label的宽度
            wrapperCol: { span: 8 },//指定右侧包裹宽度
        };
        const title = (<span>
            <LinkButton onClick={() => {
                this.props.history.goBack()
            }}><ArrowLeftOutlined style={{ fontSize: 20 }} /></LinkButton><span>{isUpdate ? '修改商品' : "添加商品"}</span>
        </span>)
        return (
            <Card title={title}>
                <Form {...formItemLayout} onFinish={this.onFinish}>
                    <Item label="商品名称"
                        name="name"
                        initialValue={product.name}
                        rules={[{ required: true, message: '必须输入商品名称' }]}>
                        <Input placeholder="请输入商品名称"></Input>
                    </Item>
                    <Item label="商品描述"
                        name="desc"
                        initialValue={product.desc}
                        rules={[{ required: true, message: '必须输入商品描述' }]}>
                        <TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 6 }}></TextArea>
                    </Item>
                    <Item label="商品价格"
                        name="price"
                        initialValue={product.price}
                        rules={[{ required: true, message: '必须输入商品价格' }, ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (value * 1 > 0) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('价格必须大于0');
                            },
                        }),]}>
                        <Input type="number" addonAfter="元" placeholder="请输入商品价格"></Input>
                    </Item>
                    <Item label="商品分类"
                        name="categoryIds"
                        initialValue={categoryIds}
                        rules={[{ required: true, message: '必须输入商品分类' }]}>
                        <Cascader
                            placeholder="请指定商品分类"
                            options={this.state.options}
                            loadData={this.loadData}
                        />
                    </Item>
                    <Item label="商品图片"
                        name="picture"
                        
                        >
                        <PictruesWall ref={this.pw} imgs={imgs}></PictruesWall>
                    </Item>
                    <Item label="商品详情"
                        name="detail" 
                        labelCol={{ span: 2 }} //左侧label的宽度
                        wrapperCol= {{ span: 18}}
                    >
                       <RichTextEditor ref={this.editor} detail={detail}/>
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Item>

                </Form>
            </Card>
        )
    }
}
