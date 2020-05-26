import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Form, DatePicker, Button, Input} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import * as Data from '../../data/data';
import moment from 'moment';
import BannerListView from './BannerListView';
import Style from './style.less';

const FormItem = Form.Item;

const {TabPane} = Tabs;

class BannerView extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <PageHeaderLayout title="反馈信息" content="">
        <Card bordered={false}>
          <BannerListView/>
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default BannerView;
