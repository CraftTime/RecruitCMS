import React, {Component} from 'react';
import {Tabs, Card, Table, Modal, Popconfirm, Divider, message, Button} from 'antd';
import * as Data from '../../../data/data';
import Style from '../../../css/common.less';
import {getInstitutionApplyList, deleteInstitutionApply} from '../../../services/AppApi';
import SignUpEditView from "./SignUpEditView";
import * as DateUtils from '../../../utils/DateUtils';


class SignUpListView extends Component {

	constructor(props) {
		super();
		this.state = {
			isShowModel: false,
			response: [],
			info: null
		}
	}

	componentDidMount() {
		this.refreshInfoList(1, Data.PAGINATION_INFO.pageSize);
	}

	refreshInfoList(pageIndex, pageSize) {
		let id = this.props.studioInfo.id;
		const param = {
			pageIndex: pageIndex,
			pageSize: pageSize,
			institutionId: id,
		};

		let that = this;

		getInstitutionApplyList(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.setState({
					response: response.response,
				});

			} else {
				message.error(" 报名信息列表获取失败 studioId: " + id);
			}

		}).catch(function (error) {
			message.error(" 报名信息列表获取失败 studioId: " + id);
		});
	}

	render() {
		const {selectedRowKeys, studioInfo} = this.props;
		const {response} = this.state;
		const columns = [
			{
				title: '序号',
				align: 'center',
				render: (val, record, index) => (<text>{index + 1}</text>)
			},
			{
				title: '姓名',
				align: 'center',
				dataIndex: 'realName',
			},
			{
				title: '手机号码',
				align: 'center',
				dataIndex: 'telephone'
			},
			{
				title: '学校',
				align: 'center',
				dataIndex: 'schoolName'
			},
			{
				title: '年级',
				align: 'center',
				dataIndex: 'schoolLevel'
			},
			{
				title: '报名时间',
				align: 'center',
				dataIndex: 'gmtCreated',
				render: (val, record, index) => (<text>{DateUtils.getFormatDate(val)}</text>)
			},
			{
				title: '操作',
				align: 'center',
				dataIndex: 'operator',
				render: (val, record) => (<div>
						<Button className={Style.commonBtn} onClick={() => this.onEdit(record)} type="normal"
						        shape="circle"
						        icon="edit"/>

						<Popconfirm title="是否删除该报名信息？"
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
				{this.state.isShowModel &&
				<Modal
					destroyOnClose="true"
					title="编辑报名信息"
					onCancel={() => this.onDialogDismiss()}
					visible={true}
					width={Data.MODEL_WIDTH}
					footer={[]}
				>
					<SignUpEditView
						info={this.state.info}
						onDialogDismiss={()=>this.onDialogDismiss()}
						studioInfo={this.props.studioInfo}
					/>
				</Modal>
				}

				<div className={Style.commonBtnLayout}>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.refreshInfoList(1, Data.PAGINATION_INFO.pageSize);
					}}>刷新</Button>
				</div>

				<Table
					size="small"
					bordered
					loading={this.state.loading}
					// rowSelection={rowSelection}
					dataSource={response.records}
					pagination={paginationProps}
					columns={columns}
					onChange={this.onPageChange.bind(this)}
				/>

			</div>
		);
	}

	onPageChange(page, pageSize) {
		this.refreshInfoList(page.current, page.pageSize);
	}

	onDialogDismiss() {
		this.setState({
			isShowModel: false,
		}, function () {
			this.refreshInfoList(1, Data.PAGINATION_INFO.pageSize);
		});
	}

	onChange(type, value) {
		message.info(" onChange value: " + JSON.stringify(value));

	}

	onEdit(record) {
		this.setState({
			isShowModel: true,
			info:record
		});
	}

	onDelClick(id) {
		let that = this;
		const param = {
			id: id
		};
		deleteInstitutionApply(param)
			.then(function (response) {
				if (response.meta.code === 0) {
					that.refreshInfoList(1, Data.PAGINATION_INFO.pageSize);
					message.success("删除报名记录成功");
				} else {
					message.error("删除报名记录 errorMsg: " + JSON.stringify(response.meta));
				}
			}).catch(function (e) {
				message.error("删除报名记录 errorMsg: " + JSON.stringify(e));
		});
	}

}

export default SignUpListView;
