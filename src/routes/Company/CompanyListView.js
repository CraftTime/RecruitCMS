import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Drawer,Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from "./style.less";
import * as Data from '../../data/data';
import PaginationTable from '../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../services/RecruitApi';
import {isEmpty} from '../../utils/utils';
import OptionsView from '../Company/Options';
import CompanyProfile from './DrawerView';
import JobProfile from "../Job/DrawerView";


class CompanyListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      currIndex: 1,
      pageSize: Data.PAGINATION_INFO.pageSize,
      isShowDialog: false,
      isShowDrawer:false,
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
      // state: 1,
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
    let {data, loading, isShowDialog,isShowDrawer, info} = this.state;
    const columns = [
      {
        title: '公司名称',
        align: 'center',
        dataIndex: 'companyName',
      },
      {
        title: '法定营业人',
        align: 'center',
        dataIndex: 'legalPerson',
      },
      {
        title: '经营状态',
        align: 'center',
        dataIndex: 'managementName',
      },
      // {
      //   title: '详情',
      //   align: 'center',
      //   dataIndex: 'id',
      //   render: (val, record) => (<div>
      //       <Button className={Style.mainOperateBtn}  onClick={() => this.onEdit(record)} type="normal" shape="circle" icon="info"/>
      //     </div>
      //   ),
      // },
      {
        title: '详情',
        align: 'center',
        dataIndex: 'id',
        render: (val, record) => (<div>
            <Button className={Style.mainOperateBtn}  onClick={() => this.drawer(record)} type="normal" shape="circle" icon="info"/>
          </div>
        ),
      },
    ];

    return (
      <div>
        {isShowDialog &&
        <Modal
          style={{ marginBottom: '30rem' }}
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
        {isShowDrawer &&
        <Drawer
          width={1000}
          title="公司信息"
          placement="right"
          closable={true}
          onClose={() => this.onDrawDismiss()}
          visible={true}
          footer={null}
        >
          <CompanyProfile startDate={info.startDate} companyName={info.companyName} id={info.id}
                          companySummary={info.companySummary} endDate={info.endDate}
                          legalPerson={info.legalPerson} registerDate={info.registerDate}
                          registerAddress={info.registerAddress}
                          unifiedCreditCode={info.unifiedCreditCode} scaleName={info.scaleName}
                          scope={info.scope} cityName={info.cityName}
                          industryName={info.industryName}   managementName={info.managementName}
          />

        </Drawer >
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
  drawer(info){
    this.setState({
      info: info,
      isShowDrawer: true,
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
  onDrawDismiss(showRefresh= false) {
    this.setState({
      isShowDrawer: false
    }, () => {
      if(showRefresh) {
        this.refreshList();
      }
    })

  }
}

export default CompanyListView;
