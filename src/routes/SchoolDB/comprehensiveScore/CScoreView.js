import React, {PureComponent, Component, Fragment} from 'react';
import {connect} from 'dva';
import {Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../../components/StandardTable/index.less';
import Style from './CScoreView.less';
import * as AppApi from '../../../services/AppApi';

const TITLE_ADD = '新增综合分公式';
const TITLE_EDIT = '更新综合分公式';

const FormulaOperatorView = Form.create({name: 'form_in_modal'})(
	class extends Component {
		constructor(props) {
			super();
			const {formula, desc} = props;

			this.state = {
				formula: formula,
				desc: desc
			};
		}

		onFormulaChange = (e) => {
			this.setState({
				formula: e.target.value
			});
		};

		onDescChange = (e) => {
			this.setState({
				desc: e.target.value
			});
		};

		render() {
			const {formula, desc} = this.state;
			const {onCancel, onOk, form, title, id} = this.props;
			const {getFieldDecorator, getFieldProps} = form;
			let that = this;

			return (

				<Modal
					destroyOnClose="true"
					visible="true"
					title={title}
					okText="确定"
					onCancel={() => onCancel(false)}
					onOk={() => onOk(id, that.state.formula, that.state.desc)}
				>
					<Form layout="vertical">
						<Form.Item label="计算公式">
							{getFieldDecorator('计算公式', {
								initialValue: formula
							})(<Input value={formula}  {...getFieldProps('formula')}
							          onChange={(event) => {
								          this.onFormulaChange(event)
							          }}
							          placeholder="文化分:a 专业分:b 计算符号:*乘法 /为除以 百分请使用0.x代替 例如10%等于0.1"/>)}
						</Form.Item>
						<Form.Item label="文字计算公式">
							{getFieldDecorator('description', {
								initialValue: desc
							})(<Input value={desc} {...getFieldProps('desc')} type="textarea"
							          onChange={(event) => {
								          this.onDescChange(event)
							          }}
							          placeholder="例如： 专业分+文化分、 专业分*0.6+文化分*0.1"/>)}
						</Form.Item>
					</Form>
				</Modal>
			);
		}
	},
);

@connect(({cscore}) => ({
	cscore,
}))
class CScoreView extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			selectedRowKeys: [],
			isShowAddView: false,
			isEdit: false,
			editSrcRecord: null
		};
	}

	refreshCScoreList() {
		const {dispatch} = this.props;
		dispatch({
			type: 'cscore/queryCScoreFormula',
		});
	};

	componentDidMount() {
		this.refreshCScoreList();
	}

	onEdit(record) {
		this.setState({
			isShowAddView: true,
			isEdit: true,
			editSrcRecord: record
		})
	}

	onAddClick() {

		this.setState({
			isEdit: false,
			isShowAddView: true,
			editSrcRecord: null
		});
	}

	onDelClick(id) {
		let that = this;
		const param = {
			id: id
		};
		AppApi.deleteCScoreFormula(param)
			.then(function (response) {
				if (response.meta.code === 0) {
					that.refreshCScoreList();
					message.success("删除计算公式成功");
				} else {
					message.error("删除计算公式失败 errorMsg: " + JSON.stringify(response.meta));
				}
			}).catch(function (e) {
			message.error("删除计算公式失败 error: " + JSON.stringify(e));
		});

	}

	handleRowSelectChange = (selectedRowKeys, selectedRows) => {
		const totalCallNo = selectedRows.reduce((sum, val) => {
			return sum + parseFloat(val.callNo, 10);
		}, 0);

		if (this.props.onSelectRow) {
			this.props.onSelectRow(selectedRows);
		}

		this.setState({selectedRowKeys, totalCallNo});
	}

	render() {

		const {cscore: {cScoreList, loading}} = this.props;
		const {selectedRowKeys, isShowAddView, isEdit, editSrcRecord} = this.state;


		const columns = [
			// {
			//   title: 'ID',
			//   dataIndex: 'id'
			// },
			{
				title: '序号',
				render: (val, record, index) => (<text>{index + 1}</text>)
			},
			{
				title: '计算公式',
				dataIndex: 'formula'
			},
			{
				title: '文字计算公式',
				dataIndex: 'desc'
			},
			{
				title: '操作',
				dataIndex: 'id',
				render: (val, record) => (
					<Fragment>

						<Button className={Style.commonBtn} onClick={() => this.onEdit(record)} type="normal"
						        shape="circle"
						        icon="edit"/>
						<Popconfirm title="是否要删除该计算公式？"
						            onConfirm={() => {
							            this.onDelClick(val)
						            }}
						            okText="确定" cancelText="取消">
							<Button type="normal" shape="circle" icon="delete"/>
						</Popconfirm>
					</Fragment>
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
			total: cScoreList.length,
		};

		const paginationProps = {
			showSizeChanger: true,
			showQuickJumper: false,
			...pagination,
		};

		let formula = isEdit ? editSrcRecord.formula : "";
		let desc = isEdit ? editSrcRecord.desc : "";

		return (
			<PageHeaderLayout content="">
				{isShowAddView &&
				<FormulaOperatorView
					visible={isShowAddView}
					onCancel={this.switchAddDialogVisible.bind(this)}
					onOk={this.onFormulaOkBtnClick.bind(this)}
					formula={formula}
					desc={desc}
					id={isEdit ? editSrcRecord.id : -1}
					title={isEdit ? TITLE_EDIT : TITLE_ADD}
				/>
				}

				<Card bordered={false}>
					<div className={Style.btnLayout}>
						<Button type="primary" onClick={() => {
							this.refreshCScoreList()
						}}>刷新</Button>
						<Button type="primary" onClick={() => {
							this.onAddClick()
						}}>添加</Button>
					</div>
					<div className={styles.standardTable}>
						<Table
							size="small"
							dataSource={cScoreList}
							loading={loading}
							pagination={paginationProps}
							onChange={this.handleTableChange}
							columns={columns}
						/>
					</div>
				</Card>
			</PageHeaderLayout>
		);
	}

	switchAddDialogVisible = (isShow) => {
		this.setState({
			isShowAddView: isShow,
			isEdit: false
		});
	};

	onFormulaOkBtnClick(id, formula, desc) {

		if (formula === undefined || formula.toString().trim().length === 0) {
			message.error(" 计算公式不允许为空");
			return;
		}

		if (desc === undefined || desc.toString().trim().length === 0) {
			message.error("文字计算公式不允许为空");
			return;
		}

		const {isEdit} = this.state;
		let tip = isEdit ? TITLE_EDIT : TITLE_ADD;
		const that = this;

		if (isEdit) {

			const editParam = {
				"desc": desc,
				"formula": formula,
				"id": id
			};

			AppApi.updateCScoreFormula(editParam)
				.then(function (response) {

					if (response.meta.code === 0) {
						that.switchAddDialogVisible(false);
						that.refreshCScoreList();
						message.success(tip + "成功");
					} else {
						message.error(tip + "失败");
					}
				}).catch(function (e) {
				message.error(tip + "失败: " + JSON.stringify(e));
			});

		} else {

			const addParam = {
				"desc": desc,
				"formula": formula,
				"id": 0
			};

			AppApi.addCScoreFormula(JSON.stringify(addParam))
				.then(function (response) {

					if (response.meta.code === 0) {
						that.switchAddDialogVisible(false);
						that.refreshCScoreList();
						message.success(tip + "成功");
					} else {
						message.error(tip + "失败");
					}
				}).catch(function (e) {
				message.error(tip + "失败: " + JSON.stringify(e));
			});
		}
	}

}

export default CScoreView;
