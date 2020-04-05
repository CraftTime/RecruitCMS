import React, {Component} from 'react';
import {Table, Modal, Popconfirm, Divider, message, Button, Radio} from 'antd';
import EditView from './EditView';
import {getAdmissionOrderList} from '../../../../services/AppApi';
import {isSuccess} from '../../../../utils/utils';
import * as Data from '../../../../data/data';
import {STATUS_UNPAID} from "../../../../data/data";
import Style from '../../../../css/common.less';
import * as DateUtils from '../../../../utils/DateUtils';


class OrderListView extends Component {

	constructor(props) {
		super();
		this.state = {
			isShowEditDialog: false,
			response: {},
			order:null,
			orderStatusType: Data.STATUS_ALL
		}
	}


	componentDidMount() {
		this.refreshList(1, Data.PAGINATION_INFO.pageSize);
	}


	refreshList(pageIndex, pageSize) {
		const param = {
			pageIndex: pageIndex,
			pageSize: pageSize,
		};


		if(Data.STATUS_ALL === parseInt(this.state.orderStatusType)) {
			delete param.status;
		} else {
			param.status = this.state.orderStatusType;
		}

		let that = this;
		getAdmissionOrderList(param).then(function (response) {
			if (isSuccess(response)) {
				that.setState({
					response: response.response
				});

			} else {
				message.error(" 录取测算订单获取失败 error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error(" 录取测算订单获取失败 error: " + JSON.stringify(error));
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
				title: '订单金额(元)',
				align: 'center',
				dataIndex: 'payment'
			},
			{
				title: '文理科类别剩余次数',
				align: 'center',
				dataIndex: 'admissionRateCourseCount'
			},
			{
				title: '统考成绩剩余次数',
				align: 'center',
				dataIndex: 'admissionRateProfessionalCount'
			},
			{
				title: '文化成绩剩余次数',
				align: 'center',
				dataIndex: 'admissionRateCultureCount'
			},
			{
				title: '外语成绩剩余次数',
				align: 'center',
				dataIndex: 'admissionRateForeignCount'
			},
			{
				title: '订单状态',
				align: 'center',
				dataIndex: 'status',
				render: (val, record, index) => (<text className={Data.STATUS_PAID !== val ? Style.unPaidStatus : null}>
					{Data.ORDER_STATUS_MAP.get(val)}
				</text>)
			},
			{
				title: '创建时间',
				align: 'center',
				dataIndex: 'gmtCreated',
				render: (val, record, index) => (<text>{DateUtils.getFormatDate(val)}</text>)
			},
			{
				title: '付款时间',
				align: 'center',
				dataIndex: 'paymentTime',
				render: (val, record, index) => (<text>{Data.STATUS_PAID !== record.status ? "--" : DateUtils.getFormatDate(val)}</text>)
			},
			{
				title: '操作',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (<div>
						<Button onClick={() => this.onEdit(record)} type="normal" shape="circle" icon="edit"/>

						<Popconfirm title="是否要删除该院校数据？"
						            onConfirm={() => {
							            this.onDel()
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

				{this.state.isShowEditDialog &&
				<Modal
					destroyOnClose="true"
					title="编辑录取测算订单"
					onCancel={() => this.onDialogDismiss(false)}
					visible={true}
					footer={[]}
				>
					<EditView
						order={this.state.order}
						onDialogDismiss={()=>this.onDialogDismiss(true)}
					/>
				</Modal>
				}

				<div style={{marginBottom: '1rem', color: '#2895FC'}}>
					订单状态：
					<Radio.Group onChange={(event) => this.orderStatusTypeChange(event.target.value)} defaultValue="-1">
						<Radio.Button value="-1">全部</Radio.Button>
						<Radio.Button value="2">已支付</Radio.Button>
						<Radio.Button value="3">未支付</Radio.Button>
					</Radio.Group>
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

	onPageChange(page, pageSize) {
		this.refreshList(page.current, Data.PAGINATION_INFO.pageSize);
	}

	onDialogDismiss(reload) {
		let that = this;
		this.setState({
			isShowEditDialog: false,
		}, function () {
			if(reload) {
				that.refreshList(that.state.response.current, Data.PAGINATION_INFO.pageSize)
			}
		});
	}


	onEdit(record) {
		this.setState({
			isShowEditDialog: true,
			order: record
		});
	}

	onDel() {
		this.setState({
			isShowEditDialog: true
		});
	}

	orderStatusTypeChange(type) {
		let that = this;
		this.setState({
			orderStatusType:type
		}, function () {
			that.refreshList(1, Data.PAGINATION_INFO.pageSize);
		})
	}
}

export default OrderListView;
