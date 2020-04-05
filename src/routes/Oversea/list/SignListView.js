import React, {Component} from 'react';
import Style from './User.less';
import {Table, Modal, Input, Divider, message, Button, Radio} from 'antd';
import {getSignList , getUserList} from '../../../services/AppApi';
import {getFormatDate} from '../../../utils/DateUtils';
import * as Data from '../../../data/data';


class SignListView extends Component {

	constructor(props) {
		super();
		this.state = {
			isShowEditDialog: false,
			response: {},
			orderStatusType: Data.STATUS_ALL
		};

		this.searchParam = {
			pageIndex: 1,
			pageSize: 10
		};
	}

	componentDidMount() {
		this.refresh();
	}

	refreshByKey(searchKey) {
		this.searchParam.pageIndex = 1;
		this.searchParam.searchKey = searchKey;
		this.refresh();
	}

	refresh() {
		let that = this;
		this.searchParam.status = this.state.orderStatusType;
		getSignList(this.searchParam).then(function (response) {
			that.setState({
				response: response.data
			})
		}).catch(function (error) {
			message.error('获取报名列表失败 error: ' + JSON.stringify(error));
		})
	}

	render() {
		const {selectedRowKeys} = this.props;
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
				dataIndex: 'username'
			},
			{
				title: '金额(元)',
				align: 'center',
				dataIndex: 'payment'
			},
			{
				title: '订单号',
				align: 'center',
				dataIndex: 'order_no',
			},
			{
				title: '订单状态',
				align: 'center',
				dataIndex: 'status',
				render: (val, record, index) => (<text className={0 === val ? Style.unPaidStatus : null}>
					{0 === val ? '未支付': '已支付'}
				</text>)
			},
			{
				title: '手机号',
				align: 'center',
				dataIndex: 'telephone'
			},
			{
				title: '邮箱',
				align: 'center',
				dataIndex: 'email',
			},
			{
				title: '意向专业',
				align: 'center',
				dataIndex: 'profession',
			},
			{
				title: '创建时间',
				align: 'center',
				dataIndex: 'gmt_created',
				render: (val, record, index) => (<text>{getFormatDate(val)}</text>)
			},
			{
				title: '支付时间',
				align: 'center',
				dataIndex: 'payment_time',
				render: (val, record, index) => (<text>{getFormatDate(val)}</text>)
			}
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

					<div style={{marginBottom: '1rem', color: '#2895FC'}}>
						订单状态：
						<Radio.Group onChange={(event) => this.orderStatusTypeChange(event.target.value)} defaultValue="-1">
							<Radio.Button value="-1">全部</Radio.Button>
							<Radio.Button value="1">已支付</Radio.Button>
							<Radio.Button value="0">未支付</Radio.Button>
						</Radio.Group>
					</div>

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
		this.searchParam.pageIndex = page.current;
		this.refresh();
	}


	orderStatusTypeChange(type) {
		let that = this;
		this.setState({
			orderStatusType:type
		}, function () {
			that.searchParam.pageIndex = 1;
			that.refresh();
		})
	}


}

export default SignListView;
