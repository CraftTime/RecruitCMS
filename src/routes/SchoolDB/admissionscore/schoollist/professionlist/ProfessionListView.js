import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Icon, Form, Input, Button, message, Table, Alert, Badge, Card, Divider, Popconfirm, Modal} from 'antd';
import Style from './ProfessionListView.less';
import EditView from '../edit/EditView';
import * as Data from '../../../../../data/data';
import {getSchoolProfessionalList} from '../../../../../services/AppApi';


class ProfessionListView extends Component {

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
				title: '操作',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (
					<Button onClick={() => this.onEdit(record)} type="normal" shape="circle" icon="edit"/>
				),
			},
		];



		return (
			<div className={Style.flexCol}>
				{this.state.isShowDialog &&
				<Modal
					destroyOnClose="true"
					title={'录取测算专业信息'}
					width={Data.MODEL_WIDTH}
					onCancel={() => this.onDialogDismiss()}
					visible={true}
					footer={[]}
				>
					<EditView
						school={this.props.school}
						professional={this.state.professional}
					/>
				</Modal>
				}
				<Table
					size="small"
					// rowSelection={rowSelection}
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


	onDialogDismiss() {
		this.setState({
			isShowDialog: false,
		});
	}

}

export default ProfessionListView;
