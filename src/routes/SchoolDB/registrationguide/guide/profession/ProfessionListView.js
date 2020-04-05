import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import {getSchoolProfessionalList} from '../../../../../services/AppApi';
import {isSuccess} from '../../../../../utils/utils';
import * as Data from '../../../../../data/data';
import Style from '../../../../../css/common.less';
import IntroduceEditView from './IntroduceEditView';

class ProfessionListView extends Component {

	constructor(props) {
		super();
		this.state = {
			response: [],
			isShowDialog: false,
			profession: null
		};
	}

	componentDidMount() {
		this.refreshListView();
	}

	onDetailBtnClicked(record) {
		this.setState({
			profession: record,
			isShowDialog: true
		})

	}

	render() {
		const {response} = this.state;
		const {selectedRowKeys} = this.props;
		const columns = [
			{
				title: '序号',
				align: 'center',
				render: (val, record, index) => (
					<text>{index + 1}</text>)
				// <text>{(response.current - 1 ) * Data.PAGINATION_INFO.pageSize + index + 1}</text>)
			},
			{
				title: '专业名称',
				align: 'center',
				dataIndex: 'professionalName'
			},
			{
				title: '介绍',
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


		return (
			<div className={Style.flexCol}>

				{this.state.isShowDialog &&
				<Modal
					destroyOnClose="true"
					title={this.state.profession.professionalName + "-" + "专业介绍"}
					onCancel={() => this.onDetailDialogDismiss()}
					visible={true}
					width={Data.MODEL_WIDTH}
					footer={[]}
				>
					<IntroduceEditView
						{...this.props}
						profession={this.state.profession}
						onDialogDismiss={()=> this.onDetailDialogDismiss()}
					/>
				</Modal>
				}

				<div className={Style.commonBtnLayout}>
					<Button type="primary" onClick={() => {
						this.refreshListView()
					}}>刷新</Button>
				</div>
				<Table
					size="small"
					bordered
					// rowSelection={rowSelection}
					dataSource={response}
					// dataSource={response.records}
					//  pagination={paginationProps}
					columns={columns}
					// onChange={this.onPageChange.bind(this)}
				/>
			</div>

		);
	}

	onPageChange(page, pageSize) {
		this.refreshListView();
	}

	onEdit() {
		this.setState({
			isShowDialog: false,
			isEdit: true,
		});
	}

	onDetailDialogDismiss() {
		this.setState({
			isShowDialog: false,
		});
	}

	refreshListView() {
		let that = this;
		getSchoolProfessionalList(this.props.schoolId).then(function (response) {

			if (isSuccess(response)) {
				that.setState({
					response: response.response
				});
				console.log("获取学校专业列表成功");
			} else {
				message.error("获取学校专业列表失败 error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error("获取学校专业列表失败 error: " + JSON.stringify(error));
		});

	}
}

export default ProfessionListView;
