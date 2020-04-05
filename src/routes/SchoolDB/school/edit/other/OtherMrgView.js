import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from './OtherMrgView.less';
import * as Data from '../../../../../data/data';
import {getSchoolProfessionalList, deleteChinaSchoolProfessional} from '../../../../../services/AppApi';
import EditView from './EditView';
import {isEmpty,isSuccess} from '../../../../../utils/utils';


class OtherMrgView extends Component {

	constructor(props) {
		super();
		this.state = {
			isShowDialog: false,
			isEdit: false,
			response: [],
			professional: null
		};
	}

	componentDidMount() {
		this.refreshList();
	}

	refreshList() {
		let that = this;
		getSchoolProfessionalList(this.props.school.id).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.setState({
					response: response.response
				});

			} else {
				message.error("学校专业列表获取失败 error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error("学校专业列表获取失败 error: " + JSON.stringify(error));
		});
	}


	render() {
		const {selectedRowKeys, response} = this.state;
		let that = this;

		const columns = [
			{
				title: '序号',
				align: 'center',
				render: (val, record, index) => (<text>{index + 1}</text>)
			},
			{
				title: '专业名称',
				align: 'center',
				dataIndex: 'professionalName'
			},

			{
				title: '学费(元)',
				align: 'center',
				dataIndex: 'tuitionFee'
			},
			{
				title: '文科文化分切线',
				align: 'center',
				dataIndex: 'liberalCultureScoreBase'
			},

			{
				title: '理科文化分切线',
				align: 'center',
				dataIndex: 'scienceCultureScoreBase'
			},

			{
				title: '专业分切线',
				align: 'center',
				dataIndex: 'professionalScoreBase'
			},

			{
				title: '外语切线',
				align: 'center',
				dataIndex: 'foreignLanguageScoreBase'
			},


			{
				title: '操作',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (
					<div>
						<Button onClick={() => this.onEdit(record)} type="normal" shape="circle" icon="edit"/>

						<Popconfirm title="是否要删除该专业？"
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


		return (
			<div className={Style.flexCol}>
				{this.state.isShowDialog &&
				<Modal
					destroyOnClose="true"
					title={isEmpty(this.state.professional) ? '新增专业' : `${this.state.professional.professionalName}-信息编辑`}
					width={Data.MODEL_WIDTH}
					onCancel={() => this.onDialogDismiss()}
					visible={true}
					footer={[]}
				>
					<EditView
						school={this.props.school}
						professional={this.state.professional}
						onDialogDismiss={() => this.onDialogDismiss(function () {
							that.refreshList();
						})}
					/>
				</Modal>
				}
				<div className={Style.btnLayout}>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.refreshList();
					}}>刷新</Button>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.onEdit(null)
					}}>添加</Button>
				</div>
				<Table
					size="small"
					dataSource={response}
					columns={columns}
				/>
			</div>

		);
	}

	onEdit(record) {
		this.setState({
			isShowDialog: true,
			isEdit: true,
			professional: record
		});
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

	onDelClick(record) {
		let param = {
			professionalIdList: [
				record.professionalId
			],
			schoolId: this.props.school.id
		};
		let that = this;
		deleteChinaSchoolProfessional(param).then(function (response) {
			if (isSuccess(response)) {
				message.success(`${that.props.school.name}-${record.professionalName}-专业删除成功`);
				that.refreshList();
			} else {
				message.success(`${that.props.school.name}-${record.professionalName}-专业删除失败 failed: ` + JSON.stringify(response));
			}
		}).catch(function (error) {
			message.success(`${that.props.school.name}-${record.professionalName}-专业删除失败 error: ` + JSON.stringify(error));
		})
	}

}

export default OtherMrgView;
