import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal,Col, Row} from 'antd';
import Style from '../../Home/style.less';
import * as Data from '../../../data/data';
import PaginationTable from '../../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../../services/RecruitApi';
import {isEmpty} from "../../../utils/utils";
import EditView from "../Root/EditView";

class RootListView extends Component {
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

  refreshList() {
    let info = {
      pageIndex: this.state.currIndex,
      pageSize: Data.PAGINATION_INFO.pageSize
    };
    // alert(JSON.stringify(info));
    RecruitApi.RootInfo(info, (resp) => {
      this.setState({
        data: resp.data,
      });
      // alert(JSON.stringify(this.state.data));
    }, (error) => {
      message.error('反馈数据获取失败: ' + JSON.stringify(error))
    });
  }

  render() {


    let {data, loading, isShowDialog, info} = this.state;

    const columns = [
      {
        title: ' 用户权限',
        align: 'center',
        dataIndex: 'userId',
      },
      {
        title: '管理员权限',
        align: 'center',
        dataIndex: 'roleId',
      },
      {
        title: '操作',
        align: 'center',
        dataIndex: 'id',
        render: (val, record) => (<div>
            <Button className={Style.mainOperateBtn} onClick={() => this.onEdit(record)} type="normal" shape="circle"
                    icon="edit"/>

            <Popconfirm title="是否要删除该关于？"
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
          width={820}
          title={isEmpty(info) ? '新增反馈' : '编辑反馈'}
          onCancel={() => this.onDialogDismiss()}
          visible={true}
          footer={null}
        >
          <EditView
            info={info}
            onDialogDismiss={() => this.onDialogDismiss(true)}
          />
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

        {/*<PaginationTable*/}
        {/*  dataSource={data}*/}
        {/*  loading={loading}*/}
        {/*  columns={columns}*/}
        {/*  onPageChange={(page, pageSize) => {*/}
        {/*    this.onPageChange(page, pageSize)*/}
        {/*  }}*/}
        {/*/>*/}
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
          </Row>
        </div>,
        <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>);
  }

  onPageChange(page, pageSize) {
    this.setState({
      currIndex: page.current,
    }, () => {
      this.refreshList();
    });
  }

  onEdit(info) {
    this.setState({
      info: info,
      isShowDialog: true,
    });
  }

  onDelClick(id) {
    RecruitApi.deleteRoot(id, (resp) => {
      message.success('删除反馈成功');
      this.refreshList();
    }, (error) => {

    });
  }

  onDialogDismiss(showRefresh = false) {
    this.setState({
      isShowDialog: false
    }, () => {
      if (showRefresh) {
        this.refreshList();
      }
    })
  }

}

export default RootListView;
