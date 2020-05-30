import React, {Component} from 'react';
import {connect} from 'dva';
import fetch from 'dva/fetch';
import {Card, Upload, Button, Icon, message, Form} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Style from './IOExcelView.less';
import * as RecruitApi from '../../services/RecruitApi';
import * as HTTPCode from '../../utils/HTTPCode';

const MEG_SHOW_DURATION_SECOND = 2;

class IOExcelView extends Component {

  state = {
    fileList: null,
    uploading: false,
  };

  handleUpload = () => {
    const that = this;
    const { title, url } = this.props;
    const {fileList} = this.state;
    if(fileList === null) {
      message.error(`导入失败：《${title}》表格未选择`, MEG_SHOW_DURATION_SECOND);
      return;
    }
    const formData = new FormData();
    formData.append('file', fileList);
    this.setState({
      uploading: true,
    });

    RecruitApi.importExcelFile(url, formData).then(function (response) {
      let code = response.meta.code;

      if(HTTPCode.CODE_OK === code) {
        message.success(`《${title}》表格导入成功`, MEG_SHOW_DURATION_SECOND);
      } else {
        message.error(`《${title}》表格导入失败 resultCode: ` + code + ", msg: " + response.response, MEG_SHOW_DURATION_SECOND);
      }
      that.setState({
        uploading: false,
      });

    }).catch(function (error) {
      that.setState({
        uploading: false,
      });

    });

  };

  render() {
    const that = this;
    const { title, url} = this.props;
    const {uploading, fileList} = this.state;
    const props = {
      onRemove: file => {
        this.setState({
          fileList: null
        });
      },
      beforeUpload: file => {
        this.setState({
          fileList: file,
        });
        return false;
      },
      accept: '.xls,.xlsx,.odt',
    };

    return (
      <Card type="inner" className={Style.itemCard} bordered={true}>

        <div className={Style.cardChild}>
          {title}:
          <div className={Style.uploadLayout}>
            <Upload {...props}>
              <Button>
                <Icon type="upload"/> Select File
              </Button>
            </Upload>
            <Button
              type="primary"
              onClick={this.handleUpload}
              loading={uploading}
              style={{marginTop: 16}}
            >
              {uploading ? 'Uploading' : 'Start Upload'}
            </Button>

          </div>
        </div>

      </Card>


    );
  }

}

export default IOExcelView;
