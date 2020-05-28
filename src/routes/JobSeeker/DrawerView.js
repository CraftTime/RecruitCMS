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
      data: [{resume:{ id: 1, resumeName: '' }}],
      currIndex: 1,
      workData: [{id: 1}],
      projectData: [{id: 1}],
      loading: false,
      info: {},
      educationExp: [{id: 1}],
      expect:[{resume:{ id: 1, resumeName: '' }}],
      certificates:[{resume:{ id: 1, resumeName: '' }}],
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
        resp.data[i].resume.birthDate = this.dateFunction(resp.data[i].resume.birthDate);
        resp.data[i].resume.graduationDate = this.dateFunction(resp.data[i].resume.graduationDate);
        resp.data[i].resume.workExp = this.dateFunction(resp.data[i].resume.workExp);

        for (let x = 0; x < resp.data[i].educationExperience.length; x++) {
          resp.data[i].educationExperience[x].startDate = this.dateFunction(resp.data[i].educationExperience[x].startDate);
          resp.data[i].educationExperience[x].endDate = this.dateFunction(resp.data[i].educationExperience[x].endDate);
        }
      }
      this.setState({
        data: resp.data,
        educationExp:resp.data[0].educationExperience,
        certificates:resp.data[0].certificates,
      })
// alert(JSON.stringify(resp.data[0].educationExperience))
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
    RecruitApi.JobExpectList(id, (resp)=> {
      this.setState({
        expect: resp.data,
      });
    }, (error)=> {

      message.error('获取城市失败: ' + JSON.stringify(error));
    });
  }
  render() {
    const { avatar } = this.props;
    let {data, loading, workData,projectData,educationExp,expect,certificates,info} = this.state;
    const schoolColumns = [
      {
        title: '就读学校',
        align: 'center',
        dataIndex: 'school',
      },
      {
        title: '当前学历',
        align: 'center',
        dataIndex: 'educationName',
      },
      {
        title: '专业',
        align: 'center',
        dataIndex: 'specialty',
      },

      {
        title: '开始时间',
        align: 'center',
        dataIndex: 'startDate',
      },
      {
        title: '毕业时间',
        align: 'center',
        dataIndex: 'endDate',
      },
    ];
    const WorkColumns = [
      {
        title: '工作职位',
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
    const certificatesClo = [
      {
        title: '荣誉证书',
        align: 'center',
        dataIndex: 'certificateName',
      },
    ]
    return (
        <Card bordered={false}>
          <div style={{ display: 'flex' }}>
          <DescriptionList size="large" title=" 基本信息" style={{ marginBottom: 32 }}>
            <Description term="姓名">{data[0].resume.realName}</Description>
            <Description term="期望岗位">{data[0].resume.resumeName}</Description>
            <Description term="年龄">{data[0].resume.age}</Description>
            <Description term="联系电话">{data[0].resume.phone}</Description>
            <Description term="出生年月">{data[0].resume.birthDate}</Description>
            <Description term="毕业时间">{data[0].resume.graduationDate}</Description>
            <Description term="工作时间">{data[0].resume.workExp}</Description>
            <Description term="学历">{data[0].resume.educationName}</Description>
            <Description term="工作经验">{data[0].resume.workDateName}</Description>
            <Description term="最低薪资要求">{data[0].resume.minSalary}</Description>
            <Description term="最高薪资要求">{data[0].resume.maxSalary}</Description>
            <Description term="住址" layout="vertical" style={ {width:400} } >{data[0].resume.address}</Description>
            <Description term="个人主页" layout="vertical">{data[0].resume.socialHomepage}</Description>
          </DescriptionList>
          <div style={{ marginTop: 32 }}><Avatar src={avatar} size={100} /></div>
            </div >
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="求职期望" style={{ marginBottom: 32 }}>
            <Description term="期望职业">{expect[0].positionName}</Description>
            <Description term="行业类型">{expect[0].industryName}</Description>
            <Description term="期望工作城市">{expect[0].cityName}</Description>
            <Description term="期望薪资">{`${expect[0].minSalary}~${expect[0].maxSalary}`}</Description>
            <Description term="备注">无</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>教育经历</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={educationExp}
            columns={schoolColumns}
            rowKey="id"
          />
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
          <div className={styles.title}>荣誉证书</div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={certificates}
            columns={certificatesClo}
          />
        </Card>

    );
  }
}
