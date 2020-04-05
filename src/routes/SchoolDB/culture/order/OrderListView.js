import React, {Component} from 'react';
import {Table, Modal, Popconfirm, Divider, message, Button, Radio} from 'antd';
import EditView from './EditView';
import * as Data from '../../../../data/data';
import {isSuccess} from '../../../../utils/utils';
import * as Style from '../../../../css/common.less';
import {getCultureScoreOrderList} from '../../../../services/AppApi';
import * as DateUtils from '../../../../utils/DateUtils';


class OrderListView extends Component {

	constructor(props) {
		super();
		this.state = {
			response:{},
			order: null,
			orderStatusType: Data.STATUS_ALL
		}
	}

	componentDidMount() {
		this.refreshOrderList(1, Data.PAGINATION_INFO.pageSize);
	}

	refreshOrderList(pageIndex, pageSize) {
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

		getCultureScoreOrderList(param).then(function (response) {
			if (isSuccess(response)) {
				that.setState({
					response: response.response
				});

			} else {
				message.error("文化分测算订单获取失败 error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error("文化分测算订单获取失败: error" + JSON.stringify(error));
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
				title: '订单编号',
				align: 'center',
				dataIndex: 'orderNo'
			},
			{
				title: '订单金额',
				align: 'center',
				dataIndex: 'payment'
			},
			{
				title: '订单状态',
				align: 'center',
				dataIndex: 'status',
				render: (val, record, index) => (<text className={Data.STATUS_PAID !== val? Style.unPaidStatus : null}>
					{Data.ORDER_STATUS_MAP.get(val)}
				</text>)
			},
			{
				title: '购买的次数',
				align: 'center',
				dataIndex: 'cultureCalculateCount'
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
				render: (val, record) => (
					<Button onClick={() => this.onEdit(record)} type="normal" shape="circle" icon="edit"/>
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
					title="编辑文化分测算订单"
					onCancel={() => this.onDialogDismiss()}
					visible={true}
					footer={[]}
				>
					<EditView
						onDialogDismiss={()=> this.onDialogDismiss()}
						order={this.state.order}
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
					dataSource={response.records}
					pagination={paginationProps}
					columns={columns}
					onChange={this.onPageChange.bind(this)}
				/>

			</div>
		);
	}

	onPageChange(page, pageSize) {
		this.refreshOrderList(page.current, page.pageSize);
	}

	onDialogDismiss() {
		this.setState({
			isShowEditDialog: false,
		}, function () {
			this.refreshOrderList(this.state.response.current, Data.PAGINATION_INFO.pageSize);
		});
	}


	onEdit(record) {
		this.setState({
			isShowEditDialog: true,
			order: record
		});
	}

	orderStatusTypeChange(type) {
		let that = this;
		this.setState({
			orderStatusType:type
		}, function () {
			that.refreshOrderList(1, Data.PAGINATION_INFO.pageSize);
		})
	}

}

export default OrderListView;
