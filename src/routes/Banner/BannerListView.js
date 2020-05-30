import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from "./style.less";
import * as Data from '../../data/data';
import PaginationTable from '../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../services/RecruitApi';
import {isEmpty} from '../../utils/utils';
import EditView from '../Banner/EditView';


class BannerListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      currIndex: 1,
      pageSize: Data.PAGINATION_INFO.pageSize,
      isShowDialog: false,
      info: {}
    };
  }

  componentWillMount() {
    this.refreshList();
  }

  refreshList() {
    let info = {
      pageIndex: this.state.currIndex,
      pageSize: this.state.pageSize,
    };

    RecruitApi.listBanner(info, (resp)=> {
      this.setState({
        data: resp.data
      });
    }, (error)=> {
      message.error('反馈数据获取失败: ' + JSON.stringify(error))
    });
  }

  render() {
    let {data, loading, isShowDialog, info} = this.state;

    const columns = [
      {
        title: '内容',
        align: 'center',
        dataIndex: 'desc'
      },
      {
        title: '图片',
        align: 'center',
        dataIndex: 'image',
        render: (val, record, index) => (<img className={Style.listItemIcon} src={val} alt="暂无图片"/>)
      },
      {
        title: ' 跳转链接',
        align: 'center',
        dataIndex: 'url',
        render: (val, record, index) => (<a href={val} target={'_blank'}>点击跳转</a>)
      },
      {
        title: '操作',
        align: 'center',
        dataIndex: 'id',
        render: (val, record) => (<div>
            <Button className={Style.mainOperateBtn}  onClick={() => this.onEdit(record)} type="normal" shape="circle" icon="edit"/>

            <Popconfirm title="是否要删除该广告？"
                        onConfirm={() => {
                          this.onDelClick(record.id)
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
        {isShowDialog &&
        <Modal
          style={{marginBottom: '30rem'}}
          destroyOnClose="true"
          width={1200}
          title={isEmpty(info) ? '新增广告' : '编辑广告'}
          onCancel={() => this.onDialogDismiss()}
          visible={true}
          footer={null}
        >
          <EditView
            info={info}
            onDialogDismiss={()=> this.onDialogDismiss(true)}
          />
        </Modal>
        }

        <div className={Style.btnLayout}>
          <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
            this.refreshList()
          }}>刷新</Button>
          <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
            this.onEdit(null)
          }}>添加</Button>
        </div>

        <PaginationTable
          dataSource={data}
          loading={loading}
          columns={columns}
          onPageChange={(page, pageSize)=> {
            this.onPageChange(page, pageSize)
          }}
        />

      </div>);
  }

  onPageChange(page, pageSize) {
    this.setState({
      currIndex: page.current,
      pageSize: page.pageSize,
    }, ()=> {
      this.refreshList();
    });
  }

  onEdit(info) {
    this.setState({
      info: info,
      isShowDialog: true,
    });
  }

  onDelClick(id) {
    RecruitApi.deleteBanner(id, (resp)=> {
      message.success('删除广告成功');
      this.refreshList();
    }, (error)=> {

    });
  }
  onDialogDismiss(showRefresh= false) {
    this.setState({
      isShowDialog: false
    }, () => {
      if(showRefresh) {
        this.refreshList();
      }
    })
  }

}

export default BannerListView;
