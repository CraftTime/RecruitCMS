import React, {Component} from 'react';
import {Tabs, message, Form, DatePicker, Button, Input, Spin, Modal, Collapse} from 'antd';
import * as Data from '../../data/data';
import {isEmpty} from '../../utils/utils';
import * as RecruitApi from '../../services/RecruitApi';
import Style from "./style.less";
import PaginationTable from "../../components/PaginationTable/PaginationTable";

const FormItem = Form.Item;

@Form.create()
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
alert(info)
    RecruitApi.resumeDetailList(info, (resp)=> {
      this.setState({
        data: resp.data,
      });
    }, (error)=> {
      message.error('反馈数据获取失败: ' + JSON.stringify(error))
    });
  }

  render() {
    let {data, loading, info} = this.state;

    const columns = [
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
        title: ' 头像',
        align: 'center',
        dataIndex: 'avatar',
        render: (val, record, index) => (<img className={Style.listItemIcon} src={val} alt="暂无图片"/>)
      },
      {
        title: ' 工作经验',
        align: 'center',
        dataIndex: 'workDateName',
      },
      {
        title: ' 学历',
        align: 'center',
        dataIndex: 'educationName',
      },
      {
        title: '最低薪资要求',
        align: 'center',
        dataIndex: 'minSalary',
      },
      {
        title: '查看详情',
        align: 'center',
        dataIndex: 'id',
        render: (val, record) => (<div>
            <Button className={Style.mainOperateBtn}  onClick={() => this.onEdit(record)} type="normal" shape="circle" icon="info"/>
          </div>
        ),
      },
    ];

    return (
      <div>
        <div className={Style.btnLayout}>
          <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
            this.refreshList()
          }}> 刷新 </Button>
        </div>

        <PaginationTable
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
