import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Modal, Popconfirm, Divider, message, Button,Input,Upload, Icon, } from 'antd';
import * as Data from '../../data/data';
import Style from '../../css/common.less';
import * as RecruitApi from '../../services/RecruitApi';
import PaginationTable from "../../components/PaginationTable/PaginationTable";


class BannerListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        key: '1',
        url: 'www.baidu.com',

      },
      ],
      loading: false,
      currIndex: 1,
      isShowDialog: false,
      info: {},
      visible: false,
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const {selectedRowKeys, onEditClick, onDelClick, onPageChange} = this.props;
    let {data, loading, isShowDialog, info} = this.state;
    const {list} = this.props;
    const columns = [
      {
        title: '图片',
        align: 'center',
        dataIndex: 'url',
        render: (val, record, index) => (<img className={Style.listItemIcon} src={val} alt="暂无图片"/>)
      },
      {
        title: '链接类型',
        align: 'center',
        dataIndex: 'actionType',
        render: (val, record) => (<text>{Data.BANNER_ACTION_TYPE_TITLE[record.actionType]}</text>),

      },
      {
        title: '链接值',
        align: 'center',
        dataIndex: 'actionValue',
        render: (val, record) => (<text>{this.getActionValueTip(record)}</text>),
      },
      {
        title: '状态',
        align: 'center',
        dataIndex: 'visible',
        render: (val, record) => (<text>{record.visible ? '启用' : '禁用'}</text>),
      },
      {
        title: '操作',
        dataIndex: 'operate',
        align: 'center',
        render: (val, record) => (<div>
            <Button className={Style.commonBtn} onClick={() => onEditClick(record)} type="normal"
                    shape="circle" icon="edit"/>

            <Popconfirm title="是否要删除该广告？"
                        onConfirm={() => {
                          onDelClick(record.id)
                        }}
                        okText="确定" cancelText="取消">
              <Button type="normal" shape="circle" icon="delete"/>
            </Popconfirm>

          </div>
        ),
      },
    ];
    return (
      <div>
        <div className={Style.commonBtnLayout}>
          <Button className={Style.commonBtn} type="primary" onClick={() => {
            this.refreshList()
          }}>刷新</Button>
          <Button className={Style.commonBtn} type="primary" onClick={() => {
            this.showModal();
          }}>添加</Button>
        </div>
        <Modal
          title="添加广告"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <div style={{padding:30  }} >   广告图片： <Input  style={{ width: 200 }} type="text"/></div>
         <div  style={{paddingLeft:60}}> <Avatar /></div>
          电话： <Input type="text"/>

          联系： <Input type="text"/>
          <Input type="text"/>
          <Input type="text"/>
          <Input type="text"/>
          <Input type="text"/>
        </Modal>
        <PaginationTable
          dataSource={data}
          loading={loading}
          columns={columns}
          onPageChange={(page, pageSize) => {
            this.onPageChange(page, pageSize)
          }}
        />
      </div>
    );
  }

  onChange(type, value) {

  }

  onPageChange(page, pageSize) {
    this.setState({
      currIndex: page
    }, () => {
      this.refreshList();
    });
  }

  refreshList() {
    let info = {
      pageIndex: this.state.currIndex,
      pageSize: Data.PAGINATION_INFO.pageSize
    };

    RecruitApi.listBanner(info, (resp) => {
      this.setState({
        data: resp.data,
      });
    }, (error) => {
      message.error('获取Banner失败: ' + JSON.stringify(error));
    });
  }

  getActionValueTip(banner) {
    let type = banner.actionType;
    let value = banner.actionValue;
    if (Data.BANNER_ACTION_TYPE_SCENE === type) {
      return Data.BANNER_ACTION_TYPE_SCENE_TITLES.get(value);
    } else if (Data.BANNER_ACTION_TYPE_ARTICLE === type) {
      return `文章id:${value}`
    } else {
      return '--'
    }
  }
}
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Avatar extends React.Component {
  state = {
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}
export default BannerListView;
