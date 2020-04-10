import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from "../style.less";
import * as Data from '../../../data/data';
import PaginationTable from '../../../components/PaginationTable/PaginationTable';
import * as RecruitApi from '../../../services/RecruitApi';
import EditView from './EditView';
import {isEmpty} from "../../../utils/utils";


class EducationListView extends Component {
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
		const columns = [
			{
				title: '待遇',
				align: 'center',
				dataIndex: 'treatmentName'
			},
			{
				title: '内容',
				align: 'center',
				dataIndex: 'content'
			},
			{
				title: '操作',
				align: 'center',
				dataIndex: 'id',
				render: (val, record) => (<div>
						<Button className={Style.mainOperateBtn}  onClick={() => this.onEdit(record)} type="normal" shape="circle" icon="edit"/>

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
					title={isEmpty(info) ? '新增年龄选项' : '编辑年龄选项'}
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
					<Button className={Style.mainOperateBtn} type="primary" onClick={() => {
						this.onEdit(null)
					}}>添加</Button>
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
			currIndex: page
		}, ()=> {
			this.refreshList();
		});
	}

	refreshList() {
		let info = {
			pageIndex: this.state.currIndex,
			pageSize: Data.PAGINATION_INFO.pageSize
		};

		RecruitApi.listEducation(info, (resp)=> {
			this.setState({
				data: resp.data
			});
		}, (error)=> {
			message.error('获取学历失败: ' + JSON.stringify(error));
		});
	}

	onDelClick(id) {
		RecruitApi.deleteAge(id, (resp)=> {
			message.success('删除学历成功');
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

export default EducationListView;