import React, {Component} from 'react';
import {connect} from 'dva';
import {getCommentList, delArticleComment, updateArticleComment} from '../../../../services/AppApi';
import {Button, Form, Modal, Input, Menu, Tabs, Icon, message, Divider, Dropdown, Popconfirm} from 'antd';
import CommentListView from './CommentListView';
import * as Data from '../../../../data/data';
import {isSuccess} from '../../../../utils/utils';
import {getFormatCNDate} from '../../../../utils/DateUtils';
import {listComment, updateCommentStatus, deleteComment} from '../../../../services/TrainApi';

const {TabPane} = Tabs;
const {TextArea} = Input;
const FormItem = Form.Item;

@Form.create()
class CommentEditView extends Component {
	render() {
		const {getFieldDecorator} = this.props.form;
		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>
				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="文章评论"
				>
					{getFieldDecorator('content', {
						initialValue: this.props.comment.content,
						rules: [{
							required: true, message: '请输入文章评论',
						}],
					})(
						<TextArea
							style={{minHeight: 32}}
							placeholder="" rows={4}/>
					)}
				</FormItem>

				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<Button type="primary" htmlType="submit">
						保存
					</Button>
				</FormItem>
			</Form>
		);
	}

	handleSubmit(e) {
		e.preventDefault();
		const {getFieldProps, getFieldValue} = this.props.form;
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let param = {
					id: this.props.comment.commentId,
					content: getFieldValue('content')
				};
				let {onCommentEditFinish} = this.props;
				updateArticleComment(param).then(function (response) {
					if (isSuccess(response)) {
						message.success('更新文章评论成功');
						if (onCommentEditFinish) {
							onCommentEditFinish();
						}
					} else {
						message.error('更新文章评论失败 failed: ' + JSON.stringify(response));
					}
				}).catch(function (error) {
					message.error('更新文章评论失败 error: ' + JSON.stringify(error));
				});
			} else {
				console.log(' user input data is invalid ... ');
			}
		});
	}
}

class CommentStatusSelect extends Component {

	render() {
		let that = this;
		const {onCommentStatusClick} = this.props;
		const menus = (
			<Menu
				onClick={(event) => onCommentStatusClick(event.key)}
			>
				<Menu.Item key={Data.COMMENT_STATUS_NOT_REVIEWED}>
					未审核
				</Menu.Item>
				<Menu.Item key={Data.COMMENT_STATUS_REVIEWED}>
					审核通过
				</Menu.Item>
				<Menu.Item key={Data.COMMENT_STATUS_REVIEWED_FAILURE}>
					审核失败
				</Menu.Item>
			</Menu>
		);
		return (
			<Dropdown
				overlay={menus}
				trigger={['click']}
			>
				{this.props.children}
			</Dropdown>
		);
	}
}


class CommentView extends Component {
	constructor(props) {
		super();
		this.state = {
			id: props.id,
			all: [],
			unCheck: [],
			checked: [],
			checkFailed: [],

			allRecords: {},
			unCheckRecords: {},
			checkedRecords: {},
			checkFailedRecords: {},

			isShowEditDialog: false,
			editComment: {}
		}
	}

	onCommentEditDialogDismiss(reload) {
		let that = this;
		this.setState({
			isShowEditDialog: false
		}, function () {
			if (reload) {
				let currentInfo = {
					allCurrent: that.state.allRecords.current,
					unCheckCurrent: that.state.unCheckRecords.current,
					checkedCurrent: that.state.checkedRecords.current,
					checkFailedCurrent: that.state.checkFailedRecords.current,
				};
				that.refreshCurrData(currentInfo);
			}
		});
	}

	render() {
		let that = this;
		return (
			<Tabs onChange={(key) => this.callback(key)} type="card">
				{
					this.state.isShowEditDialog &&
					<Modal
						style={{marginBottom: '30rem'}}
						destroyOnClose="true"
						title="编辑评论内容"
						onCancel={() => this.onCommentEditDialogDismiss(false)}
						visible={true}
						footer={[]}
					>
						<CommentEditView
							comment={this.state.editComment}
							onCommentEditFinish={() => this.onCommentEditDialogDismiss(true)}
						/>
					</Modal>
				}

				<TabPane tab={`未审核-${this.state.unCheckRecords.total}`} key="2">
					<CommentListView
						data={this.state.unCheck}
						paginationInfo={this.getPaginationInfo(this.state.unCheckRecords)}
						onChange={() => this.refresh()}
						onPaginationChange={(page, pageSize) => {
							this.refreshComment(page, pageSize, Data.COMMENT_STATUS_NOT_REVIEWED, function (records, data) {
									that.setState({
										unCheck: data,
										unCheckRecords: records
									});
								},
								{
									currIndexName: 'unCheckCurrent'
								});
						}}
					/>
				</TabPane>

				<TabPane tab={`审核通过-${this.state.checkedRecords.total}`} key="3">
					<CommentListView
						data={this.state.checked}
						paginationInfo={this.getPaginationInfo(this.state.checkedRecords)}
						onChange={() => this.refresh()}
						onPaginationChange={(page, pageSize) => {
							this.refreshComment(page, pageSize, Data.COMMENT_STATUS_REVIEWED, function (records, data) {
									that.setState({
										checked: data,
										checkedRecords: records
									});
								},
								{
									currIndexName: 'checkedCurrent'
								});
						}}

					/>
				</TabPane>

				<TabPane tab={`审核失败-${this.state.checkFailedRecords.total}`} key="4">
					<CommentListView
						data={this.state.checkFailed}
						paginationInfo={this.getPaginationInfo(this.state.checkFailedRecords)}
						onChange={() => this.refresh()}
						onPaginationChange={(page, pageSize) => {
							this.refreshComment(page, pageSize, Data.COMMENT_STATUS_REVIEWED_FAILURE, function (records, data) {
									that.setState({
										checkFailed: data,
										checkFailedRecords: records
									});
								},
								{
									currIndexName: 'checkFailedCurrent'
								});
						}}
					/>
				</TabPane>

			</Tabs>
		);
	}

	getPaginationInfo(data) {
		return {
			total: data.total,
			defaultPageSize: data.size,
			pageSize: data.size,
			current: data.current
		}
	}

	callback(key) {
		console.info(' callback key: ' + key);
	}

	componentDidMount() {
		this.refreshInitData();
	}


	refreshInitData() {
		this.refresh(1, 1, 1, 1);
	}

	refreshCurrData(info) {
		this.refresh(
			info.allCurrent,
			info.unCheckCurrent,
			info.checkedCurrent,
			info.checkFailedCurrent,
		);
	}

	refresh(allCurr, unCheckCurr, checkedCurr, checkFailedCurr) {
		let that = this;
		// this.refreshComment(allCurr, Data.PAGINATION_INFO.pageSize / 2, Data.COMMENT_STATUS_ALL, function (records, data) {
		// 		that.setState({
		// 			all: data,
		// 			allRecords: records
		// 		});
		// 	},
		// 	{
		// 		currIndexName: 'allCurrent'
		// 	});

		this.refreshComment(unCheckCurr, Data.PAGINATION_INFO.pageSize / 2, Data.COMMENT_STATUS_NOT_REVIEWED, function (records, data) {

				that.setState({
					unCheck: data,
					unCheckRecords: records
				});
			},
			{
				currIndexName: 'unCheckCurrent'
			});

		this.refreshComment(checkedCurr, Data.PAGINATION_INFO.pageSize / 2, Data.COMMENT_STATUS_REVIEWED, function (records, data) {
				that.setState({
					checked: data,
					checkedRecords: records
				});
			},
			{
				currIndexName: 'checkedCurrent'
			});

		this.refreshComment(checkFailedCurr, Data.PAGINATION_INFO.pageSize / 2, Data.COMMENT_STATUS_REVIEWED_FAILURE, function (records, data) {
				that.setState({
					checkFailed: data,
					checkFailedRecords: records
				});
			},
			{
				currIndexName: 'checkFailedCurrent'
			});
	}


	refreshComment(pageIndex, pageSize, status, callback, info) {
		let param = {
			pageIndex: pageIndex,
			pageSize: pageSize
		};

		if (Data.COMMENT_STATUS_ALL !== status) {
			param.status = status;
		}

		let that = this;
		listComment(this.props.modal, this.props.id, param, (response) => {
			let data = that.collectionComment(response.response, status, info);
			if (callback) {
				callback(response.response, data);
			}

		})
	}

	collectionComment(response, status, info) {
		let source = response.records;
		let paginationInfo = {
			total: response.total,
			size: response.size,
			current: response.current,
			pages: response.pages
		};
		let that = this;
		let data = [];
		for (let index in source) {
			let item = source[index];
			let actions = [
				<CommentStatusSelect
					onCommentStatusClick={(key) => this.onCommentStatusClick(key, status, this.props.getId(item), info, paginationInfo)}
				>
						<span style={{color: Data.COMMENT_STATUS_TITLE_COLORS.get(status)}}
						      key="comment-list-reply-to-0">{Data.COMMENT_STATUS_TITLES.get(status)}<Icon
							type="down"/>
						</span>
				</CommentStatusSelect>,

				<Divider type="vertical"/>
			];

			if (this.props.isShowScoreModal) {
				actions.push(<text>师资({item.teachersScore.toFixed(0)})</text>);
				actions.push(<Divider type="vertical"/>);
				actions.push(<text>环境({item.envScore.toFixed(0)})</text>);
				actions.push(<Divider type="vertical"/>);
				actions.push(<text>师资({item.teachersScore.toFixed(0)})</text>);
				actions.push(<Divider type="vertical"/>);
				actions.push(<text>价格({item.priceScore.toFixed(0)})</text>);
				actions.push(<Divider type="vertical"/>);
			}

			actions.push(<span style={{marginLeft: '2px'}}>
						<Popconfirm title="是否要删除该评论？"
						            onConfirm={() => {
							            that.onCommentDel(this.props.getId(item), info, paginationInfo)
						            }}
						            okText="确定" cancelText="取消">
						<text>删除</text>
						</Popconfirm>
					</span>)

			let comment = {
				actions: actions,
				author: item.userName,
				avatar: item.imageUrl,
				content: (
					<p>
						{item.content}
					</p>
				),
				datetime: (<text>{getFormatCNDate(item.gmtCreated)}</text>),
			};
			data.push(comment);
		}
		return data;
	}

	onCommentEdit(comment) {
		this.setState({
			isShowEditDialog: true,
			editComment: comment
		});
	}

	onCommentDel(id, info, paginationInfo) {
		let param = {
			id: id
		};

		let currentIndex = parseInt(paginationInfo.current);

		if ((currentIndex === parseInt(paginationInfo.pages))
			&& currentIndex > 1
			&& ((parseInt(paginationInfo.total) % parseInt(paginationInfo.size)) === 1)) {
			currentIndex -= 1;
		}

		let that = this;
		deleteComment(this.props.modal, param, () => {
			message.success('删除评论成功');
			let currentInfo = {
				allCurrent: that.state.allRecords.current,
				unCheckCurrent: that.state.unCheckRecords.current,
				checkedCurrent: that.state.checkedRecords.current,
				checkFailedCurrent: that.state.checkFailedRecords.current,
			};
			currentInfo[info.currIndexName] = currentIndex;
			that.refreshCurrData(currentInfo);
		});
	}

	onCommentStatusClick(key, currStatus, commentId, info, paginationInfo) {
		console.log(" onCommentStatusClick key: " + key + ", currStatus: " + currStatus + ", commentId: " + commentId + ", info.currIndexName: " + info.currIndexName);
		if (parseInt(key) === parseInt(currStatus)) {
			console.warn("click status is curr status");
			return;
		}

		let param = {
			idList: [commentId],
			status: key
		};
		let that = this;
		let currentIndex = parseInt(paginationInfo.current);

		if ((currentIndex === parseInt(paginationInfo.pages))
			&& currentIndex > 1
			&& ((parseInt(paginationInfo.total) % parseInt(paginationInfo.size)) === 1)) {
			currentIndex -= 1;
		}

		updateCommentStatus(this.props.modal, param, () => {
			message.success('评论状态更新成功');

			//当更新了评论的这状态后，当前List列表的数量可能会从n+1页，退回到n页，因此需要进行计算
			let currentInfo = {
				allCurrent: that.state.allRecords.current,
				unCheckCurrent: that.state.unCheckRecords.current,
				checkedCurrent: that.state.checkedRecords.current,
				checkFailedCurrent: that.state.checkFailedRecords.current,
			};
			currentInfo[info.currIndexName] = currentIndex;
			that.refreshCurrData(currentInfo);
		});
	}

}

CommentView.defaultProps = {
	isShowScoreModal: false
};

export default CommentView;
