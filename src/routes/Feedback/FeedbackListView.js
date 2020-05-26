import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Select, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from "./style.less";
import * as Data from '../../data/data';
import PaginationTable from '../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../services/RecruitApi';
import {isEmpty} from "../../utils/utils";
import EditView from "../Feedback/EditView";


class FeedbackListView extends Component {
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
      pageSize: this.state.pageSize
    };

    RecruitApi.listFeedback(info, (resp) => {
      for (let i = 0; i < resp.data.records.length; i++) {
        if (resp.data.records[i].state === 1) {
          let deal = {status: '已处理'}
          resp.data.records[i] = Object.assign(resp.data.records[i], deal,);
        } else {
          let deal = {status: '未处理'}
          resp.data.records[i] = Object.assign(resp.data.records[i], deal,);
        }
      }
      this.setState({
        data: resp.data,
      });
      // alert(JSON.stringify(resp.data))
    }, (error) => {
      message.error('反馈数据获取失败: ' + JSON.stringify(error))
    });
  }

  render() {
    let {data, loading, isShowDialog, info} = this.state;

    const columns = [
      {
        title: '内容',
        align: 'center',
        dataIndex: 'content'
      },
      {
        title: '图片',
        align: 'center',
        dataIndex: 'image',
        render: (val, record, index) => (<img className={Style.listItemIcon} src={val} alt="暂无图片"/>)
      },
      {
        title: '处理状态',
        align: 'center',
        dataIndex: 'status',
      },
      {
        title: '操作',
        align: 'center',
        dataIndex: 'id',
        render: (val, record) => (<div>
            <Button className={Style.mainOperateBtn} onClick={() => this.onEdit(record)} type="normal" shape="circle"
                    icon="edit"/>

            <Popconfirm title="是否要删除该关于？"
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
          width={820}
          title={isEmpty(info) ? '新增反馈' : '编辑反馈'}
          onCancel={() => this.onDialogDismiss()}
          visible={true}
          footer={null}
        >
          <EditView
            info={info}
            onDialogDismiss={() => this.onDialogDismiss(true)}
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

        <Select
          style={{width: 200, marginBottom: 20, marginTop: 10}}
          placeholder="选择范围"
          optionFilterProp="children"
          onChange={(value) => this.onChange(value)}
        >
          <Select.Option value="全部">全部</Select.Option>
          <Select.Option value="已处理">已处理</Select.Option>
          <Select.Option value="未处理">未处理</Select.Option>
        </Select>

        <PaginationTable
          dataSource={data}
          loading={loading}
          columns={columns}
          onPageChange={(page, pageSize) => {
            this.onPageChange(page, pageSize)
          }}
        />

      </div>);
  }

  onPageChange(page, pageSize) {
    this.setState({
      currIndex: page.current,
      pageSize: page.pageSize
    }, () => {
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
    RecruitApi.deleteFeedback(id, (resp) => {
      message.success('删除反馈成功');
      this.refreshList();
    }, (error) => {

    });
  }

  onDialogDismiss(showRefresh = false) {
    this.setState({
      isShowDialog: false
    }, () => {
      if (showRefresh) {
        this.refreshList();
      }
    })
  }

  onChange(value) {
    console.log(`selected ${value}`);
    if (value === "已处理") {
      this.refreshListFilter();
    }
    if (value === "未处理") {
      this.refreshUnListFilter();
    }
    if (value === "全部") {
      this.refreshList();
    }
  }
  refreshUnListFilter() {
    let info = {
      pageIndex: this.state.currIndex,
      pageSize: this.state.pageSize,
      state: 0
    };

    RecruitApi.listFeedback(info, (resp) => {
      for (let i = 0; i < resp.data.records.length; i++) {
        if (resp.data.records[i].state === 1) {
          let deal = {status: '已处理'}
          resp.data.records[i] = Object.assign(resp.data.records[i], deal,);
        } else {
          let deal = {status: '未处理'}
          resp.data.records[i] = Object.assign(resp.data.records[i], deal,);
        }
      }
      this.setState({
        data: resp.data,
      });
      // alert(JSON.stringify(resp.data))
    }, (error) => {
      message.error('反馈数据获取失败: ' + JSON.stringify(error))
    });
  }


  refreshListFilter() {
    let info = {
      pageIndex: this.state.currIndex,
      pageSize: this.state.pageSize,
      state: 1
    };

    RecruitApi.listFeedback(info, (resp) => {
      for (let i = 0; i < resp.data.records.length; i++) {
        if (resp.data.records[i].state === 1) {
          let deal = {status: '已处理'}
          resp.data.records[i] = Object.assign(resp.data.records[i], deal,);
        } else {
          let deal = {status: '未处理'}
          resp.data.records[i] = Object.assign(resp.data.records[i], deal,);
        }
      }
      this.setState({
        data: resp.data,
      });
      // alert(JSON.stringify(resp.data))
    }, (error) => {
      message.error('反馈数据获取失败: ' + JSON.stringify(error))
    });
  }
}

export default FeedbackListView;

// for(let i = 0; i < resp.data.records.length; i++) {
//   if (resp.data.records[i].state === 1) {
//     resp.data.records[i].state = '已处理';
//   } else {
//     resp.data.records[i].state = '未处理';
//   }
// }
