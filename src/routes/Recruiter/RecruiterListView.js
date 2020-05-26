import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from "./style.less";
import * as Data from '../../data/data';
import PaginationTable from '../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../services/RecruitApi';
import {isEmpty} from '../../utils/utils';
import EditView from '../Recruiter/EditView';
import OptionsView from "./OptionsView";


class RecruiterListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      currIndex: 1,
      pageSize: Data.PAGINATION_INFO.pageSize,
      isShowDialog: false,
      info: {},
      isShowDetail: false,
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

    RecruitApi.recruiter(info, (resp)=> {
      this.setState({
        data: resp.data,
      });
      // alert(JSON.stringify(this.state.data))
    }, (error)=> {
      message.error('反馈数据获取失败: ' + JSON.stringify(error))
    });
  }

  render() {
    let {data, loading, isShowDialog, info,isShowDetail} = this.state;

    const columns = [
      {
        title: '姓名',
        align: 'center',
        dataIndex: 'realName',
      },
      {
        title: '头像',
        align: 'center',
        dataIndex: 'avatar',
        render: (val, record, index) => (<img className={Style.listItemIcon} src={val} alt="暂无图片"/>)
      },
      {
        title: '所属公司',
        align: 'center',
        dataIndex: 'companyName',
      },
      {
        title: '查看详情',
        align: 'center',
        dataIndex: 'id',
        render: (val, record) => (<div>
            <Button className={Style.mainOperateBtn}  onClick={() => this.detail(record)} type="normal" shape="circle" icon="info"/>
            {/*<Button className={Style.mainOperateBtn}  onClick={() => this.onEdit(record)} type="normal" shape="circle" icon="edit"/>*/}
            {/*<Popconfirm title="是否要删除该关于？"*/}
            {/*            onConfirm={() => {*/}
            {/*              this.onDelClick(record.id)*/}
            {/*            }}*/}
            {/*            okText="确定" cancelText="取消">*/}
            {/*  <Button type="normal" shape="circle" icon="delete"/>*/}
            {/*</Popconfirm>*/}

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
          title={isEmpty(info) ? '新增招聘者信息' : '编辑招聘者信息'}
          onCancel={() => this.onDialogDismiss()}
          visible={true}
          footer={null}
        >
          <EditView
            info={info}
            onDialogDismiss={()=> this.onDialogDismiss(true)}
          />
        </Modal>
        }
        {isShowDetail &&
        <Modal
          style={{marginBottom: '30rem'}}
          destroyOnClose="true"
          width={1200}
          title={isEmpty(info) ? '新增反馈' : '编辑反馈'}
          onCancel={() => this.onDetailDismiss()}
          visible={true}
          footer={null}
        >
          <OptionsView id={info.id} companyId={info.companyId} />
        </Modal>
        }
        <div className={Style.btnLayout}>
          <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
            this.refreshList()
          }}>刷新</Button>
          {/*<Button className={Style.mainOperateBtn} type="primary" onClick={() => {*/}
          {/*  this.onEdit(null)*/}
          {/*}}>添加</Button>*/}
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

  onEdit(info) {
    this.setState({
      info: info,
      isShowDialog: true,
    });
  }
  detail(info) {
    this.setState({
      info: info,
      isShowDetail: true,
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
  onDetailDismiss(showRefresh= false) {
    this.setState({
      isShowDetail: false
    }, () => {
      if(showRefresh) {
        this.refreshList();
      }
    })

  }
}

export default RecruiterListView;
