import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from "../style.less";
import * as Data from '../../../data/data';
import PaginationTable from '../../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../../services/RecruitApi';


class WelfareListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      isShowDetail: false,
      info: {},
    };
  }

  componentWillMount() {
    this.refreshList();
  }


  render() {
    let {data, loading, isShowDetail, info} = this.state;

    const columns = [
      {
        title: ' 福利名称',
        align: 'center',
        dataIndex: 'welfareName',
      },
      {
        title: ' 福利内容',
        align: 'center',
        dataIndex: 'content',
      },
     ]

    return (
      <div>
        <div className={Style.btnLayout}>
          <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
            this.refreshList()
          }}>刷新</Button>
        </div>

        <Table
          size="small"
          bordered
          dataSource={data}
          loading={loading}
          columns={columns}
          onPageChange={(page, pageSize) => {
            this.onPageChange(page, pageSize)
          }}
        />

      </div>);
  }

  onPageChange(page, pageSize) {
    this.setState({
      currIndex: page.current,
    }, () => {
      this.refreshList();
    });
  }

  refreshList() {
    let info = this.props.companyId;
    RecruitApi.CompanyUserList(info, (resp) => {
      this.setState({
        data: resp.data.welfare,
      });
      // alert(JSON.stringify(this.state.data))
    }, (error) => {

      message.error('获取公司信息失败: ' + JSON.stringify(error));
    });
  }
}

export default WelfareListView;
