import React, {Component} from 'react';
import {Table, Modal, Popconfirm, Divider, message, Button} from 'antd';
import * as Data from '../../../../data/data';
import {isSuccess} from '../../../../utils/utils';
import {getCultureScoreCalculationList} from '../../../../services/AppApi';
import * as DateUtils from '../../../../utils/DateUtils';

class RecordListView extends Component {

	constructor(props) {
		super();
		this.state = {
			response:{},
		}
	}
	componentDidMount() {
		this.refreshRecordList(1, Data.PAGINATION_INFO.pageSize);
	}


	refreshRecordList(pageIndex, pageSize) {
		const param = {
			pageIndex: pageIndex,
			pageSize: pageSize,
		};

		let that = this;

		getCultureScoreCalculationList(param).then(function (response) {
			if (isSuccess(response)) {
				that.setState({
					response: response.response
				});

			} else {
				message.error("文化分测算记录列表获取失败 error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error("文化分测算记录列表获取失败: error" + JSON.stringify(error));
		});
	}


	render() {
		const {data, selectedRowKeys} = this.props;
		const {response} = this.state;
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
				title: '手机号码',
				align: 'center',
				dataIndex: 'telephone'
			},
			{
				title: '用户类别',
				align: 'center',
				dataIndex: 'roleName'
			},
			{
				title: '地区',
				align: 'center',
				dataIndex: 'province'
			},
			{
				title: '年级',
				align: 'center',
				dataIndex: 'schoolLevel'
			},
			{
				title: '画室',
				align: 'center',
				dataIndex: 'beloneStudio'
			},

			{
				title: '测算院校',
				align: 'center',
				dataIndex: 'recordSchoolName'
			},
			{
				title: '测算专业',
				align: 'center',
				dataIndex: 'professionalName'
			},
			{
				title: '测算专业分',
				align: 'center',
				dataIndex: 'professionalScore'
			},
			{
				title: '相对文化分',
				align: 'center',
				dataIndex: 'cultureScore'
			},
			{
				title: '备注',
				align: 'center',
				dataIndex: 'formulaDesc'
			},
			{
				title: '测算时间',
				align: 'center',
				dataIndex: 'gmtCreated',
				render: (val, record, index) => (<text>{DateUtils.getFormatDate(val)}</text>)
			},
		];


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
			<Table
				size="small"
				dataSource={response.records}
				pagination={paginationProps}
				columns={columns}
				onChange={this.onPageChange.bind(this)}
			/>
		);
	}

	onPageChange(page, pageSize) {
		this.refreshRecordList(page.current, page.pageSize);
	}
}

export default RecordListView;
