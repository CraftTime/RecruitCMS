import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import {getProfessionalList, deleteProfessional, addOrUpdateProfessional} from '../../../../services/AppApi';
import {isSuccess, isEmpty} from '../../../../utils/utils';
import * as Data from '../../../../data/data';
import EditView from './EditView';
import Style from '../../../../css/common.less';


class ProfessionalListView extends Component {

	constructor(props) {
		super();
		this.state = {
			isShowDialog: false,
			professional: null,
			response: {}
		};

	}

	componentDidMount() {
		this.refreshListView(1, Data.PAGINATION_INFO.pageSize);
	}

	render() {
		const {response} = this.state;

		const columns = [
			{
				title: '序号',
				align: 'center',
				render: (val, record, index) => (
					<text>{(response.current - 1 ) * Data.PAGINATION_INFO.pageSize + index + 1}</text>)
			},
			{
				title: '专业名称',
				align: 'center',
				dataIndex: 'name'
			},
			{
				title: '操作',
				align: 'center',
				dataIndex: 'id',
				render: (val, record) => (
					<div>
						{!this.isSelectMode() &&
						<div>
							<Button onClick={() => this.onEdit(record)} type="normal" shape="circle"
							        icon="edit"/>

							<Popconfirm title="是否要删除该专业？"
							            onConfirm={() => {
								            this.onDelClick(record.id)
							            }}
							            okText="确定" cancelText="取消">
								<Button type="normal" shape="circle" icon="delete"/>
							</Popconfirm>
						</div>
						}

						{
							this.isSelectMode() &&
							<Button onClick={() => this.onSelect(record)} type="primary">选择</Button>
						}

					</div>
				),
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

		let that = this;
		return (
			<div className={Style.flexCol}>
				{this.state.isShowDialog &&
				<Modal
					style={{marginBottom: '30rem'}}
					destroyOnClose="true"
					title={this.getOpTitle()}
					onCancel={() => this.onDialogDismiss()}
					visible={true}
					footer={[]}
				>
					<EditView
						professional={this.state.professional}
						onDialogDismiss={() => this.onDialogDismiss(function () {
							that.refreshCurrent();
						})}
					/>

				</Modal>
				}
				{!this.isSelectMode() &&

				<div className={Style.commonBtnLayout}>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.refreshCurrent();
					}}>刷新</Button>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.onAdd()
					}}>添加</Button>
				</div>
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

	isSelectMode() {
		return Data.PROFESSIONAL_DIALOG_MODE_RWS === this.props.mode
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

	refreshCurrent() {
		this.refreshListView(this.state.response.current, this.state.response.pageSize)
	}

	refreshListView(pageIndex, pageSize) {
		let param = {
			pageIndex: pageIndex,
			pageSize: pageSize
		};
		this.getList(param);
	}

	onPageChange(page, pageSize) {
		this.refreshListView(page.current, page.pageSize);
	}

	onEdit(record) {
		this.setState({
			isShowDialog: true,
			professional: record,
		});
	}

	onAdd() {
		this.setState({
			isShowDialog: true,
			professional: null,
		});
	}


	getOpTitle() {
		return isEmpty(this.state.professional) ? '新增专业' : '编辑专业';
	}

	getList(param) {
		let that = this;
		getProfessionalList(param).then(function (response) {

			if (isSuccess(response)) {
				that.setState({
					response: response.response
				});
				console.log("获取专业列表成功");
			} else {
				message.error("获取专业列表失败 error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error("获取专业列表失败 error: " + JSON.stringify(error));
		});

	}

	onDelClick(id) {
		let param = {
			id: id
		};
		let that = this;
		deleteProfessional(param).then(function (response) {
			if (isSuccess(response)) {
				message.success('专业删除成功');
				that.refreshCurrent();
			} else {
				message.error('删除专业失败 failed: ' + JSON.stringify(response));
			}
		}).catch(function (error) {
			message.error('删除专业失败 error: ' + JSON.stringify(error));
		})
	}

	onSelect(profession) {
		if(this.props.onProfessionalSelect) {
			this.props.onProfessionalSelect({...profession});
		}
	}

}

ProfessionalListView.defaultProps = {
	mode: Data.PROFESSIONAL_DIALOG_MODE_RW
};

export default ProfessionalListView;
