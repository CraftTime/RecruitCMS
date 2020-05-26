import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal, Drawer} from 'antd';
import Style from './style.less';
import * as Data from '../../data/data';
import PaginationTable from '../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../services/RecruitApi';
import {isEmpty} from "../../utils/utils";
import JobProfile from './DrawerView';

class JobListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      currIndex: 1,
      pageSize: Data.PAGINATION_INFO.pageSize,
      isShowDrawer: false,
      info: {},
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

    RecruitApi.JobViewList(info, (resp) => {
      for (let i = 0; i < resp.data.records.length; i++) {
        if (resp.data.records[i].sex === 1) {
          resp.data.records[i].sex = '男';
        }
        if (resp.data.records[i].sex === 2) {
          resp.data.records[i].sex = '女';
        } else {
          resp.data.records[i].sex = '不限制';
        }
      }
      this.setState({
        data: resp.data
      });
    }, (error) => {
      message.error('反馈数据获取失败: ' + JSON.stringify(error))
    });
  }

  render() {
    let {data, loading, isShowDrawer, info} = this.state;

    const columns = [
      {
        title: '岗位名称',
        align: 'center',
        dataIndex: 'jobName',
      },
      {
        title: '公司名称',
        align: 'center',
        dataIndex: 'companyName',
      },
      {
        title: '招聘者',
        align: 'center',
        dataIndex: 'realName',
      },
      {
        title: '查看详情',
        align: 'center',
        dataIndex: 'id',
        render: (val, record) => (<div>
            <Button className={Style.mainOperateBtn} onClick={() => this.drawer(record)} type="normal" shape="circle"
                    icon="info"/>
          </div>
        ),
      },

    ];

    return (
      <div>
        {isShowDrawer &&
        <Drawer
          width={1000}
          title="岗位信息"
          placement="right"
          closable={true}
          onClose={() => this.onDrawDismiss()}
          visible={true}
          footer={null}
        >
          <JobProfile realName={info.realName} companyName={info.companyName} id={info.id}
                      JobSeekerId={info.JobSeekerId} cityName={info.cityName}
                      workAddress={info.workAddress} jobName={info.jobName}
                      jobContent={info.jobContent} positionTypeName={info.positionTypeName}
                      industryName={info.industryName} positionName={info.positionName}
                      educationName={info.educationName} workDateName={info.workDateName}
                      sex={info.sex} maxSalary={info.maxSalary} minSalary={info.minSalary}
                      maxAge={info.maxAge} minAge={info.minAge}
          />
        </Drawer>
        }
        <div className={Style.btnLayout}>
          <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
            this.refreshList()
          }}>刷新</Button>

        </div>

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
      pageSize: page.pageSize,
    }, () => {
      this.refreshList();
    });
  }

  drawer(info) {
    this.setState({
      info: info,
      isShowDrawer: true,
    });
  }

  onDrawDismiss(showRefresh = false) {
    this.setState({
      isShowDrawer: false
    }, () => {
      if (showRefresh) {
        this.refreshList();
      }
    })

  }
}

export default JobListView;
