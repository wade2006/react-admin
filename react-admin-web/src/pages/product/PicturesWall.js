import React, {Component} from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqDeleteImg} from '../../api'
import propTypes from 'prop-types';
import {BASE_IMG_URL} from '../../utils/constans'


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
//用于图片上传的组件
class PicturesWall extends React.Component {
   
  state = {
    previewVisible: false,  //标识是否显示大图预览Modal
    previewImage: '',
    previewTitle: '',
    fileList: [
    //   {
    //     uid: '-1', //每个file都有自己唯一的id
    //     name: 'image.png',  //图片文件名
    //     status: 'done',    //图片状态 状态有：uploading done error removed  
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', //图片地址
    //   },
    //   {
    //     uid: '-2',
    //     name: 'image.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   },
     
    //   {
    //     uid: '-5',
    //     name: 'image.png',
    //     status: 'error',
    //   },
    ],
  };

  constructor (props) {
    super(props)

    let fileList = []

    // 如果传入了imgs属性
    const {imgs} = this.props
    if (imgs && imgs.length>0) {
      fileList = imgs.map((img, index) => ({
        uid: -index, // 每个file都有自己唯一的id
        name: img, // 图片文件名
        status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
        url: BASE_IMG_URL + img
      }))
    }

    // 初始化状态
    this.state = {
      previewVisible: false, // 标识是否显示大图预览Modal
      previewImage: '', // 大图的url
      fileList // 所有已上传图片的数组
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });//隐藏modal

  //显示指定file对应的大图
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  }; 

  //获取所有已上传图片文件名的数组
  getImgs=()=>{
      return this.state.fileList.map(file=> file.name)
  }

  //fileList:所有已上传图片的数组
  //file:当前操作的图片文件
  handleChange =async ({file, fileList }) =>{
    //   console.log("handleChange==>",file.status,file);

      //一旦上传成功，将当前上传的file的信息修正(name，url)
      if(file.status==="done"){
          const result =file.response
          if(result.status===0){
              message.success('上传图片成功')
              const {name,url}=result.data;
              const file=fileList[fileList.length-1];
              file.name=name;
              file.url=url;
          }else{
            message.success('上传图片失败')
          }
      } else if (file.status==='removed') { // 删除图片
        const result = await reqDeleteImg(file.name)
        if (result.status===0) {
          message.success('删除图片成功!')
        } else {
          message.error('删除图片失败!')
        }
      }
      //在操作(上传/删除)过程中更新fileList状态
    this.setState({ fileList })
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload" //上传图片的接口地址
          accept="image/*"   //只接收图片格式
          listType="picture-card"
          name="image"
          fileList={fileList} //所有已上传图片文件对象的数组
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;
/*
1. 子组件调用父组件的方法: 将父组件的方法以函数属性的形式传递给子组件, 子组件就可以调用
2. 父组件调用子组件的方法: 在父组件中通过ref得到子组件标签对象(也就是组件对象), 调用其方法
 */

/*
使用ref
1. 创建ref容器: thi.pw = React.createRef()
2. 将ref容器交给需要获取的标签元素: <PictureWall ref={this.pw} />
3. 通过ref容器读取标签元素: this.pw.current
 */