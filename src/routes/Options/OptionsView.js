import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Form, DatePicker, Button, Input} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {getCustomerInfo, setCustomerInfo, getExamYear, getRemainingDays, setExamYear} from '../../services/AppApi';
import * as Data from '../../data/data';
import moment from 'moment';
import CityListView from './CityListView';
import AgeListView from './Age/AgeListView';
import PositionListView from './position/PositionListView';
import IndustryListView from './industry/IndustryListView';
import TreatmentListView from './treatment/TreatmentListView';
import WorkDateListView from './workdate/WorkDateListView';
import ScaleListView from './scale/ScaleListView';
import SalaryListView from './salary/SalaryListView';
import EducationListView from './education/EducationListView';
import ManagementListView from './managemant/ManagementListView';
import JobStateListView from './JobState/JobStateListView';
import PositionTypeListView from "./positionType/PositionTypeListView";

const FormItem = Form.Item;

const {TabPane} = Tabs;

class OptionsView extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <PageHeaderLayout title="选项管理" content="">
        <Card bordered={false}>

          <Tabs onChange={(key) => this.callback(key)} type="card">
            <TabPane tab="城市" key="1">
              <CityListView/>
            </TabPane>

            <TabPane tab="年龄" key="2">
              <AgeListView/>
            </TabPane>

            <TabPane tab="行业" key="3">
              <IndustryListView/>
            </TabPane>

            <TabPane tab="职业" key="4">
              <PositionListView/>
            </TabPane>

            <TabPane tab="职业类型" key="12">
              <PositionTypeListView/>
            </TabPane>

            <TabPane tab="学历" key="5">
              <EducationListView/>
            </TabPane>

            <TabPane tab="待遇" key="6">
              <TreatmentListView/>
            </TabPane>

            <TabPane tab="工作时间" key="7">
              <WorkDateListView/>
            </TabPane>

            <TabPane tab="公司规模" key="8">
              <ScaleListView/>
            </TabPane>

            <TabPane tab="薪资待遇" key="9">
              <SalaryListView/>
            </TabPane>
            <TabPane tab=" 经营状态" key="10">
              <ManagementListView/>
            </TabPane>
            <TabPane tab=" 求职状态" key="11">
              <JobStateListView/>
            </TabPane>
          </Tabs>

        </Card>
      </PageHeaderLayout>
    );
  }

  callback(key) {
    console.info(' callback key: ' + key);
  }
}

export default OptionsView;
