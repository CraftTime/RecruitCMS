import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from "../style.less";
import * as Data from '../../../data/data';
import PaginationTable from '../../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../../services/RecruitApi';
import EditView from './EditView';
import {isEmpty} from "../../../utils/utils";


class SalaryListView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [{key:0,minSalary:"6k",maxSalary:"10k"}],
			loading: false,
			currIndex: 1,
			isShowDialog: false,
			info: {},
      count:1,
		};
	}

	componentWillMount() {
		this.refreshList();
	}


	render() {
		let {data, loading, isShowDialog, info,modifyIdx,count} = this.state;
		const columns = [
			{
				title: '最低薪水',
				align: 'center',
				dataIndex: 'minSalary',
			},
			{
				title: '最高薪水',
				align: 'center',
				dataIndex: 'maxSalary',
			},
			{
				title: '操作',
				align: 'center',
				dataIndex: 'id',
				render: (val, record,index) => (<div>
						<Button className={Style.mainOperateBtn}  onClick={() => this.onEdit(record,index)} type="normal" shape="circle" icon="edit"/>

						<Popconfirm title="是否要删除该选项？"
						            onConfirm={() => {
							            this.onDelClick(record.key)
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
          title={isEmpty(info) ? '新增年龄选项' : '编辑年龄选项'}
          onCancel={() => this.onDialogCancel()}
          visible={true}
          footer={null}
        >
          <EditView
            info={info}
            count={count}
            modifySucess={(age) => {
              if(modifyIdx==-1){
                this.setState({count:count+1})
                message.success('增添成功');
                data.push(age);

              } else {
                message.success('修改成功');
                data[modifyIdx].minSalary = age.minSalary;
                data[modifyIdx].maxSalary = age.maxSalary;
              }
              this.setState({
                isShowDialog: false,
              });
            }}
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
          }}> 刷新 </Button>
          <Button className={Style.mainOperateBtn} type="primary" onClick={() => {
            this.onEdit(null,-1);
          }}> 添加 </Button>
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
      currIndex: page,
    }, () => {
      this.refreshList();
    });
  }

  refreshList() {
    let info = {
      pageIndex: this.state.currIndex,
      pageSize: Data.PAGINATION_INFO.pageSize
    };

    RecruitApi.listAge(info, (resp) => {
      this.setState({
        data: resp.data,
      });
    }, (error) => {
      message.error('获取年龄失败: ' + JSON.stringify(error));
    });
  }

  onDelClick(key) {

    const data = [...this.state.data];
    this.setState({ data: data.filter(item => item.key !== key) });

    // RecruitApi.deleteAge(id, (resp) => {
    //   message.success('删除年龄成功');
    //   this.refreshList();
    // }, (error) => {
    //
    // });
  }

  onDialogCancel() {
    this.setState({
      isShowDialog: false,
    })
  }

  onEdit(info,index) {
    this.setState({
      modifyIdx: index,
      info: info,
      isShowDialog: true,
    });
  }

}


export default SalaryListView;
