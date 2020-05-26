import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from "../style.less";
import * as Data from '../../../data/data';
import PaginationTable from '../../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../../services/RecruitApi';
// import EditView from './EditView';
import {isEmpty} from '../../../utils/utils';
import OptionsView from './Options';


class CompanyListView extends Component {
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
    let newDate=[];
    newDate.push(data);
    // alert(JSON.stringify(newDate));
    const columns = [
      {
        title: '头像',
        align: 'center',
        dataIndex: 'avatar',
        render:(val)=> (<img className={Style.listItemIcon} src={val} alt="暂无图片"/>)
      },
      {
        title: ' 公司名称',
        align: 'center',
        dataIndex: 'companyName',
      },
      {
        title: ' 公司职位',
        align: 'center',
        dataIndex: 'companySummary',
      },
      {
        title: ' 法定营业人',
        align: 'center',
        dataIndex: 'legalPerson',
      },
      {
        title: ' 注册资金',
        align: 'center',
        dataIndex: 'registerCapital',
      },
      {
        title: ' 注册时间',
        align: 'center',
        dataIndex: 'registerDate',
      },
      {
        title: ' 注册地址',
        align: 'center',
        dataIndex: 'registerAddress',
      },
      {
        title: ' 统一信用代码',
        align: 'center',
        dataIndex: 'unifiedCreditCode',
      },
      {
        title: ' 经营状态',
        align: 'center',
        dataIndex: 'managementName',
      },
      {
        title: '公司规模',
        align: 'center',
        dataIndex: 'scaleName',
      },
      {
        title: '经营范围',
        align: 'center',
        dataIndex: 'scope',
      },
      {
        title: '行业名称',
        align: 'center',
        dataIndex: 'industryName',
      },
      {
        title: '详情',
        align: 'center',
        dataIndex: 'id',
        render:(val,record)=> (<div><Button className={Style.mainOperateBtn}  onClick={() => this.detail(record)} type="normal" shape="circle" icon="info"/></div>)},
    ];

    return (
      <div>
        <div className={Style.btnLayout}>
          <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
            this.refreshList()
          }}>刷新</Button>
        </div>
        {isShowDetail &&
        <Modal
          style={{marginBottom: '30rem'}}
          destroyOnClose="true"
          width={820}
          title={isEmpty(info) ? '新增招聘者信息' : '编辑招聘者信息'}
          onCancel={() =>  this.onDetailDismiss()}
          visible={true}
          footer={null}
        >
          <OptionsView
            info={info}
            companyId={this.props.companyId}
            // onDialogDismiss={()=> this.onDialogDismiss(true)}
          />
        </Modal>
        }
        <Table
          size="small"
          bordered
          dataSource={newDate}
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
  detail(info) {
    this.setState({
      info: info,
      isShowDetail: true,
    });
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
  refreshList() {
    let info = this.props.companyId;
    RecruitApi.CompanyUserList(info, (resp) => {
      this.setState({
        data: resp.data.company,
      });
      // alert(JSON.stringify(this.state.data))
    }, (error) => {

      message.error('获取公司信息失败: ' + JSON.stringify(error));
    });
  }
}

export default CompanyListView;
