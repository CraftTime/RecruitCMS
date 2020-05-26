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
export default class BasicProfile extends Component {
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

  dateFormat(fmt, date) {
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString(),          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
    };
    return fmt;
  }

  dateFunction(time) {
    var date = new Date(time);
    return this.dateFormat("YYYY-mm-dd",date);
  }
  refreshList() {
    let id = this.props.id;
    let info = {
      jobSeekerId: this.props.id,
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
    RecruitApi.ProjectExpList(info, (resp)=> {

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
    const { realName, avatar } = this.props;
    let {data, loading, workData,projectData,info} = this.state;
    const WorkColumns = [
      {
        title: '简历信息',
        align: 'center',
        dataIndex: 'resumeName',
      },
      {
        title: '公司名称',
        align: 'center',
        dataIndex: 'companyName',
      },
      {
        title: '行业名称',
        align: 'center',
        dataIndex: 'industryName',
      },

      {
        title: '职位名称',
        align: 'center',
        dataIndex: 'positionName',
      },
      {
        title: '所在部门',
        align: 'center',
        dataIndex: 'department',
      },
      {
        title: '开始时间',
        align: 'center',
        dataIndex: 'startDate',
      },
      {
        title: '离职时间',
        align: 'center',
        dataIndex: 'endDate',
      },
    ];
    const projectColumns = [
      {
        title: '项目职位',
        align: 'center',
        dataIndex: 'resumeName',
      },
      {
        title: '项目名称',
        align: 'center',
        dataIndex: 'projectName',
      },
      {
        title: '项目内容',
        align: 'center',
        dataIndex: 'projectContent',
      },

      {
        title: '开始时间',
        align: 'center',
        dataIndex: 'startDate',
      },
      {
        title: '离职时间',
        align: 'center',
        dataIndex: 'endDate',
      },
      ];
    return (
        <Card bordered={false}>
          <div style={{ display: 'flex' }}>
          <DescriptionList size="large" title=" 基本信息" style={{ marginBottom: 32 }}>
            <Description term="姓名">{realName}</Description>
            <Description term="期望岗位">{data[0].resumeName}</Description>
            <Description term="出生年月">{data[0].birthDate}</Description>
            <Description term="毕业时间">{data[0].graduationDate}</Description>
            <Description term="最低薪资要求">{data[0].minSalary}</Description>
            <Description term="最高薪资要求">{data[0].maxSalary}</Description>
            <Description term="住址" layout="vertical" style={ {width:400} } >{data[0].address}</Description>
            <Description term="个人主页" layout="vertical">{data[0].socialHomepage}</Description>
          </DescriptionList>
          <div style={{ marginTop: 32 }}><Avatar src={avatar} size={100} /></div>
            </div >
          <Divider style={{ marginBottom: 32 }} />
          {/*<DescriptionList size="large" title="用户信息" style={{ marginBottom: 32 }}>*/}
          {/*  <Description term="用户姓名">付小小</Description>*/}
          {/*  <Description term="联系电话">18100000000</Description>*/}
          {/*  <Description term="常用快递">菜鸟仓储</Description>*/}
          {/*  <Description term="取货地址">浙江省杭州市西湖区万塘路18号</Description>*/}
          {/*  <Description term="备注">无</Description>*/}
          {/*</DescriptionList>*/}
          {/*<Divider style={{ marginBottom: 32 }} />*/}
          <div className={styles.title}>工作经历</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={workData}
            columns={WorkColumns}
            rowKey="id"
          />

          <div className={styles.title}>项目经历</div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={projectData}
            columns={projectColumns}
          />
        </Card>

    );
  }
}
