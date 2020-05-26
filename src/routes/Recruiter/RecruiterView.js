import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Form, DatePicker, Button, Input} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import * as Data from '../../data/data';
import moment from 'moment';
import RecruiterListView from './RecruiterListView';
import Style from './style.less';


const FormItem = Form.Item;

const {TabPane} = Tabs;

class RecruiterView extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <PageHeaderLayout title="求职信息" content="">
        <Card bordered={false}>
          <RecruiterListView/>
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default RecruiterView;
