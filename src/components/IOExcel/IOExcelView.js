import React, {Component} from 'react';
import {Card, Upload, Button, Icon, message, Form} from 'antd';
import Style from './IOExcelView.less';
import * as RecruitApi from '../../services/RecruitApi';
import {isSuccess} from "../../utils/utils";

const MEG_SHOW_DURATION_SECOND = 2;

class IOExcelView extends Component {
  static defaultProps = {
    tempUrl:undefined
  };

  state = {
    fileList: null,
    uploading: false,
    downloading:false,
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
      if(isSuccess(response)) {
        that.setState({
          fileList: null
        });
        message.success(`《${title}》表格导入成功`, MEG_SHOW_DURATION_SECOND);
      } else {
        message.error(`《${title}》表格导入失败: ${response.msg}`, MEG_SHOW_DURATION_SECOND);
      }
      that.setState({
        uploading: false,
      });

    }).catch(function (error) {
      message.error(`《${title}》表格导入失败`, MEG_SHOW_DURATION_SECOND);
      that.setState({
        uploading: false,
      });
    });

  };

  exportTemplate=()=>{
    const {tempUrl} = this.props;
    this.setState({
      downloading:true,
    })
    RecruitApi.exportTemplate(tempUrl).then(res=> {
      this.setState({
        downloading: false,
      });
    }).catch(error=> {
      this.setState({
        downloading: false,
      });
      message.error(' 导出数据表格失败 error: ' + JSON.stringify(error));
    });
  }

  render() {
    const that = this;
    const { title, url,tempUrl} = this.props;
    const {uploading, fileList,downloading} = this.state;
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

            <div className={Style.row} style={{marginTop: 16}}>
              <Button
                type="primary"
                onClick={this.handleUpload}
                loading={uploading}
              >
                {uploading ? 'Uploading' : 'Start Upload'}
              </Button>

              {
                tempUrl&&
                <Button
                  style={{marginLeft:15}}
                  type="dashed"
                  loading={downloading}
                  onClick={()=>this.exportTemplate()}
                >
                  File template
                </Button>
              }
            </div>

          </div>
        </div>

      </Card>


    );
  }

}

export default IOExcelView;
