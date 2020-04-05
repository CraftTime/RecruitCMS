import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from './SchoolListView.less';
import BaseInfoEditView from './detail/DetailEditView';
import ArticleEditView from '../../../Article/edit/ArticleEditView';
import {getSchoolList} from '../../../../services/AppApi';
import {isSuccess} from '../../../../utils/utils';
import * as Data from '../../../../data/data';
import {LEVEL_B, LEVEL_A} from "../../../../data/data";
import EnrollmentArticleList from './dynamics/EnrollmentArticleList';
import DetailEditView from './detail/DetailEditView';

class SchoolListView extends Component {

	constructor(props) {
		super();
		this.state = {
			selectedRowKeys: [],
			isShowBaseInfoDialog: false,
			isShowDialog: false,
			isShowDetailDialog: false,
			isEdit: false,
			currArticleId: -1,
			response: {},
			school: null
		};

		this.searchParam = this.getSearchParam(props);
	}

	getSearchParam(props) {
		let info = {};

		if(LEVEL_B === props.type) {
			info.levelBatch = 'B';
		} else if(LEVEL_A === props.type){
			info.levelBatch = 'A';
		}
		return info;

	}

	componentDidMount() {
		this.refreshListView(1, Data.PAGINATION_INFO.pageSize);
	}

	render() {
		const {data} = this.props;
		const {selectedRowKeys, response} = this.state;

		const columns = [
			{
				title: '序号',
				align: 'center',
				render: (val, record, index) => (
					<text>{(response.current - 1 ) * Data.PAGINATION_INFO.pageSize + index + 1}</text>)
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
				title: '招生动态',
				dataIndex: 'dynamics',
				align: 'center',
				render: (val, record) => (
					<Button onClick={() => this.onDynamicsBtnClicked(record)} type="normal" shape="circle" icon="edit"/>
				),
			},
			{
				title: '院校详情',
				dataIndex: 'otherMrg',
				align: 'center',
				render: (val, record) => (
					<Button onClick={() => this.onDetailBtnClicked(record)} type="normal" shape="circle" icon="edit"/>
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

		const actionTitle = this.state.isEdit ? "更新院校信息" : "新增院校";

		return (
			<div className={Style.flexCol}>
				{this.state.isShowDetailDialog &&
				<Modal
					destroyOnClose="true"
					title={this.state.school.name + "-"  + "院校详情" }
					onCancel={() => this.onDetailDialogDismiss()}
					visible={true}
					footer={[]}
				>
					<DetailEditView
						schoolId={this.state.school.id}
						schoolName={this.state.school.name}
					/>
				</Modal>
				}


				{this.state.isShowDialog &&
				<Modal
					destroyOnClose="true"
					title={this.state.school.name + "-"  + "招生动态" }
					onCancel={() => this.onDetailDialogDismiss()}
					visible={true}
					width={820}
					footer={[]}
				>
					<EnrollmentArticleList
						schoolId={this.state.school.id}
					/>
				</Modal>
				}

				<div className={Style.btnLayout}>
					<Button type="primary" onClick={() => {
						this.refreshListView()
					}}>刷新</Button>

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
					// rowSelection={rowSelection}
					dataSource={response.records}
					pagination={paginationProps}
					columns={columns}
					onChange={this.onPageChange.bind(this)}
				/>
			</div>

		);
	}

	refreshListView(pageIndex, pageSize) {
		this.searchParam.pageIndex = pageIndex;
		this.searchParam.pageSize = pageSize;

		this.getSchoolList(this.searchParam);
	}

	onPageChange(page, pageSize) {
		this.refreshListView(page.current, page.pageSize);
	}

	onDel() {

	}

	onEdit() {
		this.setState({
			isShowBaseInfoDialog: true,
			isShowDialog: false,
			isShowDetailDialog: false,
			isEdit: true,
		});
	}

	onAdd() {
		this.setState({
			isShowBaseInfoDialog: true,
			isEdit: false,
		});
	}

	onDynamicsBtnClicked(school) {
		this.setState({
			isShowBaseInfoDialog: false,
			isShowDialog: true,
			isShowDetailDialog: false,
			isEdit: true,
			school: school
		})
	}

	onDetailBtnClicked(school) {
		this.setState({
			isShowBaseInfoDialog: false,
			isShowDialog: false,
			isShowDetailDialog: true,
			isEdit: true,
			school:school
		})
	}

	onBaseInfoDialogCancel() {
		this.setState({
			isShowBaseInfoDialog: false,
			isShowDialog: false,
			isShowDetailDialog: false,
		});
	}

	refreshByName(name) {
		this.searchParam.pageIndex = 1;
		this.searchParam.searchKey = name;
		this.refreshListView(1, Data.PAGINATION_INFO.pageSize)
	}

	onDetailDialogDismiss() {
		this.setState({
			isShowBaseInfoDialog: false,
			isShowDialog: false,
			isShowDetailDialog: false,
		});
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
}

export default SchoolListView;
