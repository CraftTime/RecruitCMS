import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Form, DatePicker, Button, Input} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {getCustomerInfo, setCustomerInfo, getExamYear, getRemainingDays, setExamYear} from '../../services/AppApi';
import * as Data from '../../data/data';
import moment from 'moment';
import ImportDataView from './ImportExcel';
import ExportDataView from './ExportExcel';

const FormItem = Form.Item;

const {TabPane} = Tabs;

class OptionsView extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <PageHeaderLayout title="导入导出管理" content="">
        <Card bordered={false}>

          <Tabs onChange={(key) => this.callback(key)} type="card">
            <TabPane tab="导入" key="1">
                  <ImportDataView/>
            </TabPane>

            <TabPane tab="导出" key="2">
              <ExportDataView/>
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
