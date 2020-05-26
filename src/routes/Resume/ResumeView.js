import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Form, DatePicker, Button, Input} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import * as Data from '../../data/data';
import moment from 'moment';
import ResumeListView from './ResumeListView';
import Style from './style.less';

const FormItem = Form.Item;

const {TabPane} = Tabs;

class ResumeView extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <PageHeaderLayout title="反馈信息" content="">
        <Card bordered={false}>
          <ResumeListView/>
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default ResumeView;
