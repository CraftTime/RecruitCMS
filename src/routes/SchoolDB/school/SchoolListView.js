import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from './SchoolListView.less';
import {getSchoolList, deleteSchool} from '../../../services/AppApi';
import {isSuccess, isEmpty} from '../../../utils/utils';
import * as Data from '../../../data/data';
import {LEVEL_B, LEVEL_A} from "../../../data/data";
import BaseInfoEditView from './edit/baseinfo/BaseInfoEditView';
import OtherMrgView from './edit/other/OtherMrgView';
import ProfessionalListView from './professional/ProfessionalListView';
import ScoreView from './edit/score/ScoreView';

const EDIT_TYPE_BASE_INFO = 0;
const EDIT_TYPE_SCORE_MRG = 1;
const EDIT_TYPE_OTHER_MRG = 2;
const EDIT_TYPE_PROFESSIONAL_MRG = 3;

class SchoolListView extends Component {

	constructor(props) {
		super();
		this.state = {
			selectedRowKeys: [],
			isShowDialog: false,
			isEdit: false,
			response: {},
			school: null
		};

		this.searchParam = this.getSearchParam(props);
	}

	getSearchParam(props) {
		let info = {};

		if (LEVEL_B === props.type) {
			info.levelBatch = 'B';
		} else if (LEVEL_A === props.type) {
			info.levelBatch = 'A';
		}
		return info;

	}

	componentDidMount() {
		this.refreshListView(1, Data.PAGINATION_INFO.pageSize);
	}

	render() {
		const that = this;
		const {data} = this.props;
		const {selectedRowKeys, response} = this.state;

		const columns = [
			{
				title: '序号',
				align: 'center',
				render: (val, record, index) => (
					<text>{(response.current - 1) * Data.PAGINATION_INFO.pageSize + index + 1}</text>)
			},
			{
				title: '本科批次',
				align: 'center',
				dataIndex: 'levelBatch'
			},
			{
				title: '学校名字',
				align: 'center',
				dataIndex: 'name'
			},
			{
				title: '分数管理',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (
					<Button onClick={() => this.onEdit(EDIT_TYPE_SCORE_MRG, record)} type="normal" shape="circle"
					        icon="info"/>
				),
			},
			{
				title: '其他管理',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (
					<Button onClick={() => this.onEdit(EDIT_TYPE_OTHER_MRG, record)} type="normal" shape="circle"
					        icon="info"/>
				),
			},
			{
				title: '操作',
				align: 'center',
				dataIndex: 'id',
				render: (val, record) => (<div>
						<Button onClick={() => this.onEdit(EDIT_TYPE_BASE_INFO, record)} type="normal" shape="circle"
						        icon="edit"/>

						<Popconfirm title="是否要删除该学校？"
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
			<div className={Style.flexCol}>
				{this.state.isShowDialog &&
				<Modal
					style={{marginBottom: '30rem'}}
					destroyOnClose="true"
					title={this.getOpTitle()}
					width={820}
					onCancel={() => this.onDialogDismiss()}
					visible={true}
					footer={[]}
				>
					{this.getOpView()}

				</Modal>
				}
				<div className={Style.btnLayout} style={{justifyContent: 'space-between'}}>
					<div>
						<Button className={Style.commonBtn} type="primary" onClick={() => {
							this.refreshCurrent();
						}}>刷新</Button>
						<Button className={Style.commonBtn} type="primary" onClick={() => {
							this.onEdit(EDIT_TYPE_BASE_INFO, null)
						}}>添加</Button>
						<Button className={Style.commonBtn} type="primary" onClick={() => {
							this.onEdit(EDIT_TYPE_PROFESSIONAL_MRG, null)
						}}>专业管理</Button>
					</div>

					<Input.Search
						placeholder="请输入院校名称"
						height={60}
						size="large"
						onChange={(event) => this.refreshByName(event.target.value)}
						className={Style.searchInput}
					/>
				</div>
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

	onDialogDismiss(callback) {
		this.setState({
			isShowDialog: false,
		}, function () {
			if (callback) {
				callback()
			}
		});
	}

	refreshByName(name) {
		this.searchParam.pageIndex = 1;
		this.searchParam.searchKey = name;
		this.refreshListView(1, Data.PAGINATION_INFO.pageSize)
	}

	refreshCurrent() {
		this.refreshListView(this.state.response.current, this.state.response.pageSize)
	}

	refreshByName(name) {
		this.searchParam.pageIndex = 1;
		this.searchParam.searchKey = name;
		this.refreshListView(1, Data.PAGINATION_INFO.pageSize)
	}

	refreshListView(pageIndex, pageSize) {
		this.searchParam.pageIndex = pageIndex;
		this.searchParam.pageSize = pageSize;

		this.getSchoolList(this.searchParam);
	}

	onPageChange(page, pageSize) {
		this.refreshListView(page.current, page.pageSize);
	}

	onEdit(type, record) {
		this.setState({
			isShowDialog: true,
			school: record,
			type: type
		});
	}

	onAdd() {
		this.setState({
			isShowBaseInfoDialog: true,
			isEdit: false,
		});
	}

	getOpView() {
		let that = this
		switch (this.state.type) {
			case EDIT_TYPE_BASE_INFO:
				return (
					<BaseInfoEditView
						actionTitle="xx"
						school={this.state.school}
						onDialogDismiss={() => this.onDialogDismiss(function () {
							that.refreshCurrent()
						})}
					/>
				);
				break;

			case EDIT_TYPE_SCORE_MRG:
				return (
					<ScoreView
						school={this.state.school}
					/>
				);
				break;

			case EDIT_TYPE_OTHER_MRG:
				return (
					<OtherMrgView
						school={this.state.school}
					/>
				);
				break;

			case EDIT_TYPE_PROFESSIONAL_MRG:
				return (
					<ProfessionalListView/>
				);
				break;
		}
	}

	getOpTitle() {

		switch (this.state.type) {
			case EDIT_TYPE_BASE_INFO:

				return isEmpty(this.state.school) ? '新增学校信息' : `${this.state.school.name}-信息编辑`;
				break;

			case EDIT_TYPE_SCORE_MRG:
				return `${this.state.school.name}-分数管理`;
				break;

			case EDIT_TYPE_OTHER_MRG:
				return `${this.state.school.name}-其他管理`;
				break;
			case EDIT_TYPE_PROFESSIONAL_MRG:
				return `专业管理`;
				break;
		}
	}

	getSchoolList(param) {
		let that = this;
		getSchoolList(param).then(function (response) {

			if (isSuccess(response)) {
				that.setState({
					response: response.response
				});
				console.log("获取学校列表成功");
			} else {
				message.error("获取学校列表失败 error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error("获取学校列表失败 error: " + JSON.stringify(error));
		});

	}

	onDelClick(id) {
		let param = {
			id: id
		};
		let that = this;
		deleteSchool(param).then(function (response) {
			if (isSuccess(response)) {
				message.success('学校删除成功');
				that.refreshCurrent();
			} else {
				message.error('学校删除失败 failed: ' + JSON.stringify(response));
			}
		}).catch(function (error) {
			message.error('学校删除失败 error: ' + JSON.stringify(error));
		})
	}

}

export default SchoolListView;
