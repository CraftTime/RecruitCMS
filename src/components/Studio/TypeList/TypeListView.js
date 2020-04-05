import React, {Component} from 'react';
import {connect} from 'dva';
import {Card, Button, Popconfirm, message, Table, Modal} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Style from '../../../css/common.less';
import TypeEditView from './TypeEditView';
import {deleteCommonType} from '../../../services/AppApi';
import * as HTTPCode from '../../../utils/HTTPCode';

@connect(({studio, teach}) => ({
	studio,teach
}))
class TypeListView extends Component {

	state = {
		isShowDialog: false,
		isEdit: false,
		currType: null,
	};

	render() {
		const {typeList, title} = this.props;
		const {isShowDialog} = this.state;
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

						<Popconfirm title={'是否要删除该' + this.props.title}
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
						institutionId={this.props.institutionId}
						modelName={this.props.modelName}
						addOrUpdateMethod={this.props.addOrUpdateMethod}
						title={actionTitle}
						type={this.state.currType}
						onDialogCancel={() => this.onDialogCancel()}
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
					dataSource={typeList}
					columns={columns}
				/>
			</div>
		);
	}

	onDel(id) {
		let that = this;
		const param = {
			id: id
		};
		deleteCommonType(this.props.deleteUrl, param).then(function (response) {
			if(HTTPCode.CODE_OK === response.meta.code) {
				 message.success(that.props.title + "删除成功");
				that.getTypeList();
			} else {
				message.success(that.props.title + "删除失败, code: " + response.meta.code);
			}
		}).catch(function (error) {
			message.success(that.props.title + "删除失败 error: " + JSON.stringify(error));
		})
	}

	getTypeList() {
		let {getTypeListMethod} = this.props;

		const {dispatch} = this.props;
		dispatch({
			type: this.props.modelName + '/' + getTypeListMethod,
			param: {
				institutionId: this.props.institutionId
			}
		});
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

//20200326 目前只有培训机构在用
TypeListView.defaultProps = {
	modelName: 'studio'
};

export default TypeListView;
