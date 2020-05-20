import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Form, DatePicker, Button, Input} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {getCustomerInfo, setCustomerInfo, getExamYear, getRemainingDays, setExamYear} from '../../services/AppApi';
import * as Data from '../../data/data';
import moment from 'moment';
import Style from './style.less';
import JobStarListView from './JobStart/JobStarList';
import ShieldListView from './ShieldCompany/ShieldListView';
import WorkExpListView from './workExpList/WorkExpList';
import EducationExpView from './EducationExpList/EducationExpList';
import ProjectExpView from './ProjectExpList/ProjectExpList';
import CompanyStarListView from './CompanyStarList/CompanyStar';
import Detail from './Detail/Detail';
import JobExpectListView from './JobExpect/JobExpect';

const FormItem = Form.Item;

const {TabPane} = Tabs;

class OptionsView extends Component {

  componentDidMount() {
  }

  render() {
    let id = this.props.id;
    return (

      <Tabs onChange={(key) => this.callback(key)} type="card">

        <TabPane tab="基础信息" key="1" id={id}>
          <Detail id={id}/>
        </TabPane>
        <TabPane tab="求职期望" key="8" id={id}>
          <JobExpectListView id={id}/>
        </TabPane>
        <TabPane tab="工作经历" key="2" id={id}>
          <WorkExpListView id={id}/>
        </TabPane>

        <TabPane tab="教育经历" key="3" id={id}>
          <EducationExpView id={id}/>
        </TabPane>

        <TabPane tab="项目经历" key="4" id={id}>
          <ProjectExpView id={id}/>
        </TabPane>

        <TabPane tab="收藏公司" key="5" id={id}>
          <CompanyStarListView id={id}/>
        </TabPane>

        <TabPane tab="收藏岗位" key="6" id={id}>
          <JobStarListView id={id}/>
        </TabPane>

        <TabPane tab="屏蔽公司" key="7" id={id}>
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
