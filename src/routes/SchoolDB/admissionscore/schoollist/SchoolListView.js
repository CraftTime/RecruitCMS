import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from './SchoolListView.less';
import ProfessionListView from './professionlist/ProfessionListView';
import * as Data from '../../../../data/data';
import {getChinaSchoolList} from '../../../../services/AppApi';
import {LEVEL_B} from "../../../../data/data";
import {LEVEL_A} from "../../../../data/data";


const SCORE_MRG = 1;
const OTHER_MRG = 2;

class SchoolListView extends Component {

	constructor(props) {
		super();
		this.state = {
			selectedRowKeys: [],
			isShowDialog: false,
			isEdit: false,
			currArticleId: -1,
			response: {},

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
		this.refreshList(1, Data.PAGINATION_INFO.pageSize);
	}

	refreshByName(name) {
		this.searchParam.pageIndex = 1;
		this.searchParam.searchKey = name;
		this.refreshList(1, Data.PAGINATION_INFO.pageSize)
	}


	refreshList(pageIndex, pageSize) {
		this.searchParam.pageIndex = pageIndex;
		this.searchParam.pageSize = pageSize;

		let that = this;

		getChinaSchoolList(this.searchParam).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.setState({
					response: response.response
				});

			} else {
				message.error("学校列表获取失败 error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error("学校列表获取失败 error: " + JSON.stringify(error));
		});
	}

	render() {
		const {data} = this.props;
		const {response, selectedRowKeys} = this.state;

		const columns = [
			{
				title: '序号',
				align: 'center',
				render: (val, record, index) => (
					<text>{(response.current - 1 ) * Data.PAGINATION_INFO.pageSize + index + 1}</text>)
			},
			{
				title: '学校名字',
				align: 'center',
				dataIndex: 'name'
			},
			{
				title: '专业信息',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (
					<Button onClick={() => this.onEdit(SCORE_MRG, record)} type="normal" shape="circle" icon="info"/>
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
				{this.state.isShowDialog &&
				<Modal
					destroyOnClose="true"
					title={this.state.school.name + "-专业列表"}
					onCancel={() => this.onDialogDismiss()}
					visible={true}
					footer={[]}
				>
					<ProfessionListView
						school={this.state.school}
					/>
				</Modal>
				}
				<div className={Style.searchBtnLayout}>
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
		this.refreshList(page.current, page.pageSize);
	}

	onEdit(type, record) {
		this.setState({
			isShowDialog: true,
			isEdit: true,
			school: record,
			type: type
		});
	}

	onPageChange(page, pageSize) {
		this.refreshList(page.current, page.pageSize);
	}

	onDialogDismiss() {
		this.setState({
			isShowDialog: false,
		});
	}
}

export default SchoolListView;
