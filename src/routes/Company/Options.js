import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Form, DatePicker, Button, Input} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {getCustomerInfo, setCustomerInfo, getExamYear, getRemainingDays, setExamYear} from '../../services/AppApi';
import * as Data from '../../data/data';
import moment from 'moment';
import Style from './style.less';
import RecruiterListView from './RecruiterListView';


const FormItem = Form.Item;

const {TabPane} = Tabs;

class OptionsView extends Component {

  componentDidMount() {
  }

  render() {
    let id = this.props.id;
    return (

      <Tabs onChange={(key) => this.callback(key)} type="card">

        <TabPane tab="招聘者列表" key="1">
           <RecruiterListView id={id}/>
        </TabPane>

        <TabPane tab="岗位信息" key="4">

        </TabPane>

        <TabPane tab="公司福利" key="2">

        </TabPane>

        <TabPane tab="营业执照" key="3">

        </TabPane>
      </Tabs>

    );
  }

  callback(key) {
    console.info(' callback key: ' + key);
  }
}

export default OptionsView;
