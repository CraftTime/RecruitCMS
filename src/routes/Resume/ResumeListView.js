import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from './style.less';
import * as Data from '../../data/data';
import PaginationTable from '../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../services/RecruitApi';
import {isEmpty} from '../../utils/utils';
import Detail from '../Resume/Detail';


class ResumeListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      currIndex: 1,
      pageSize: Data.PAGINATION_INFO.pageSize,
      isShowDialog: false,
      info: {},
    };
  }

  componentWillMount() {
    this.refreshList();
  }

  refreshList() {
    let info = {
      pageIndex: this.state.currIndex,
      pageSize: this.state.pageSize,
    };

    RecruitApi.resumeList(info, (resp)=> {
      this.setState({
        data: resp.data,
      });
    }, (error)=> {
      message.error('反馈数据获取失败: ' + JSON.stringify(error))
    });
  }

  render() {
    let {data, loading, isShowDialog, info} = this.state;

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
        {isShowDialog &&
        <Modal
          style={{marginBottom: '30rem'}}
          destroyOnClose="true"
          width={820}
          title={isEmpty(info) ? '新增反馈' : '编辑反馈'}
          onCancel={() => this.onDialogDismiss()}
          visible={true}
          footer={null}
        >
          <Detail id={info.id} />
        </Modal>
        }

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
      pageSize:page.pageSize,
    }, ()=> {
      this.refreshList();
    });
  }

  onEdit(info) {
    this.setState({
      info: info,
      isShowDialog: true,
    });
  }


  onDialogDismiss(showRefresh= false) {
    this.setState({
      isShowDialog: false
    }, () => {
      if(showRefresh) {
        this.refreshList();
      }
    })
  }

}

export default ResumeListView;
