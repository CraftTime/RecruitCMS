import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal,Tabs} from 'antd';
import Style from "../style.less";
import * as Data from '../../../data/data';
import PaginationTable from '../../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../../services/RecruitApi';
// import EditView from './EditView';
import {isEmpty} from '../../../utils/utils';
import WelfareListView from './welfare';
import LicensesListView from './Licenses';

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

        <TabPane tab="公司福利" key="1">
          <WelfareListView id={id} companyId={companyId}/>
        </TabPane>

        <TabPane tab="营业执照" key="4">
          <LicensesListView id={id} companyId={companyId}/>
        </TabPane>

        <TabPane tab="收藏求职者" key="2">
          {/*<StarListView id={id}/>*/}
        </TabPane>

        <TabPane tab="屏蔽求职者" key="3">
          {/*<ShieldListView id={id}/>*/}
        </TabPane>
      </Tabs>

    );
  }

  callback(key) {
    console.info(' callback key: ' + key);
  }
}

export default OptionsView;
