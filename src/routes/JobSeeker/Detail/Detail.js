import React, {Component} from 'react';
import {Tabs, message, Form, DatePicker, Button, Input, Spin, Modal, Collapse, Table} from 'antd';
import * as Data from '../../../data/data';
import {isEmpty} from '../../../utils/utils';
import * as RecruitApi from '../../../services/RecruitApi';
import Style from '../style.less';
import PaginationTable from '../../../components/PaginationTable/PaginationTable';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      currIndex: 1,
      pageSize: Data.PAGINATION_INFO.pageSize,
      info: {},
    };
  }

  componentWillMount() {
    this.refreshList();
  }

  refreshList() {
    let info = this.props.id;
    RecruitApi.resumeDetailList(info, (resp)=> {
      for(let i = 0; i < resp.data.length; i++) {
        resp.data[i].birthDate = this.dateFunction(resp.data[i].birthDate);
        resp.data[i].graduationDate = this.dateFunction(resp.data[i].graduationDate);
      }
      this.setState({
        data: resp.data,
      });

    }, (error)=> {
      message.error('反馈数据获取失败: ' + JSON.stringify(error))
    });
  }
  dateFunction(time){
    var zoneDate = new Date(time).toJSON();
    var date = new Date(+new Date(zoneDate)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
    return date;
  }
  render() {
    let {data, loading, info} = this.state;
    // const detailDate = { records: data };
    // alert(JSON.stringify(detailDate))
    const columns = [
      {
        title: '序号',
        align: 'center',
        render: (val, record, index) => (<text>{index+1}</text>)
      },
      {
        title: '姓名',
        align: 'center',
        dataIndex: 'realName',
      },
      {
        title: '期望岗位',
        align: 'center',
        dataIndex: 'resumeName',
      },

      {
        title: ' 出生年月',
        align: 'center',
        dataIndex: 'birthDate',
      },
      {
        title: ' 住址',
        align: 'center',
        dataIndex: 'address',
      },
      {
        title: ' 毕业时间',
        align: 'center',
        dataIndex: 'graduationDate',
      },
      {
        title: '最低薪资要求',
        align: 'center',
        dataIndex: 'minSalary',
      },
      {
        title: '最高薪资要求',
        align: 'center',
        dataIndex: 'maxSalary',
      },
    ];

    return (
      <div>
        <div className={Style.btnLayout}>
          <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
            this.refreshList()
          }}> 刷新 </Button>
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
      pageSize: page.pageSize,
    }, ()=> {
      this.refreshList();
    });
  }

}

export default Detail;
