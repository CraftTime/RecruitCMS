import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from "./style.less";
import * as Data from '../../data/data';
import PaginationTable from '../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../services/RecruitApi';
import {isEmpty} from '../../utils/utils';
import OptionsView from '../Company/Options';


class CompanyListView extends Component {
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

  refreshList() {
    let info = {
      pageIndex: this.state.currIndex,
      pageSize: this.state.pageSize,
      state: 1,
    };

    RecruitApi.companyList(info, (resp)=> {
      this.setState({
        data: resp.data,
      });
      // alert(JSON.stringify(this.state.data))
    }, (error)=> {
      message.error('反馈数据获取失败: ' + JSON.stringify(error))
    });
  }

  render() {
    let {data, loading, isShowDialog, info} = this.state;
    const columns = [
      {
        title: '公司名称',
        align: 'center',
        dataIndex: 'companyName',
      },
      {
        title: '公司介绍',
        align: 'center',
        dataIndex: 'companySummary',
      },
      {
        title: '上班时间',
        align: 'center',
        dataIndex: 'startDate',
      },
      {
        title: '法定营业人',
        align: 'center',
        dataIndex: 'legalPerson',
      },
      {
        title: '注册时间',
        align: 'center',
        dataIndex: 'registerDate',
      },
      {
        title: '经营状态',
        align: 'center',
        dataIndex: 'managementName',
      },
      {
        title: '注册地址',
        align: 'center',
        dataIndex: 'registerAddress',
      },
      {
        title: '信用代码',
        align: 'center',
        dataIndex: 'unifiedCreditCode',
      },
      {
        title: '规模大小',
        align: 'center',
        dataIndex: 'scaleName',
      },
      {
        title: '经营领域',
        align: 'center',
        dataIndex: 'scope',
      },
      {
        title: '公司地址',
        align: 'center',
        dataIndex: 'cityName',
      },
      {
        title: '详情',
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
          title={'公司详情'}
          onCancel={() => this.onDialogDismiss()}
          visible={true}
          footer={null}
        >
          <OptionsView
            info={info}
           id={info.id}
          />
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

  onDialogDismiss(showRefresh= false) {
    this.setState({
      isShowDialog: false
    }, () => {
      if(showRefresh) {
        this.refreshList();
      }
    })
  }
  onDelClick(id) {
    RecruitApi.deleteCompany(id, (resp) => {
      message.success('删除公司信息成功');
      this.refreshList();
    }, (error) => {

    });
  }
}

export default CompanyListView;
