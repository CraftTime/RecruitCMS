import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from './style.less';
import * as Data from '../../data/data';
import PaginationTable from '../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../services/RecruitApi';
import {isEmpty} from '../../utils/utils';
import EditView from '../Interview/EditView';


class InterviewListView extends Component {
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
  dateFunction(time){
    var zoneDate = new Date(time).toJSON();
    var date = new Date(+new Date(zoneDate)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
    return date;
  }
  refreshList() {
    let info = {
      pageIndex: this.state.currIndex,
      pageSize: this.state.pageSize,
    };

    RecruitApi.InterviewList(info, (resp)=> {
      for(let i = 0; i < resp.data.records.length; i++) {
        resp.data.records[i].interviewDate = this.dateFunction(resp.data.records[i].interviewDate);
        resp.data.records[i].createDate = this.dateFunction(resp.data.records[i].createDate);
        resp.data.records[i].updateDate = this.dateFunction(resp.data.records[i].updateDate);
      }
      this.setState({
        data: resp.data,
      });
      // alert(JSON.stringify(this.state.data))
    }, (error)=> {
      message.error('反馈数据获取失败: ' + JSON.stringify(error))
    });
  }

  render() {
    let {data, loading, isShowDialog, info} = this.state;

    const columns = [
      {
        title: '面试岗位',
        align: 'center',
        dataIndex: 'jobName',
      },
      {
        title: '公司名称',
        align: 'center',
        dataIndex: 'companyName',
      },

      {
        title: '招聘人',
        align: 'center',
        dataIndex: 'recruiterName',
      },
      {
        title: '求职者',
        align: 'center',
        dataIndex: 'jobSeekerName',
      },
      {
        title: '面试时间',
        align: 'center',
        dataIndex: 'interviewDate',
      },
      {
        title: '联系方式',
        align: 'center',
        dataIndex: 'phone',
      },
      {
        title: '面试地址',
        align: 'center',
        dataIndex: 'address',
      },

      {
        title: '创建时间',
        align: 'center',
        dataIndex: 'createDate',
      },
      {
        title: '更新时间',
        align: 'center',
        dataIndex: 'updateDate',
      },

      // {
      //   title: '操作',
      //   align: 'center',
      //   dataIndex: 'id',
      //   render: (val, record) => (<div>
      //       <Button className={Style.mainOperateBtn}  onClick={() => this.onEdit(record)} type="normal" shape="circle" icon="edit"/>
      //
      //       <Popconfirm title="是否要删除该关于？"
      //                   onConfirm={() => {
      //                     this.onDelClick(record.id)
      //                   }}
      //                   okText="确定" cancelText="取消">
      //         <Button type="normal" shape="circle" icon="delete"/>
      //       </Popconfirm>
      //
      //     </div>
      //   ),
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
            onDialogDismiss={()=> this.onDialogDismiss(true)}
          />
        </Modal>
        }

        <div className={Style.btnLayout}>
          <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
            this.refreshList()
          }}>刷新</Button>
          {/*<Button className={Style.mainOperateBtn} type="primary" onClick={() => {*/}
          {/*  this.onEdit(null)*/}
          {/*}}>添加</Button>*/}
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

export default InterviewListView;
