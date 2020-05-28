import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Form, DatePicker, Button, Input} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import {getCustomerInfo, setCustomerInfo, getExamYear, getRemainingDays, setExamYear} from '../../services/AppApi';
import * as Data from '../../data/data';
import moment from 'moment';
import Style from './style.less';
import HomeListView from './HomeListView';
import RootListView from './Root/RootListView';

const FormItem = Form.Item;

const {TabPane} = Tabs;

class HomeView extends Component {

  componentDidMount() {
  }

  render() {
    let id = this.props.id;
    return (
      <PageHeaderLayout title="选项管理" content="">
        <Card bordered={false}>
          <Tabs onChange={(key) => this.callback(key)} type="card">

            <TabPane tab="招聘信息" key="2">
              <HomeListView id={id}/>
            </TabPane>

            {/*<TabPane tab="用户权限" key="3">*/}
            {/*  <RootListView id={id}/>*/}
            {/*</TabPane>*/}

            {/*<TabPane tab="岗位信息" key="4">*/}
            {/*  <JobListView  id={id}/>*/}
            {/*</TabPane>*/}
          </Tabs>
        </Card>
      </PageHeaderLayout>

    );
  }

  callback(key) {
    console.info(' callback key: ' + key);
  }
}

export default HomeView;
