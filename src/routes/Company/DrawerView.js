import React, {Component} from 'react';
import {connect} from 'dva';
import {Card, Avatar, Badge, Table, Divider, message} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from '../Profile/BasicProfile.less';
import * as Data from '../../data/data';
import * as RecruitApi from '../../services/RecruitApi';
import PaginationTable from '../../components/PaginationTable/PaginationTable';
import Style from "../Recruiter/style.less";

const {Description} = DescriptionList;

@connect(({profile, loading}) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
export default class CompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ id: 1, resumeName: '', }],
      currIndex: 1,
      pageSize: Data.PAGINATION_INFO.pageSize,
      loading: false,
      info: {},
      status:'',
      applyData: [{ id: 1, resumeName: '' }],
      Data: {company: '', licenses: [{id: 6, image: ''}], welfare: [{id: 6, image: ''}]},
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
      companyId: this.props.id,
      pageIndex: this.state.currIndex,
      pageSize: this.state.pageSize,
    };
    let id = this.props.id;
    RecruitApi.CompanyUserList(id, (resp) => {
      this.setState({
        Data: resp.data,
      });
      // alert(JSON.stringify(this.state.data))
    }, (error) => {

      message.error('获取城市失败: ' + JSON.stringify(error));
    });
    RecruitApi.recruiter(info, (resp) => {
      this.setState({
        data: resp.data,
      });
      // alert(JSON.stringify(this.state.data))
    }, (error) => {

      message.error('获取城市失败: ' + JSON.stringify(error));
    });
  }

  render() {
    const { companyName, companySummary, startDate, endDate, legalPerson } = this.props;
    const { registerDate, managementName, registerAddress, unifiedCreditCode } = this.props;
    const { scaleName, scope, cityName, industryName } = this.props;
    let { data, loading, applyData, info } = this.state;
    const columns = [
      {
        title: '公司福利',
        align: 'center',
        dataIndex: 'welfareName',
      },
      {
        title: '福利内容',
        align: 'center',
        dataIndex: 'content',
      },
    ];

    const recruiterColumns = [
      {
        title: '招聘人',
        align: 'center',
        dataIndex: 'realName',
      },
      {
        title: '昵称',
        align: 'center',
        dataIndex: 'userName',
      },
      {
        title: '头像',
        align: 'center',
        dataIndex: 'avatar',
        render: (val, record, index) => (<img className={Style.listItemIcon} src={val} alt="暂无图片"/>)
      },
      {
        title: '所属公司',
        align: 'center',
        dataIndex: 'companyName',
      },
    ]


    return (
      <Card bordered={false}>
        <div style={{display: 'flex'}}>
        <DescriptionList size="large" title=" 基本信息" style={{marginBottom: 32}}>
          <Description term="公司名称">{companyName}</Description>
          <Description term="公司简介">{companySummary}</Description>
          <Description term="公司经营人">{legalPerson}</Description>
          <Description term="上班时间">{startDate}</Description>
          <Description term="下班时间">{endDate}</Description>
          <Description term="注册时间">{registerDate}</Description>
          <Description term="经营状态">{managementName}</Description>
          <Description term="注册地址">{registerAddress} </Description>
          <Description term="信用代码">{unifiedCreditCode}</Description>
          <Description term="公司规模">{scaleName}</Description>
          <Description term="经营范围">{scope}</Description>
          <Description term="所在城市">{cityName}</Description>
          <Description term="经营行业">{industryName}</Description>
        </DescriptionList>
        <div style={{ marginTop: 32 }}><Avatar src={this.state.Data.company.avatar} size={100} /></div>
        </div>
        <div className={styles.title}>招聘者</div>
        <PaginationTable
          style={{marginBottom: 24}}
          pagination={false}
          loading={loading}
          dataSource={data}
          columns={recruiterColumns}
          rowKey="id"
          onPageChange={(page, pageSize) => {
            this.onPageChange(page, pageSize)
          }}
        />
        <Divider style={{marginBottom: 32}}/>
        <div className={styles.title}>公司福利</div>
        <Table
          size="small"
          bordered
          style={{marginBottom: 24}}
          pagination={false}
          loading={loading}
          dataSource={this.state.Data.welfare}
          columns={columns}
          rowKey="id"
          onPageChange={(page, pageSize) => {
            this.onPageChange(page, pageSize)
          }}
        />
        <DescriptionList size="large" title="营业执照" style={{marginBottom: 32}}>
          <div style={{ marginTop: 32 }}><img src={this.state.Data.licenses[0].image} width={500} height={300}/></div>
        </DescriptionList>
        <Divider style={{marginBottom: 32}}/>


      </Card>

    );
  }

}
