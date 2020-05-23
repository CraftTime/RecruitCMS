import React, { Component } from 'react';
import { connect } from 'dva';
import {Card, Avatar, Badge, Table, Divider, message} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from '../Profile/BasicProfile.less';
import * as Data from '../../data/data';
import * as RecruitApi from '../../services/RecruitApi';

const { Description } = DescriptionList;

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
export default class JobProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ id: 1, resumeName: '' }],
      currIndex: 1,
      workData: [{id: 1}],
      projectData: [{id: 1}],
      loading: false,
      info: {},
    };
  }

  componentWillMount() {
    this.refreshList();
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchBasic',
    });
  }
  dateFunction(time){
    var zoneDate = new Date(time).toJSON();
    var date = new Date(+new Date(zoneDate)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
    return date;
  }
  refreshList() {
    let id = this.props.id;
    let info = {
      // jobSeekerId: this.props.id,
      pageIndex: this.state.currIndex,
      pageSize: Data.PAGINATION_INFO.pageSize
    };
    RecruitApi.resumeDetailList(id, (resp)=> {
      for(let i = 0; i < resp.data.length; i++) {
        resp.data[i].birthDate = this.dateFunction(resp.data[i].birthDate);
        resp.data[i].graduationDate = this.dateFunction(resp.data[i].graduationDate);
      }
      this.setState({
        data: resp.data,
      })

    }, (error)=> {
      message.error('反馈数据获取失败: ' + JSON.stringify(error))
    });
    RecruitApi.WorkExpList(info, (resp)=> {


      for(let i = 0; i < resp.data.records.length; i++) {
        resp.data.records[i].startDate=this.dateFunction(resp.data.records[i].startDate);
        resp.data.records[i].endDate=this.dateFunction(resp.data.records[i].endDate);
      }
      this.setState({
        workData: resp.data.records,
      });
      // alert(JSON.stringify(this.state.data))
    }, (error)=> {

      message.error('获取城市失败: ' + JSON.stringify(error));
    });
    RecruitApi.JobInterview(info, (resp)=> {

      for(let i = 0; i < resp.data.records.length; i++) {
        resp.data.records[i].startDate=this.dateFunction(resp.data.records[i].startDate);
        resp.data.records[i].endDate=this.dateFunction(resp.data.records[i].endDate);
      }
      this.setState({
        projectData: resp.data.records,
      });
      // alert(JSON.stringify(this.state.data))
    }, (error)=> {

      message.error('获取城市失败: ' + JSON.stringify(error));
    });
  }
  render() {
    const { realName, companyName ,jobName,jobContent,workAddress,workDateName,educationName,cityName,positionName,industryName} = this.props;
    const { sex,positionTypeName} = this.props;
    let {data, loading, workData,projectData,info} = this.state;
    return (
      <Card bordered={false}>
          <DescriptionList size="large" title=" 基本信息" style={{ marginBottom: 32 }}>
            <Description term="岗位名称">{jobName}</Description>
            <Description term="公司名称">{companyName}</Description>
            <Description term="招聘者">{realName}</Description>
            <Description term="职位类型">{positionTypeName}</Description>
            <Description term="行业名称">{industryName}</Description>
            <Description term="职业名称">{positionName}</Description>
            <Description term="工作地址">{workAddress}</Description>
            <Description term="工作城市">{cityName}</Description>
            <Description term="岗位薪资">{positionTypeName}</Description>
            <Description term="工作内容"><div style={{width:1000}}>{jobContent}</div></Description>
          </DescriptionList>
        <Divider style={{ marginBottom: 32 }} />
        <DescriptionList size="large" title="岗位要求" style={{ marginBottom: 32 }}>
          <Description term="学历要求">{educationName}</Description>
          <Description term="工作经验">{workDateName}</Description>
          <Description term="性别要求">{sex}</Description>
          <Description term="年龄要求">{sex}</Description>
        </DescriptionList>
        <Divider style={{ marginBottom: 32 }} />
        {/*<div className={styles.title}>工作经历</div>*/}
        {/*<Table*/}
        {/*  style={{ marginBottom: 24 }}*/}
        {/*  pagination={false}*/}
        {/*  loading={loading}*/}
        {/*  dataSource={workData}*/}
        {/*  columns={WorkColumns}*/}
        {/*  rowKey="id"*/}
        {/*/>*/}

      </Card>

    );
  }
}
