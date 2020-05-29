import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Form, DatePicker, Button, Input} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {getCustomerInfo, setCustomerInfo, getExamYear, getRemainingDays, setExamYear} from '../../services/AppApi';
import * as Data from '../../data/data';
import moment from 'moment';
import Style from './style.less';
import ShieldListView from './ShieldList/ShieldListView';
import StarListView from './StarList/StarListView';
import JobListView from './Job/JobListView';
import CompanyListView from './CompanyInfo/Company';
import InterviewListView from './interview';

const FormItem = Form.Item;

const {TabPane} = Tabs;

class OptionsView extends Component {

  componentDidMount() {
  }

  render() {
    let id = this.props.id;
    let companyId=this.props.companyId;
    return (

      <Tabs onChange={(key) => this.callback(key)} type="card">

        <TabPane tab="所属公司" key="1">
          <CompanyListView id={id} companyId={companyId}/>
        </TabPane>

        <TabPane tab="岗位信息" key="4">
          <JobListView id={id}/>
        </TabPane>

        <TabPane tab="面试记录" key="5">
          <InterviewListView id={id}/>
        </TabPane>

        <TabPane tab="收藏求职者" key="2">
          <StarListView id={id}/>
        </TabPane>

        <TabPane tab="屏蔽求职者" key="3">
          <ShieldListView id={id}/>
        </TabPane>
      </Tabs>

    );
  }

  callback(key) {
    console.info(' callback key: ' + key);
  }
}

export default OptionsView;
