import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal,Drawer} from 'antd';
import Style from "../style.less";
import * as Data from '../../../data/data';
import PaginationTable from '../../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../../services/RecruitApi';
// import EditView from './EditView';
import {isEmpty} from '../../../utils/utils';
import JobProfile from '../../Job/DrawerView';

class JobListView extends Component {
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


  render() {
    let {data, loading, isShowDialog, info} = this.state;
    // alert(JSON.stringify(data));

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
        title: '查看详情',
        align: 'center',
        dataIndex: 'id',
        render: (val, record) => (<div>
            <Button className={Style.mainOperateBtn}  onClick={() => this.onEdit(record)} type="normal" shape="circle" icon="info"/>
          </div>
        ),
      },
    ];

    return (
      <div>

        {isShowDialog &&
        <Drawer
          style={{marginBottom: '30rem'}}
          destroyOnClose="true"
          title={'发布岗位信息'}
          onClose={() => this.onDialogCancel()}
          visible={true}
          footer={null}
          width={1200}
        >
          <JobProfile realName={info.realName} companyName={info.companyName} id={info.id}
                      JobSeekerId={info.JobSeekerId} cityName={info.cityName}
                      workAddress={info.workAddress} jobName={info.jobName}
                      jobContent={info.jobContent} positionTypeName={info.positionTypeName}
                      industryName={info.industryName} positionName={info.positionName}
                      educationName={info.educationName} workDateName={info.workDateName}
                      sex={info.sex} maxSalary={info.maxSalary} minSalary={info.minSalary}
                      maxAge={info.maxAge} minAge={info.minAge}/>
        </Drawer>
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

  refreshList() {
    let info = {
      recruiterId: this.props.id,
      pageIndex: this.state.currIndex,
      pageSize: this.state.pageSize,
    };

    RecruitApi.JobUserList(info, (resp) => {
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
        data: resp.data,
      });
      // alert(JSON.stringify(this.state.data))
    }, (error) => {

      message.error('获取城市失败: ' + JSON.stringify(error));
    });
  }

  onDelClick(id) {
    RecruitApi.deleteJobt(id, (resp) => {
      message.success('删除城市成功');
      this.refreshList();
    }, (error) => {

    });
  }

  onDialogCancel() {
    this.setState({
      isShowDialog: false
    })
  }

  onEdit(info) {

    this.setState({
      info: info,
      isShowDialog: true,
    });

  }

}

export default JobListView;
