import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from "./style.less";
import * as Data from '../../data/data';
import PaginationTable from '../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../services/RecruitApi';
import {isEmpty} from "../../utils/utils";
import EditView from "../Home/EditView";


class HomeListView extends Component {
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

    RecruitApi.HomeInfo(info, (resp) => {
      this.setState({
        data: resp.data,
      });
      // alert(JSON.stringify(this.state.data));
    }, (error) => {
      message.error('反馈数据获取失败: ' + JSON.stringify(error))
    });
  }

  render() {

    let {data, loading, isShowDialog, info} = this.state;
    const newData = [];
    newData.push(data);
    const columns = [
      {
        title: '求职者人数',
        align: 'center',
        dataIndex: 'jobSeekerCount',
      },
      {
        title: '招聘者人数',
        align: 'center',
        dataIndex: 'recruiterCount',
      },
      {
        title: '招聘岗位数',
        align: 'center',
        dataIndex: 'jobCount',
      },
      {
        title: '求职申请数',
        align: 'center',
        dataIndex: 'applyCount',
      },
      {
        title: '面试邀请数',
        align: 'center',
        dataIndex: 'interviewCount',
      },
      // {
      //   title: '操作',
      //   align: 'center',
      //   dataIndex: 'id',
        // render: (val, record) => (<div>
        //     <Button className={Style.mainOperateBtn} onClick={() => this.onEdit(record)} type="normal" shape="circle"
        //             icon="edit"/>
        //
        //     <Popconfirm title="是否要删除该关于？"
        //                 onConfirm={() => {
        //                   this.onDelClick(record.id)
        //                 }}
        //                 okText="确定" cancelText="取消">
        //       <Button type="normal" shape="circle" icon="delete"/>
        //     </Popconfirm>
        //
        //   </div>
        // ),
      // },
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
        </div>

        <Table
          size="small"
          bordered
          dataSource={newData}
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
      pageSize: page.pageSize,
    }, () => {
      this.refreshList();
    });
  }

}

export default HomeListView;
