import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal , Drawer } from 'antd';
import Style from './style.less';
import * as Data from '../../data/data';
import PaginationTable from '../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../services/RecruitApi';
import {isEmpty} from '../../utils/utils';
import OptionsView from './OptionsView';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import BasicProfile from './DrawerView';

class JobSeekerListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      currIndex: 1,
      pageSize: Data.PAGINATION_INFO.pageSize,
      info: {},
      isShowDetail: false,
      isShowDrawer: false,
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

    RecruitApi.infoList(info, (resp)=> {
      this.setState({
        data: resp.data,
      });
      // alert(JSON.stringify(this.state.data))
    }, (error)=> {
      message.error('反馈数据获取失败: ' + JSON.stringify(error))
    });
  }

  render() {
    let {data, loading, info, isShowDetail,isShowDrawer,} = this.state;

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
        title: '查看简历',
        align: 'center',
        dataIndex: 'id',
        render: (val, record) => (<div>
            <Button className={Style.mainOperateBtn}  onClick={() => this.drawer(record)} type="normal" shape="circle" icon="info"/>
          </div>
        ),
      },
      // {
      //   title: '面试记录',
      //   align: 'center',
      //   dataIndex: 'id',
      //   render: (val, record) => (<div>
      //       <Button className={Style.mainOperateBtn}  onClick={() => this.drawer(record)} type="normal" shape="circle" icon="info"/>
      //     </div>
      //   ),
      // },
      {
        title: '收藏与屏蔽信息',
        align: 'center',
        dataIndex: 'id',
        render: (val, record) => (<div>
            <Button className={Style.mainOperateBtn}  onClick={() => this.detail(record)} type="normal" shape="circle" icon="info"/>
          </div>
        ),
      },

    ];

    return (
      <PageHeaderLayout title="求职者信息管理" content="">
        <Card bordered={false}>
      <div>
        {isShowDetail &&
        <Modal
          style={{ marginBottom: '30rem' }}
          destroyOnClose="true"
          width={850}
          title={'收藏与屏蔽信息'}
          onCancel={() => this.onDetailDismiss()}
          visible={true}
          footer={null}
        >
         <OptionsView id={info.id}/>
        </Modal>
        }
        {isShowDrawer &&
        <Drawer
          width={1000}
          title="简历信息"
          placement="right"
          closable={true}
          onClose={() => this.onDrawDismiss()}
          visible={true}
          footer={null}
        >
         <BasicProfile avatar={info.avatar} id={info.id}/>
        </Drawer >
        }
        <div className={Style.btnLayout}>
          <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
            this.refreshList()
          }}>刷新</Button>
        </div>

        <PaginationTable
          dataSource={data}
          loading={loading}
          columns={columns}
          onPageChange={(page, pageSize)=> {
            this.onPageChange(page, pageSize)
          }}
        />
      </div>
      </Card>
      </PageHeaderLayout>

    );

  }

  onPageChange(page, pageSize) {
    this.setState({
      currIndex: page.current,
      pageSize: page.pageSize,
    }, ()=> {
      this.refreshList();
    });
  }

  detail(info) {
    this.setState({
      info: info,
      isShowDetail: true,
    });
  }

  drawer(info){
   this.setState({
    info: info,
    isShowDrawer: true,
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

export default JobSeekerListView;
