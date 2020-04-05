import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, message, Button, Select, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import {isSuccess, isEmpty} from '../../../../../utils/utils';
import * as Data from '../../../../../data/data';
import Style from './ScoreView.less';
import EditView from './EditView';

const {Option} = Select;

const EDIT_TYPE_BASE_INFO = 0;
const EDIT_TYPE_SCORE_MRG = 1;
const EDIT_TYPE_OTHER_MRG = 2;
const EDIT_TYPE_PROFESSIONAL_MRG = 3;

class SchoolListView extends Component {

	constructor(props) {
		super();
		this.state = {
			selectedRowKeys: [],
			isShowDialog: false,
			school: null,
			yearList: props.yearList,
			currYear: isEmpty(props.yearList) ? '2019' : props.yearList[0],
			optionViews: this.getYearOptions(props.yearList)
		};

	}

	getYearOptions(yearList) {
		let optionViews = [];
		for (let i in yearList) {
			let year = yearList[i];
			let option = (<Option value={year}>{year}</Option>);
			optionViews.push(option);
		}
		return optionViews;
	}

	componentDidMount() {

	}

	render() {
		const that = this;
		const {optionViews, currYear} = this.state;
		const {yearScoreMap} = this.props;
		let data = yearScoreMap.has(currYear) ? yearScoreMap.get(currYear) : [];

		const columns = [
			{
				title: '序号',
				align: 'center',
				render: (val, record, index) => (
					<text>{index + 1}</text>)
			},
			{
				title: '专业名称',
				align: 'center',
				dataIndex: 'professionalName'
			},
			{
				title: '招收计划数',
				align: 'center',
				dataIndex: 'admissionPeopleNumber'
			},
			{
				title: '公式',
				align: 'center',
				dataIndex: 'formula'
			},
			{
				title: '文化分',
				align: 'center',
				dataIndex: 'cultureScore'
			},
			{
				title: '专业分',
				align: 'center',
				dataIndex: 'professionalScore'
			},
			{
				title: '综合分',
				align: 'center',
				dataIndex: 'comprehensiveScore'
			},
			{
				title: '操作',
				align: 'center',
				dataIndex: 'id',
				render: (val, record) => (<div>
						<Button onClick={() => this.onEdit(record)} type="normal" shape="circle"
						        icon="edit"/>

						<Popconfirm title="是否要删除该学校专业分数？"
						            onConfirm={() => {
							            this.onDelClick(record.id)
						            }}
						            okText="确定" cancelText="取消">
							<Button type="normal" shape="circle" icon="delete"/>
						</Popconfirm>

					</div>
				),
			},

		];


		return (
			<div className={Style.flexCol}>
				{this.state.isShowDialog &&
				<Modal
					style={{marginBottom: '30rem'}}
					destroyOnClose="true"
					title='分数管理'
					onCancel={() => this.onDialogDismiss()}
					visible={true}
					footer={[]}
				>
					<EditView
						score={this.state.score}
						onDialogDismiss={() => this.onDialogDismiss(function () {
							that.props.onRefresh()
						})}
					/>

				</Modal>
				}
				<div className={Style.commonBtnLayout}>
					{/*<Button className={Style.commonBtn} type="primary" onClick={() => {*/}
						{/*this.props.onRefresh();*/}
					{/*}}>刷新</Button>*/}
					{/*<Button className={Style.commonBtn} type="primary" onClick={() => {*/}
						{/*this.onEdit(EDIT_TYPE_BASE_INFO, null)*/}
					{/*}}>添加</Button>*/}

					<Select defaultValue={currYear}
					        style={{width: 120}} onChange={(value)=> this.setState({currYear: value})}>{optionViews}</Select>
				</div>
				<Table
					size="small"
					bordered
					dataSource={data}
					columns={columns}
				/>
			</div>

		);
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

	onPageChange(page, pageSize) {
		this.refreshListView(page.current, page.pageSize);
	}

	onEdit(record) {
		this.setState({
			isShowDialog: true,
			score: record,
		});
	}

	onAdd() {
		this.setState({
			isShowDialog: true,
			score: null,
		});
	}


	onDelClick(id) {
		let param = {
			id: id
		};
		let that = this;
		deleteSchool(param).then(function (response) {
			if (isSuccess(response)) {
				message.success('学校删除成功');
				that.refreshCurrent();
			} else {
				message.error('学校删除失败 failed: ' + JSON.stringify(response));
			}
		}).catch(function (error) {
			message.error('学校删除失败 error: ' + JSON.stringify(error));
		})
	}

}

export default SchoolListView;
