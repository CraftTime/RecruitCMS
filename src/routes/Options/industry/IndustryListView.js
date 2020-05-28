import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from "../style.less";
import * as Data from '../../../data/data';
import PaginationTable from '../../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../../services/RecruitApi';
import EditView from './EditView';
import {isEmpty} from "../../../utils/utils";
import IndustryDetail from "./Detail/IndustryDetail";



class IndustryListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      currIndex: 1,
      pageSize: Data.PAGINATION_INFO.pageSize,
      isShowDialog: false,
      isShowDetail: false,
      info: {}
    };
  }

  componentWillMount() {
    this.refreshList();
  }


  render() {
    let {data, loading, isShowDialog, info, isShowDetail} = this.state;
    const columns = [
      {
        title: '行业',
        align: 'center',
        dataIndex: 'industryName',
      },
      {
        title: '操作',
        align: 'center',
        dataIndex: 'id',
        render: (val, record) => (<div>
            {/*<Button className={Style.mainOperateBtn}  onClick={() => this.detail(record)} type="normal" shape="circle" icon="info"/>*/}
            <Button className={Style.mainOperateBtn} onClick={() => this.onEdit(record)} type="normal" shape="circle"
                    icon="edit"/>

            <Popconfirm title="是否要删除该选项？"
                        onConfirm={() => {
                          this.onDelClick(record.id)
                        }}
                        okText="确定" cancelText="取消">
              <Button type="normal" shape="circle" icon="delete"/>
            </Popconfirm>

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
          title={isEmpty(info) ? '新增行业选项' : '编辑行业选项'}
          onCancel={() => this.onDialogCancel()}
          visible={true}
          footer={null}
        >
          <EditView
            info={info}
            onDialogDismiss={() => {
              this.setState({
                isShowDialog: false
              }, () => {
                this.refreshList();
              })
            }}
          />
        </Modal>
        }

        {isShowDetail &&
        <Modal
          style={{marginBottom: '30rem'}}
          destroyOnClose="true"
          width={820}
          title={'行业详情'}
          onCancel={() => this.onDetailDismiss()}
          visible={true}
          footer={null}
        >
          <IndustryDetail id={info.id}/>
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
      pageSize: page.pageSize
    }, () => {
      this.refreshList();
    });
  }

  refreshList() {
    let info = {
      pageIndex: this.state.currIndex,
      pageSize: this.state.pageSize,
      pid:0,
    };

    RecruitApi.listIndustry(info, (resp) => {
        this.setState({
          data: resp.data
        });
      },
      (error) => {
        message.error('获取行业失败: ' + JSON.stringify(error));
      });
  }

  onDelClick(id) {
    RecruitApi.deleteIndustry(id, (resp) => {
      message.success('删除行业成功');
      this.refreshList();
    }, (error) => {

    });
  }

  detail(info) {
    this.setState({
      info: info,
      isShowDetail: true,
    });
  }

  onDialogCancel() {
    this.setState({
      isShowDialog: false
    })
  }
  onDetailDismiss(){
    this.setState({
      isShowDetail: false
    })
  }
  onEdit(info) {
    this.setState({
      info: info,
      isShowDialog: true,
    });
  }

}

export default IndustryListView;
