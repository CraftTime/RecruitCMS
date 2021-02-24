import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from "../style.less";
import * as Data from '../../../data/data';
import PaginationTable from '../../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../../services/RecruitApi';
import EditView from './EditView';
import {isEmpty} from "../../../utils/utils";


class PositionTypeListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      currIndex: 1,
      pageSize: Data.PAGINATION_INFO.pageSize,
      isShowDialog: false,
      info: {},
      count: 1,
    };
  }

  componentWillMount() {
    this.refreshList();
  }


  render() {
    let {data, loading, isShowDialog, info, count} = this.state;
    const columns = [
      {
        title: '职业类型',
        align: 'center',
        dataIndex: 'name',
      },
      {
        title: '操作',
        align: 'center',
        dataIndex: 'id',
        render: (val, record, index) => (<div>
            <Button className={Style.mainOperateBtn} onClick={() => this.onEdit(record, index)} type="normal"
                    shape="circle"
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
          title={isEmpty(info) ? '新增职业类型选项' : '编辑职业类型选项'}
          onCancel={() => this.onDialogCancel()}
          visible={true}
          footer={null}
        >
          <EditView
            info={info}
            count={count}
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


        <div className={Style.btnLayout}>
          <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
            this.refreshList();
          }}>刷新</Button>
          <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
            this.onEdit(null, -1);
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
      pageSize:page.pageSize
    }, () => {
      this.refreshList();
    });
  }

  refreshList() {
    let info = {
      pageIndex: this.state.currIndex,
      pageSize: this.state.pageSize
    };

    RecruitApi.listPositionType(info, (resp) => {
      this.setState({
        data: resp.data,
      });
    }, (error) => {
      message.error('获取职业类型: ' + JSON.stringify(error));
    });
  }

  onDelClick(id) {

    // const data = [...this.state.data];
    // this.setState({data: data.filter(item => item.key !== key)});

    RecruitApi.deletePositionType(id, (resp) => {
      message.success('删除职业类型成功');
      this.refreshList();
    }, (error) => {

    });
  }

  onDialogCancel() {
    this.setState({
      isShowDialog: false,
    })
  }

  onEdit(info, index) {
    this.setState({
      modifyIdx: index,
      info: info,
      isShowDialog: true,
    });
  }

}


export default PositionTypeListView;
