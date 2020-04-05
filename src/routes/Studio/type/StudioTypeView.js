import React, {Component} from 'react';
import {connect} from 'dva';
import {Card, Button, Popconfirm, message, Table, Modal} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Style from '../../../css/common.less';
import StudioTypeEditView from './edit/StudioTypeEditView';
import {deleteCommonType} from '../../../services/AppApi';
import {isSuccess} from '../../../utils/utils';

@connect(({studio}) => ({
	studio,
}))
class StudioTypeView extends Component {

	state = {
		isShowDialog: false,
		isEdit: false,
		currType: null,
	};


	componentDidMount() {
		this.getTypeList();
	}

	getTypeList() {
		const {dispatch} = this.props;
		dispatch({
			type: 'studio/getTypeList',
		});
	}

	render() {
		const {studio: {typeList}} = this.props;
		const {isShowDialog} = this.state;
		const actionTitle = this.state.isEdit ? "更新画室类型" : "新增画室类型";

		const columns = [
			{
				title: '序号',
				align: 'center',
				render: (val, record, index) => (<text>{index + 1}</text>)
			},
			{
				title: '名称',
				align: 'center',
				dataIndex: 'name'
			},
			{
				title: '操作',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (<div>
						<Button className={Style.commonBtn} onClick={() => this.onEdit(record)} type="normal" shape="circle" icon="edit"/>

						<Popconfirm title="是否要删除该类型"
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


		return (
			<PageHeaderLayout title="画室分类" content="">
				{isShowDialog &&
				<Modal
					destroyOnClose="true"
					title={actionTitle}
					onCancel={() => this.onDialogCancel()}
					visible={true}
					footer={[]}
				>
					<StudioTypeEditView
						title={actionTitle}
						studioType={this.state.currType}
						onDialogCancel={() => this.onDialogCancel()}
					/>
				</Modal>
				}
				<Card bordered={false}>
					<div className={Style.commonBtnLayout}>
						<Button className={Style.commonBtn} type="primary" onClick={() => {
							this.getTypeList();
						}}>刷新</Button>
						<Button type="primary" onClick={() => {
							this.onAddClick()
						}}>添加</Button>
					</div>

					<Table
						bordered={true}
						size="small"
						dataSource={typeList}
						columns={columns}
					/>
				</Card>
			</PageHeaderLayout>
		);
	}

	onEdit(record) {
		this.setState({
			isShowDialog: true,
			isEdit: true,
			currType: record
		});
	}

	onAddClick() {
		this.setState({
			isShowDialog: true,
			isEdit: false,
			currType: null
		});
	}

	onDialogCancel() {
		this.setState({
			isShowDialog: false,
		}, function () {
			this.getTypeList();
		});
	}

	onDel(record) {
		let param = {
			id: record.id
		};
		let that = this;
		deleteCommonType('/institutionType/delete', param).then(function (response) {
			if(isSuccess(response)) {
				message.success('删除画室类型成功');
				that.getTypeList()
			} else {
				message.error('删除画室类型失败 error: ' + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error('删除画室类型失败 error: ' + JSON.stringify(error));
		});
	}
}

export default StudioTypeView;
