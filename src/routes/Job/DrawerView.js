import React, {Component} from 'react';
import {connect} from 'dva';
import {Card, Avatar, Badge, Table, Divider, message} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from '../Profile/BasicProfile.less';
import * as Data from '../../data/data';
import * as RecruitApi from '../../services/RecruitApi';
import PaginationTable from '../../components/PaginationTable/PaginationTable';

const {Description} = DescriptionList;

@connect(({profile, loading}) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
export default class JobProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ id: 1, resumeName: '' }],
      currIndex: 1,
      pageSize: Data.PAGINATION_INFO.pageSize,
      loading: false,
      info: {},
      status:'',
      applyData: [{ id: 1, resumeName: '' }],
    };
  }

  onPageChange(page, pageSize) {
    this.setState({
      currIndex: page.current,
      pageSize: page.pageSize,
    }, () => {
      this.refreshList();
    });
  }

  componentWillMount() {
    this.refreshList();
    // 下面语句不太懂
    const {dispatch} = this.props;
    dispatch({
      type: 'profile/fetchBasic',
    });
  }

  dateFunction(time) {
    var zoneDate = new Date(time).toJSON();
    var date = new Date(+new Date(zoneDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    return date;
  }

  refreshList() {
    let info = {
      jobId: this.props.id,
      pageIndex: this.state.currIndex,
      pageSize: this.state.pageSize,
    };
    let id = this.props.id;
    RecruitApi.JobInterview(info, (resp) => {

      for (let i = 0; i < resp.data.records.length; i++) {
        resp.data.records[i].interviewDate = this.dateFunction(resp.data.records[i].interviewDate);
        resp.data.records[i].createDate = this.dateFunction(resp.data.records[i].createDate);
        resp.data.records[i].updateDate = this.dateFunction(resp.data.records[i].updateDate);
      }
      this.setState({
        data: resp.data,
      });
      // alert(JSON.stringify(this.state.data))
    }, (error) => {

      message.error('获取城市失败: ' + JSON.stringify(error));
    });
    RecruitApi.JobEmploy(id, (resp) => {
      this.setState({
        status: resp.data,
      });
      // alert(JSON.stringify(this.state.data))
    }, (error) => {

      message.error('获取城市失败: ' + JSON.stringify(error));
    });
    RecruitApi.JobApply(info, (resp) => {
      for (let i = 0; i < resp.data.records.length; i++) {
        resp.data.records[i].applyDate = this.dateFunction(resp.data.records[i].applyDate);
        resp.data.records[i].createDate = this.dateFunction(resp.data.records[i].createDate);
        resp.data.records[i].updateDate = this.dateFunction(resp.data.records[i].updateDate);
      }
      this.setState({
        applyData: resp.data,
      });
      // alert(JSON.stringify(this.state.data))
    }, (error) => {

      message.error('获取城市失败: ' + JSON.stringify(error));
    });
  }

  render() {
    const { sex, positionTypeName, maxSalary, minSalary, maxAge, minAge } = this.props;
    const { realName, companyName, jobName, jobContent, workAddress } = this.props;
    const { workDateName, educationName, cityName, positionName, industryName } = this.props;
    let { data, loading, applyData, info } = this.state;
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
        title: '面试地点',
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
    ];
    const applyColumns = [
      {
        title: '申请人',
        align: 'center',
        dataIndex: 'jobSeekerName',
      },
      {
        title: '招聘人',
        align: 'center',
        dataIndex: 'recruiterName',
      },
      {
        title: '申请时间',
        align: 'center',
        dataIndex: 'applyDate',
      },

    ];

    return (
      <Card bordered={false}>
        <DescriptionList size="large" title=" 基本信息" style={{marginBottom: 32}}>
          <Description term="岗位名称">{jobName}</Description>
          <Description term="公司名称">{companyName}</Description>
          <Description term="招聘者">{realName}</Description>
          <Description term="职位类型">{positionTypeName}</Description>
          <Description term="行业名称">{industryName}</Description>
          <Description term="职业名称">{positionName}</Description>
          <Description term="工作地址">{workAddress}</Description>
          <Description term="工作城市">{cityName}</Description>
          <Description term="岗位薪资">{minSalary + 'k' + '~' + maxSalary + 'k'}</Description>
          <Description term="工作内容">
            <div style={{width: 1000}}>{jobContent}</div>
          </Description>
        </DescriptionList>
        <Divider style={{marginBottom: 32}}/>
        <DescriptionList size="large" title="岗位要求" style={{marginBottom: 32}}>
          <Description term="学历要求">{educationName}</Description>
          <Description term="工作经验">{workDateName}</Description>
          <Description term="性别要求">{sex}</Description>
          <Description term="年龄要求">{`${minAge}~${maxAge}`}</Description>
        </DescriptionList>
        <Divider style={{marginBottom: 32}}/>
        <DescriptionList size="large" title="岗位状态" style={{marginBottom: 32}}>
          <Description term="招聘人数">{this.state.status.employNum}</Description>
          <Description term="当前申请人数">{this.state.status.applyCount}</Description>
        </DescriptionList>
        <Divider style={{marginBottom: 32}}/>
        <div className={styles.title}>面试记录</div>
        <PaginationTable
          style={{ marginBottom: 16 }}
          pagination={false}
          loading={loading}
          dataSource={data}
          columns={columns}
          rowKey="id"
        />
        <div className={styles.title}>申请记录</div>
        <PaginationTable
          style={{marginBottom: 24}}
          pagination={false}
          loading={loading}
          dataSource={applyData}
          columns={applyColumns}
          rowKey="id"
          onPageChange={(page, pageSize) => {
            this.onPageChange(page, pageSize)
          }}
        />
      </Card>

    );
  }

}
