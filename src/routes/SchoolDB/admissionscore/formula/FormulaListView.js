import React, {Component} from 'react';
import {Table, Modal, Popconfirm, Divider, message, Button} from 'antd';
import EditView from './EditView';
import {getAdmissionFormulaList, deleteAdmissionFormula} from '../../../../services/AppApi';
import {isSuccess} from '../../../../utils/utils';
import * as Data from '../../../../data/data';
import {STATUS_UNPAID} from "../../../../data/data";
import Style from '../../../../css/common.less';
import * as DateUtils from '../../../../utils/DateUtils';


class FormulaListView extends Component {

	constructor(props) {
		super();
		this.state = {
			isShowEditDialog: false,
			response: {},
			formula:null
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

		let that = this;
		getAdmissionFormulaList(param).then(function (response) {
			if (isSuccess(response)) {
				that.setState({
					response: response.response
				});

			} else {
				message.error(" 录取测算公式获取失败 error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error(" 录取测算公式获取失败 error: " + JSON.stringify(error));
		});
	}

	render() {
		let that = this;
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
				title: '公式',
				align: 'center',
				dataIndex: 'formula'
			},
			{
				title: '操作',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (<div>
						<Button onClick={() => this.onEdit(record)} type="normal" shape="circle" icon="edit"/>

						{
							that.isSelectMode() &&
							<Button onClick={() => { that.props.onSelect(record.id)}} type="normal" shape="circle" icon="select"/>
						}
						<Popconfirm title="是否要删除该公式？"
						            onConfirm={() => {
							            this.onDel(record)
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
					title="编辑录取测算公式"
					onCancel={() => this.onDialogDismiss(false)}
					visible={true}
					footer={[]}
				>
					<EditView
						formula={this.state.formula}
						onDialogDismiss={()=>this.onDialogDismiss(true)}
					/>
				</Modal>
				}
				<div className={Style.commonBtnLayout}>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.onAdd()
					}}>添加</Button>
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
			formula: record
		});
	}

	onAdd() {
		this.setState({
			isShowEditDialog: true,
			formula: null
		});
	}

	onDel(record) {
		let param = {
			id: record.id
		};
		let that = this;
		deleteAdmissionFormula(param).then(function (response) {
			if (isSuccess(response)) {
				message.success(' 录取测算公式删除成功');
				that.refreshList(that.state.response.current, Data.PAGINATION_INFO.pageSize);
			} else {
				message.error("录取测算公式删除失败 error: " + response);
			}

		}).catch(function (error) {
			message.error("录取测算公式删除失败 error: " + JSON.stringify(error));
		});
	}

	isSelectMode() {
		return Data.FORMULA_LIST_MODE_SELECT === this.props.mode;
	}
}

FormulaListView.defaultProps = {
	mode: Data.FORMULA_LIST_MODE_RW
};

export default FormulaListView;
