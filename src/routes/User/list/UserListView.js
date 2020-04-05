import React, {Component} from 'react';
import {Table, Modal, Popconfirm, Input, message, Button} from 'antd';
import Style from './User.less';
import * as Data from '../../../data/data';
import EditView from './EditView';
import {getUserList, deleteUser} from '../../../services/AppApi';
import {isSuccess} from '../../../utils/utils';
import {USER_TITLE_MAP} from '../../../data/data';
import {getFormatDate} from '../../../utils/DateUtils';
import PurchaseView  from './PurchaseView';


const TYPE_EDIT_BASE_INFO = 0;
const TYPE_TRANSACTION = 1;

class UserListView extends Component {

	constructor(props) {
		super();
		this.state = {
			isShowEditDialog: false,
			response: {},
			user: null,
			type: TYPE_EDIT_BASE_INFO
		}
	}

	componentDidMount() {
		this.refreshList(1, Data.PAGINATION_INFO.pageSize);
	}

	refreshByKey(key) {
		 this.refreshList(1, Data.PAGINATION_INFO.pageSize, key)
	}

	refreshList(pageIndex, pageSize, key) {
		const param = {
			pageIndex: pageIndex,
			pageSize: pageSize,
			usernameKey: key,
		};

		let that = this;

		getUserList(param).then(function (response) {
			if (isSuccess(response)) {
				that.setState({
					response: response.response
				});

			} else {
				message.error("用户列表获取失败 error: " + that.props.response);
			}

		}).catch(function (error) {
			message.error("用户列表获取失败 error: " + JSON.stringify(error));
		});
	}

	render() {
		const {selectedRowKeys} = this.props;
		const {response} = this.state;
		let data = Data.USER_LIST;
		const columns = [
			{
				title: '序号',
				align: 'center',
				render: (val, record, index) => (
					<text>{(response.current - 1 ) * Data.PAGINATION_INFO.pageSize + index + 1}</text>)
			},
			{
				title: '姓名',
				align: 'center',
				dataIndex: 'realName'
			},
			{
				title: '账户名',
				align: 'center',
				dataIndex: 'username'
			},
			{
				title: '用户类型',
				align: 'center',
				dataIndex: 'roleId',
				render: (val, record, index) => (
					<text>{USER_TITLE_MAP.has(val) ? USER_TITLE_MAP.get(val) : '未知'}</text>)
			},
			// {
			// 	title: '账户名',
			// 	align: 'center',
			// 	dataIndex: 'username'
			// },

			{
				title: '手机号',
				align: 'center',
				dataIndex: 'telephone'
			},
			{
				title: '地区',
				align: 'center',
				dataIndex: 'province',
			},
			{
				title: '画室',
				align: 'center',
				dataIndex: 'beloneStudio',
			},
			{
				title: '学校',
				align: 'center',
				dataIndex: 'schoolName',
			},
			{
				title: '年级',
				align: 'center',
				dataIndex: 'schoolLevel',
			},
			{
				title: '注册时间',
				align: 'center',
				dataIndex: 'gmtCreated',
				render: (val, record, index) => (<text>{getFormatDate(val)}</text>)
			},
			{
				title: '操作',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (<div>
						<Button className={Style.commonBtn} onClick={() => this.onMrgClick(TYPE_EDIT_BASE_INFO, record)}
						        type="normal" shape="circle" icon="edit"/>
						<Button className={Style.commonBtn} onClick={() => this.onMrgClick(TYPE_TRANSACTION, record)}
						        type="normal" shape="circle" icon="transaction"/>


						<Popconfirm title="是否要删除该记录"
						            onConfirm={() => {
							            this.onDel(record)
						            }}
						            okText="确定" cancelText="取消">
							<Button type="normal" shape="circle" icon="delete"/>
						</Popconfirm>

					</div>
				),
			},
		];

		const rowSelection = {
			selectedRowKeys,
			onChange: this.handleRowSelectChange,
			getCheckboxProps: record => ({
				disabled: record.disabled,
			}),
		};

		const pagination = {
			total: response.total,
			defaultPageSize: response.size,
			pageSize: response.size,
			current: response.current
		};

		const paginationProps = {
			showSizeChanger: true,
			showQuickJumper: false,
			...pagination,
		};


		return (
			<div>
				<div className={Style.commonBtnLayout} style={{justifyContent: 'space-between'}}>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.refreshList(this.state.response.current, Data.PAGINATION_INFO.pageSize);
					}}>刷新</Button>


					<Input.Search
						placeholder="搜索"
						size="large"
						onChange={(event)=> this.refreshByKey(event.target.value)}
						className={Style.searchInput}
					/>
				</div>
				{this.state.isShowEditDialog &&
				<Modal
					destroyOnClose="true"
					title={this.getOpTitle()}
					onCancel={() => this.onDialogDismiss(false)}
					visible={true}
					footer={[]}
				>
					{this.getOpView()}

				</Modal>
				}

				<Table
					size="small"
					bordered
					dataSource={response.records}
					pagination={paginationProps}
					columns={columns}
					onChange={this.onPageChange.bind(this)}
				/>
			</div>
		);
	}

	onPageChange(page, pageSize) {
		this.refreshList(page.current, page.pageSize);
	}

	getOpView() {
		switch (this.state.type) {

			case TYPE_TRANSACTION:
				return (
					<PurchaseView
						user={this.state.user}
						onDialogDismiss={() => this.onDialogDismiss(true)}
					/>

				);

			case TYPE_EDIT_BASE_INFO:
				return (
					<EditView
						user={this.state.user}
						onDialogDismiss={() => this.onDialogDismiss(true)}
					/>);
				break;
		}
	}

	getOpTitle() {
		switch (this.state.type) {

			case TYPE_TRANSACTION:
				return this.state.user.realName + "_用户购买情况";
				break;

			case TYPE_EDIT_BASE_INFO:
				return "用户编辑";
		}
	}

	onDialogDismiss(reload) {
		let that = this;
		this.setState({
			isShowEditDialog: false,
		}, function () {
			if (reload) {
				that.refreshList(that.state.response.current, Data.PAGINATION_INFO.pageSize)
			}
		});
	}

	onChange(type, value) {

	}

	handleSubmit(e) {
		e.preventDefault();
		const {getFieldProps, getFieldValue} = this.props.form;
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.updatePriceInfo();
			} else {
				console.log(' user input data is invalied ... ');
			}
		});
	}

	updatePriceInfo() {
		message.info(" updatePriceInfo ")
	}

	onMrgClick(type, record) {
		this.setState({
			isShowEditDialog: true,
			user: record,
			type: type
		});
	}

	onDel(user) {
		let param = {
			id: user.id
		};
		let that = this;
		deleteUser(param).then(function (response) {
			if (isSuccess(response)) {
				message.success(' 用户删除成功');
				that.refreshList(that.state.response.current, Data.PAGINATION_INFO.pageSize);
			} else {
				message.error("用户删除失败 error: " + response);
			}

		}).catch(function (error) {
			message.error("用户删除失败 error: " + JSON.stringify(error));
		});
	}
}

export default UserListView;
