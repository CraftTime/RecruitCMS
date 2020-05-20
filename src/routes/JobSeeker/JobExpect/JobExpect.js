import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from "../style.less";
import * as Data from '../../../data/data';
import PaginationTable from '../../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../../services/RecruitApi';
import {isEmpty} from '../../../utils/utils';


class JobExpectListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      currIndex: 1,
      info: {}
    };
  }

  componentWillMount() {
    this.refreshList();
  }


  render() {
    let {data, loading, info} = this.state;
    const columns = [
      {
        title: '序号',
        align: 'center',
        render: (val, record, index) => (<text>{index+1}</text>)
      },
      {
        title: '期望职位',
        align: 'center',
        dataIndex: 'positionName',
      },
      {
        title: '期望行业',
        align: 'center',
        dataIndex: 'industryName',
      },
      {
        title: '期望工作城市',
        align: 'center',
        dataIndex: 'cityName',
      },
      {
        title: '最少薪资',
        align: 'center',
        dataIndex: 'minSalary',
      },
      {
        title: '最高薪资',
        align: 'center',
        dataIndex: 'maxSalary',
      },
    ];

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
          onPageChange={(page, pageSize)=> {
            this.onPageChange(page, pageSize)
          }}
        />

      </div>);
  }

  onPageChange(page, pageSize) {
    this.setState({
      currIndex: page.current,
    }, ()=> {
      this.refreshList();
    });
  }

  refreshList() {
    let info = this.props.id;
    RecruitApi.JobExpectList(info, (resp)=> {
      this.setState({
        data: resp.data,
      });
      // alert(JSON.stringify(this.state.data))
    }, (error)=> {

      message.error('获取城市失败: ' + JSON.stringify(error));
    });
  }



}

export default JobExpectListView;
