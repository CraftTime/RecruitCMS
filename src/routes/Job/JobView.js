import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Form, DatePicker, Button, Input} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import * as Data from '../../data/data';
import moment from 'moment';
import JobListView from './JobListView';
import Style from './style.less';

const FormItem = Form.Item;

const {TabPane} = Tabs;

class JobView extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <PageHeaderLayout title="反馈信息" content="">
        <Card bordered={false}>
          <JobListView/>
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default JobView;
