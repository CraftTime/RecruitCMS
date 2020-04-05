import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, Table, Modal, Popconfirm, Divider, message, Button, InputNumber} from 'antd';
import * as Data from '../../../data/data';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Style from '../../../css/common.less';
import {getStudioImageList, deleteStudioImage, addOrUpdateStudioImage} from '../../../services/AppApi';
import ImageEditView from './ImageEditView';
import TypeListView from '../../../components/Studio/TypeList/TypeListView';
import ArticleEditView from '../../Article/edit/ArticleEditView';
import {isEmpty} from '../../../utils/utils';
import CommentView from '../../Article/comment/CommentView';

const BASE_INFO = 0;
const ARTICLE = BASE_INFO + 1;
const COMMENT = BASE_INFO + 2;


@connect(({studio}) => ({
	studio,
}))
class ImageListView extends Component {

	constructor(props) {
		super();
		this.state = {
			operateMode: BASE_INFO,
			isShowModel: false,
			response: {},
			modelTitle: '',
			image: null,
		}
	}

	componentDidMount() {
		this.refreshStudioImageList(1, Data.PAGINATION_INFO.pageSize);
	}


	refreshStudioImageList(pageIndex, pageSize) {
		//dsd
		const param = {
			studioId: this.props.studioInfo.id,
			pagination: {
				pageIndex: pageIndex,
				pageSize: pageSize,
				typeId: this.props.typeId,
			}
		};

		let that = this;

		getStudioImageList(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.setState({
					response: response.response
				});

			} else {
				message.error(" 画室图集获取失败 typeId: " + that.props.typeId);
			}

		}).catch(function (error) {
			message.error(" 画室图集获取失败: " + JSON.stringify(error));
		});
	}

	render() {
		const {selectedRowKeys, studioInfo} = this.props;
		const {response} = this.state;
		const columns = [
			{
				title: '序号',
				align: 'center',
				render: (val, record, index) => (
					<text>{(response.current - 1 ) * Data.PAGINATION_INFO.pageSize + index + 1}</text>)
			},
			{
				title: '画室名称',
				align: 'center',
				render: (val, record) => (<text>{studioInfo.name}</text>),
			},
			{
				title: '图集名称',
				align: 'center',
				dataIndex: 'name'
			},
			{
				title: '封面图片',
				align: 'center',
				dataIndex: 'url',
				render: (val, record, index) => (<img className={Style.listItemIcon} src={val} alt="暂无图片"/>)
			},
			{
				title: '排序',
				align: 'center',
				dataIndex: 'weight',
				render: (val, record, index) =>
					<RankInput
						onChange={(value) => this.updateRank(record, value)}
						weight={record.weight}/>

			},
			{
				title: '状态',
				align: 'center',
				render: (val, record, index) => (<text>{ -1 === record.articleId ? '未绑定文章' : '已绑定文章'}</text>)
			},
			{
				title: '内容编辑',
				align: 'center',
				render: (val, record) => (<div>
						<Button onClick={() => this.onShowOperatorView(ARTICLE, record)} type="normal"
						        shape="circle" icon="edit"/>
					</div>
				),
			},

			{
				title: '评论管理',
				align: 'center',
				render: (val, record) => (<div>
						<Button onClick={() => this.onCommentClick(record)} type="normal"
						        shape="circle" icon="message"/>
					</div>
				),
			},

			{
				title: '操作',
				align: 'center',
				dataIndex: 'operator',
				render: (val, record) => (<div>
						<Button className={Style.commonBtn} onClick={() => this.onEdit(record)} type="normal"
						        shape="circle"
						        icon="edit"/>

						<Popconfirm title="是否要删除该画室图集？"
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

		const rowSelection = {
			selectedRowKeys,
			onChange: this.handleRowSelectChange,
			getCheckboxProps: record => ({
				disabled: record.disabled,
			}),
		};

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

		return (
			<div>
				{this.state.isShowModel &&
				<Modal
					destroyOnClose="true"
					title={this.state.modelTitle}
					onCancel={() => this.onDialogDismiss()}
					visible={true}
					width={Data.MODEL_WIDTH}
					footer={[]}
				>
					{this.getOpView()}

				</Modal>
				}

				<div className={Style.commonBtnLayout}>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.props.onShowTypeMrg()
					}}>画室图集类型管理</Button>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.refreshStudioImageList(this.state.response.current, Data.PAGINATION_INFO.pageSize);
					}}>刷新</Button>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.onAdd()
					}}>添加</Button>
				</div>

				<Table
					size="small"
					bordered
					// rowSelection={rowSelection}
					dataSource={response.records}
					pagination={paginationProps}
					columns={columns}
					onChange={this.onPageChange.bind(this)}
				/>

			</div>
		);
	}

	onDelClick(id) {
		let that = this;
		const param = {
			id: id
		};
		deleteStudioImage(param)
			.then(function (response) {
				if (response.meta.code === 0) {
					that.refreshStudioImageList(1, Data.PAGINATION_INFO.pageSize);
					message.success("删除画室图集成功");
				} else {
					message.error("删除画室图集失败 errorMsg: " + JSON.stringify(response.meta));
				}
			}).catch(function (e) {
			message.error("删除画室图集失败 error: " + JSON.stringify(e));
		});
	}

	onPageChange(page, pageSize) {
		this.refreshStudioImageList(page.current, page.pageSize);
	}

	onDialogDismiss() {
		let that = this;
		this.setState({
			isShowModel: false,
		}, function () {
			this.refreshStudioImageList(that.state.response.current, Data.PAGINATION_INFO.pageSize);
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const {getFieldProps, getFieldValue} = this.props.form;
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.updatePriceInfo();
			} else {
				console.log(' user input data is invalid ... ');
			}
		});
	}

	onCommentClick(image) {
		this.setState({
			isShowModel: true,
			operateMode: COMMENT,
			modelTitle: this.getStudioName() + " / " + '画室图集文章评论管理',
			image: image
		});
	}

	onShowOperatorView(type, image) {
		this.setState({
			isShowModel: true,
			operateMode: type,
			modelTitle: this.getStudioName() + " / " + '画室图集文章详情',
			image: image
		});
	}

	onEdit(image) {
		this.setState({
			isShowModel: true,
			operateMode: BASE_INFO,
			modelTitle: this.getStudioName() + " / " + '编辑画室图集',
			image: image
		});
	}

	onAdd() {
		this.setState({
			isShowModel: true,
			operateMode: BASE_INFO,
			modelTitle: '新增画室图集',
			image: null
		});
	}

	getStudioName() {
		return this.props.studioInfo.name
	}


	getOpView() {
		switch (this.state.operateMode) {
			case COMMENT:
				return (
					<CommentView
						articleId={this.state.image.articleId}
					/>

				);
				break;
			case BASE_INFO:
				return (
					<ImageEditView
						studioInfo={this.props.studioInfo}
						typeId={this.props.typeId}
						image={this.state.image}
						onDialogDismiss={() => this.onDialogDismiss()}
					/>

				);
				break;
			case ARTICLE:
				return (
					<ArticleEditView
						miniAppImageSizeTip={Data.LOGO_SIZE_TIP_TRAIN_COMMON}
						webAppImageSizeTip={Data.LOGO_SIZE_TIP_TRAIN_COMMON}
						id={this.state.image === null ? -1 : this.state.image.articleId}
						disableEditType={true}
						shouldShowHeadLineSet={false}
						mimiAppArticleType={
							{
								options: [
									{
										label: '画室图集',
										value: Data.ARTICLE_TYPE_STUDIO_IMAGE,
									}
								],
								ids: [Data.ARTICLE_TYPE_STUDIO_IMAGE]
							}
						}
						webArticleType={
							{
								options: [
									{
										label: '画室图集',
										value: Data.ARTICLE_TYPE_STUDIO_IMAGE,
									}
								],
								ids: [Data.ARTICLE_TYPE_STUDIO_IMAGE]
							}
						}
						miniAppArticleTypeCheckList={[Data.ARTICLE_TYPE_STUDIO_IMAGE]}
						webAppArticleTypeCheckList={[Data.ARTICLE_TYPE_STUDIO_IMAGE]}
						onFinish={(articleId)=> this.addOrUpdateArticleId(articleId)}
					/>
				);
				break;
		}
	}

	addOrUpdateArticleId(articleId) {
		let newImage = {...this.state.image};
		newImage.typeId = this.props.typeId;
		newImage.articleId = articleId;
		const param = {
			studioId: this.props.studioInfo.id,
			image: newImage
		};

		let that = this;
		addOrUpdateStudioImage(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				console.log("画室图集的文章编辑成功");
			} else {
				console.error("画室图集的文章编辑失败");
			}
			that.onDialogDismiss(true);

		}).catch(function (error) {
			console.error("画室图集的文章编辑失败 error: " + JSON.stringify(error));
			that.onDialogDismiss(true);
		});
	}

	updateRank(record, weight) {
		let newImage = {...record};
		newImage.typeId = this.props.typeId;
		newImage.weight = weight;
		const param = {
			studioId: this.props.studioInfo.id,
			image: newImage
		};

		let that = this;
		addOrUpdateStudioImage(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				message.success('画室图集排序成功');
				that.refreshStudioImageList(that.state.response.current, Data.PAGINATION_INFO.pageSize);
			} else {
				message.error("画室图集排序失败: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error("画室图集排序失败: " + JSON.stringify(error));
		});
	}



}

class RankInput extends Component {
	render() {
		return (
			<InputNumber
				ref="input"
				style={{width: '4rem'}}
				size="small"
				min={0}
				onChange={(value)=> {
					this.props.onChange(value);
				}}
				value={this.props.weight}
				placeholder=""/>
		);
	}
}

export default ImageListView;
