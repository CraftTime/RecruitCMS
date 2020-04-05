import React, {Component} from 'react';
import {Table, Modal, Popconfirm, Divider, message, Button} from 'antd';
import EditView from './EditView';
import * as DateUtils from '../../../../utils/DateUtils';
import Style from './Teacher.less';
import * as Data from '../../../../data/data';

class TeacherListView extends Component {

	constructor(props) {
		super();
		this.state = {
			isShowEditDialog: false
		}
	}

	render() {
		const {data, selectedRowKeys} = this.props;
		const columns = [
			{
				title: '序号',
				align: 'center',
				render: (val, record, index) => (<text>{index + 1}</text>)
			},
			{
				title: '姓名',
				align: 'center',
				dataIndex: 'username'
			},
			{
				title: '总邀请人数',
				align: 'center',
				dataIndex: 'totalNumberOfInvitation'
			},
			{
				title: '余额',
				align: 'center',
				dataIndex: 'balance'
			},
			{
				title: '邀请二维码',
				align: 'center',
				dataIndex: 'qrCodeUrl',
				render: (val, record, index) => (<img className={Style.qrCodePic} src={val} />)
			},
			{
				title: '操作',
				dataIndex: 'operate',
				align: 'center',
				render: (val, record) => (<div>
						<Button onClick={() => this.onEdit()} type="normal" shape="circle" icon="edit"/>

						<Popconfirm title="是否要删除该记录"
						            onConfirm={() => {
							            this.onDel()
						            }}
						            okText="确定" cancelText="取消">
							<Button type="normal" shape="circle" icon="delete"/>
						</Popconfirm>

					</div>
				),
			},
		];

		const pagination = {
			total: data.length,
		};

		const paginationProps = {
			showSizeChanger: true,
			showQuickJumper: false,
			...pagination,
		};

		const rowSelection = {
			selectedRowKeys,
			onChange: this.handleRowSelectChange,
			getCheckboxProps: record => ({
				disabled: record.disabled,
			}),
		};

		return (
			<div>

				{this.state.isShowEditDialog &&
				<Modal
					destroyOnClose="true"
					title="编辑老师邀请"
					onCancel={() => this.onDialogDismiss()}
					visible={true}
					footer={[]}
				>
					<EditView
						teacherInfo={Data.TEACHER_INVITATION_RECORDS[0]}
					/>
				</Modal>
				}

				<Table
					size="small"
					rowSelection={rowSelection}
					dataSource={data}
					pagination={paginationProps}
					columns={columns}

				/>
			</div>
		);
	}

	onDialogDismiss() {
		this.setState({
			isShowEditDialog: false,
		});
	}

	onChange(type, value) {
		message.info(" onChange value: " + JSON.stringify(value));
		let {info} = this.state;
		let newInfo = {...info};

		switch (type) {
			case PRIC:
				newInfo.price = value;
				break;

			case NUMBER:
				newInfo.number = value;
				break;
		}

		this.setState({
			info: newInfo
		});

	}

	handleSubmit(e) {
		e.preventDefault();
		const {getFieldProps, getFieldValue} = this.props.form;
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.updatePriceInfo();
			} else {
				console.log(' user input data is invalied ... ');
			}
		});
	}

	updatePriceInfo() {
		message.info(" updatePriceInfo ")
	}

	onEdit() {
		this.setState({
			isShowEditDialog: true
		});
	}

	onDel() {
		this.setState({
			isShowEditDialog: true
		});
	}
}

export default TeacherListView;
