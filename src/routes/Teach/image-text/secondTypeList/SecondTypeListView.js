import React, {Component} from 'react';
import {connect} from 'dva';
import {Card, Button, Popconfirm, message, Table, Modal} from 'antd';
import Style from '../../../../css/common.less';
import TypeEditView from './TypeEditView';
import {getTeachImageTextSecondTypeList,
	deleteTeachImageTextSecondType} from '../../../../services/AppApi';
import {isSuccess} from '../../../../utils/utils';

@connect(({studio, teach}) => ({
	studio,teach
}))
class SecondTypeListView extends Component {

	state = {
		isShowDialog: false,
		isEdit: false,
		currType: null,
		types: []
	};

	componentDidMount() {
		this.getTypeList();
	}

	 getTypeList() {
		let that = this;
		getTeachImageTextSecondTypeList(this.props.parentTypeId).then(function (response) {
			if(isSuccess(response)) {
				that.setState({
					types: response.response
				});
				console.log("艺考教学图文教学二级菜单列表获取成功");
			} else {
				message.error("艺考教学图文教学二级菜单列表获取失败 error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error("艺考教学图文教学二级菜单列表获取失败 error: " + JSON.stringify(error));
		});
	}

	render() {
		let title = "艺考教学图文二级菜单";
		const {isShowDialog, types} = this.state;
		const actionTitle = this.state.isEdit ? "更新" + title : "新增" + title;

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
						<Button className={Style.commonBtn} onClick={() => this.onEdit(record)} type="normal"
						        shape="circle" icon="edit"/>

						<Popconfirm title="是否要删除该艺考教学图文二级菜单"
						            onConfirm={() => {
							            this.onDel(record.id)
						            }}
						            okText="确定" cancelText="取消">
							<Button type="normal" shape="circle" icon="delete"/>
						</Popconfirm>

					</div>
				),
			},
		];


		return (
			<div>
				{isShowDialog &&
				<Modal
					destroyOnClose="true"
					title={actionTitle}
					onCancel={() => this.onDialogCancel()}
					visible={true}
					footer={[]}
				>
					<TypeEditView
						type={this.state.currType}
						parentTypeId={this.props.parentTypeId}
						onDialogCancel={() => this.onDialogCancel()}
						onSecondTypeChange={()=> this.onSecondTypeChange()}
					/>
				</Modal>
				}
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
					dataSource={types}
					columns={columns}
				/>
			</div>
		);
	}

	onSecondTypeChange() {
		this.getTypeList();
		if(this.props.onSecondTypeChange !== undefined) {
			this.props.onSecondTypeChange();
		}
	}
	onDel(id) {
		let that = this;
		let param = {
			id: id
		};
		deleteTeachImageTextSecondType(param).then(function (response) {
			if(isSuccess(response)) {
				 message.success("艺考教学图文二级菜单删除成功");
				that.getTypeList();
				if(that.props.onSecondTypeChange !== undefined) {
					that.props.onSecondTypeChange();
				}
			} else {
				message.success("艺考教学图文二级菜单删除失败 error: " + JSON.stringify(response));
			}
		}).catch(function (error) {
			message.success("艺考教学图文二级菜单删除失败 error: " + JSON.stringify(error));
		})
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
		});
	}

}

export default SecondTypeListView;
