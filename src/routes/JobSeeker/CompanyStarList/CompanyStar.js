import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from "../style.less";
import * as Data from '../../../data/data';
import PaginationTable from '../../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../../services/RecruitApi';
import {isEmpty} from '../../../utils/utils';


class CompanyStarListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      currIndex: 1,
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
        title: '姓名',
        align: 'center',
        dataIndex: 'realName',
      },
      {
        title: '收藏公司',
        align: 'center',
        dataIndex: 'companyName',
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
          <EditView
            info={info}
            onDialogDismiss={()=> {
              this.setState({
                isShowDialog: false
              }, () => {
                this.refreshList();
              })
            }}
          />
        </Modal>
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
    let info = {
      CompanySeekerId: this.props.id,
      pageIndex: this.state.currIndex,
      pageSize: Data.PAGINATION_INFO.pageSize
    };

    RecruitApi.CompanyStarList(info, (resp)=> {
      this.setState({
        data: resp.data,
      });
      // alert(JSON.stringify(this.state.data))
    }, (error)=> {
      message.error('请求异常，获取失败');
      // message.error('' + JSON.stringify(error));
    });
  }

  onDelClick(id) {
    RecruitApi.deleteCompanyStart(id, (resp)=> {
      message.success('删除成功');
      this.refreshList();
    }, (error)=> {

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

export default CompanyStarListView;
