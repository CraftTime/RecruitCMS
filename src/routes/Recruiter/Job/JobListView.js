import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from "../style.less";
import * as Data from '../../../data/data';
import PaginationTable from '../../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../../services/RecruitApi';
// import EditView from './EditView';
import {isEmpty} from '../../../utils/utils';


class JobListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      currIndex: 1,
      pageSize: Data.PAGINATION_INFO.pageSize,
      isShowDialog: false,
      info: {}
    };
  }

  componentWillMount() {
    this.refreshList();
  }


  render() {
    let {data, loading, isShowDialog, info} = this.state;
    // alert(JSON.stringify(data));

    const columns = [
      {
        title: '岗位名称',
        align: 'center',
        dataIndex: 'jobName',
      },
      {
        title: '公司名称',
        align: 'center',
        dataIndex: 'companyName',
      },
      {
        title: '招聘者',
        align: 'center',
        dataIndex: 'realName',
      },
      {
        title: '职位内容',
        align: 'center',
        dataIndex: 'jobContent',
      },
      {
        title: '职位类型',
        align: 'center',
        dataIndex: 'positionTypeName',
      },
      {
        title: '工作地址',
        align: 'center',
        dataIndex: 'workAddress',

      },
      {
        title: '最低薪资',
        align: 'center',
        dataIndex: 'minSalary',

      },
      {
        title: '最高薪资',
        align: 'center',
        dataIndex: 'maxSalary',

      },
      {
        title: '行业类型',
        align: 'center',
        dataIndex: 'industryName',

      },
      {
        title: '岗位类型',
        align: 'center',
        dataIndex: 'positionName',

      },
      {
        title: '工作城市',
        align: 'center',
        dataIndex: 'cityName',

      },
      {
        title: '学历要求',
        align: 'center',
        dataIndex: 'educationName',

      },
      {
        title: '经验要求',
        align: 'center',
        dataIndex: 'workDateName',

      },
      {
        title: '职业分类',
        align: 'center',
        dataIndex: 'positionTypeName',

      },
      {
        title: '性别要求',
        align: 'center',
        dataIndex: 'sex',

      },
      {
        title: '最小年龄',
        align: 'center',
        dataIndex: 'minAge',

      },
      {
        title: '最大年龄',
        align: 'center',
        dataIndex: 'maxAge',

      },
    ];

    return (
      <div>

        {isShowDialog &&
        <Modal
          style={{marginBottom: '30rem'}}
          destroyOnClose="true"
          title={isEmpty(info) ? '新增关于' : '编辑关于'}
          onCancel={() => this.onDialogCancel()}
          visible={true}
          footer={null}
        >
          {/*<EditView*/}
          {/*  info={info}*/}
          {/*  onDialogDismiss={() => {*/}
          {/*    this.setState({*/}
          {/*      isShowDialog: false*/}
          {/*    }, () => {*/}
          {/*      this.refreshList();*/}
          {/*    })*/}
          {/*  }}*/}
          {/*/>*/}
        </Modal>
        }


        <div className={Style.btnLayout}>
          <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
            this.refreshList()
          }}>刷新</Button>
          <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
            this.onEdit(null)
          }}>添加</Button>
        </div>

        <PaginationTable
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
      pageSize: page.pageSize,
    }, () => {
      this.refreshList();
    });
  }

  refreshList() {
    let info = {
      recruiterId: this.props.id,
      pageIndex: this.state.currIndex,
      pageSize: this.state.pageSize,
    };

    RecruitApi.JobUserList(info, (resp) => {
      this.setState({
        data: resp.data,
      });
      // alert(JSON.stringify(this.state.data))
    }, (error) => {

      message.error('获取城市失败: ' + JSON.stringify(error));
    });
  }

  onDelClick(id) {
    RecruitApi.deleteJobt(id, (resp) => {
      message.success('删除城市成功');
      this.refreshList();
    }, (error) => {

    });
  }

  onDialogCancel() {
    this.setState({
      isShowDialog: false
    })
  }

  onEdit(info) {

    this.setState({
      info: info,
      isShowDialog: true,
    });

  }

}

export default JobListView;
