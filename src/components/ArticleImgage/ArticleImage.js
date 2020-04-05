import React, {Component} from 'react';

import {Upload, Icon, Modal, message} from 'antd';
import Style from './ArticleImage.less';
import * as IOApi from '../../services/AppApi';
import * as AppInfo from '../../utils/AppInfo';
import * as HTTPCode from '../../utils/HTTPCode';
import {isEmpty} from '../../utils/utils';


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


export default class ArticleImage extends Component {
  constructor(props) {
    super();

    const url = props.url;
    const fileList = isEmpty(url) ? [] : [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: url,
      }
    ];

    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: fileList
    };
  }

  componentWillReceiveProps(nextProps) {
    const newUrl = nextProps.url;
    const fileList = isEmpty(newUrl) ? [] : [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: newUrl,
      }
    ];

    this.setState({
      fileList
    });
  }


  handleCancel = () => this.setState({previewVisible: false});

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({fileList}) => this.setState({fileList});

  uploadFile(fileList) {
    const {onUrlChange} = this.props;
    const that = this;
    const formData = new FormData();
    formData.append('image', fileList);
    IOApi.importExcelFile(AppInfo.IMAGE_UPLOAD, formData).then(function (response) {
      let code = response.meta.code;

      if (HTTPCode.CODE_OK === code) {
        console.info(' article image upload sucess : ' + JSON.stringify(response));
        onUrlChange(response.response);
      } else {
        console.error(`image upload resultCode: ` + code + ", msg: " + response.response, 3);
      }
    }).catch(function (error) {

    });
  }

  render() {
    const that = this;
    const {onUrlChange} = this.props;
    const props = {
      onRemove: file => {
        onUrlChange("");
        this.setState({
          fileList: [],
        });

      },
      beforeUpload: file => {
	      console.log(' bingo image: ' + this.state.fileList)
        this.setState({
          fileList: file,
        }, function () {
	        that.uploadFile(file)
        });
        return false;
      },
      accept: '.jpg,.jpeg,.png',
    };

    const {previewVisible, previewImage, fileList} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className={Style.antUploadText}>Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          {...props}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{width: '100%'}} src={previewImage}/>
        </Modal>
      </div>
    );
  }
}
