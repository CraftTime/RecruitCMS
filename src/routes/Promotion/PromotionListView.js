import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Switch, message, Button, Select, Table, Alert, Badge, Tooltip, Divider, Popconfirm, Modal} from 'antd';
import {isSuccess, isEmpty} from '../../utils/utils';
import * as Data from '../../data/data';
import * as DateUtils from '../../utils/DateUtils';
import Style from '../../css/common.less';
import EditView from './EditView';
import {getPromotionList, deletePromotion, updatePromotionStatus} from '../../services/AppApi';

const {Option} = Select;

class PromotionListView extends Component {

	constructor(props) {
		super();
		this.state = {
			isShowModel: false,
			response: {},
			modelTitle: '',
			video: null

		}
	}

	componentDidMount() {
		this.refreshList(1, Data.PAGINATION_INFO.pageSize);
	}


	refreshList(pageIndex, pageSize) {
		const param = {
			pageIndex: pageIndex,
			pageSize: pageSize,
			itemId: this.props.itemId
		};

		let that = this;

		getPromotionList(param).then(function (response) {
			if (isSuccess(response)) {
				that.setState({
					response: response.response
				});
				console.log('促销列表获取成功');
			} else {
				message.error("促销列表获取失败 failed: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error("促销列表获取失败 error: " + JSON.stringify(error));
		});
	}

	updateStatus(index, record, isChecked) {
		let newRecords = [...this.state.response.records];
		newRecords[index].loading = true;
		this.state.response.records = newRecords;
		let that = this;
		this.setState({
			response: this.state.response
		}, function () {
			setTimeout(function () {
				let param = {
					id: record.id,
					status: isChecked ? 1 : 0
				};

				let actionTitle = isChecked ? '开启' : '关闭';
				updatePromotionStatus(param).then(function (response) {
					if (isSuccess(response)) {
						message.success(`抢购${actionTitle}成功`);
						that.refreshList();
					} else {
						that.refreshList();
						message.error(`抢购${actionTitle}失败 failed: ` + JSON.stringify(response));
					}
				}).catch(function (error) {
					that.refreshList();
					message.error(`抢购${actionTitle}失败 error: ` + JSON.stringify(error));
				});

			}, 500)
		});


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
				title: '商品名',
				align: 'center',
				dataIndex: 'itemId',
				render: (val, record, index) => (
					<text>{Data.PRODUCT_TTILE_MAP.get(val)}</text>)
			},
			{
				title: '抢购价(元)',
				align: 'center',
				dataIndex: 'salePrice'
			},
			{
				title: '总数量',
				align: 'center',
				dataIndex: 'saleNumber'
			},
			{
				title: '剩余数量',
				align: 'center',
				dataIndex: 'remainNumber'
			},
			{
				title: '状态',
				align: 'center',
				dataIndex: 'status',
				render: (val, record, index) => (<text
						className={record.saleEnded ? Style.statusFail : Data.PROMOTION_STATUS_OPEN === val ? Style.statusSuccess : Style.statusFail}>{record.saleEnded ? '已结束' : (Data.PROMOTION_STATUS_OPEN === val ? '进行中' : '已暂停' )}</text>
				)
			},
			{
				title: '开始时间',
				align: 'center',
				dataIndex: 'beginTime',
				render: (val, record, index) => (<text>{DateUtils.getFormatDate(val)}</text>)
			},
			{
				title: '结束时间',
				align: 'center',
				dataIndex: 'endTime',
				render: (val, record, index) => (<text>{DateUtils.getFormatDate(val)}</text>)
			},

			{
				title: '操作',
				align: 'center',
				dataIndex: 'status',
				render: (val, record, index) => (<div>
						{!record.saleEnded &&
						<Switch
							checkedChildren="开" unCheckedChildren="关"
							className={Style.commonBtn}
							checked={Data.PROMOTION_STATUS_OPEN === val}
							loading={!isEmpty(record.loading) && record.loading}
							onChange={(isChecked) => this.updateStatus(index, record, isChecked)}
						/>
						}

						{!record.saleEnded && Data.PROMOTION_STATUS_OPEN === val &&
						<Tooltip
							title="暂停抢购后，再进行修改信息">
							<Button
								disabled={Data.PROMOTION_STATUS_OPEN === val}
								className={Style.commonBtn} onClick={() => this.onEdit(record)} type="normal"
								shape="circle"
								icon="edit"/>
						</Tooltip>
						}

						{!record.saleEnded && Data.PROMOTION_STATUS_OPEN !== val &&
						<Button
							disabled={Data.PROMOTION_STATUS_OPEN === val}
							className={Style.commonBtn} onClick={() => this.onEdit(record)} type="normal"
							shape="circle"
							icon="edit"/>
						}


						<Popconfirm title="是否要删除该促销产品？"
						            onConfirm={() => {
							            this.onDelClick(record)
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

		let that = this;
		let title = isEmpty(this.state.promotion) ? '新增抢购促销' : '编辑抢购促销';
		return (
			<div>
				{this.state.isShowModel &&
				<Modal
					destroyOnClose="true"
					title={title}
					onCancel={() => this.onDialogDismiss()}
					visible={true}
					footer={[]}
				>
					<EditView
						promotion={this.state.promotion}
						itemId={this.props.itemId}
						onDialogDismiss={() => this.onDialogDismiss(function () {
							that.refreshList(that.state.response.current, Data.PAGINATION_INFO.pageSize);
						})}
					/>

				</Modal>
				}

				<div className={Style.commonBtnLayout}>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.refreshList(this.state.response.current, Data.PAGINATION_INFO.pageSize);
					}}>刷新</Button>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.onAdd()
					}}>添加</Button>
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

	onPageChange(page, pageSize) {
		this.refreshList(page.current, page.pageSize);
	}

	onDialogDismiss(callback) {
		this.setState({
			isShowModel: false,
		}, function () {
			if (callback) {
				callback();
			}
		});
	}

	onChange(type, value) {
		message.info(" onChange value: " + JSON.stringify(value));

	}

	onEdit(record) {
		this.setState({
			isShowModel: true,
			promotion: record
		});
	}

	onAdd() {
		this.setState({
			isShowModel: true,
			promotion: null
		});
	}

	onDelClick(record) {
		let that = this;
		let param = {
			id: record.id
		};
		let name = Data.PRODUCT_TTILE_MAP.get(record.itemId);
		deletePromotion(param)
			.then(function (response) {
				if (isSuccess(response)) {
					that.refreshList(that.state.response.current, Data.PAGINATION_INFO.pageSize);
					message.success(`${name}-删除抢购删除成功`);
				} else {
					message.error(`${name}-删除艺考教学视频失败 failed : ` + JSON.stringify(response));
				}
			}).catch(function (e) {
			message.error(`${name}-删除艺考教学视频失败 error: ` + JSON.stringify(e));
		});
	}

}

export default PromotionListView;
