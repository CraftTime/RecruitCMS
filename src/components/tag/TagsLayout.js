import React, {Component} from 'react';
import {Form, Tag, Input, Tooltip, Icon, Modal, Button, message, Popconfirm} from 'antd';
import TagEditView from './TagEditView';
import {isEmpty} from '../../utils/utils';
import * as Data from '../../data/data';
import Style from './TagLayout.less';


class TagsLayout extends Component {
	constructor(props) {
		super();
		this.state = {
			tags: this.getTags(props.tags),
			inputVisible: false,
			inputValue: '',
			isShowDialog: false,
			opTag: null,
		}

		console.log(" TagLayout constructor tags: " + JSON.stringify(this.state.tags))
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			tags: this.getTags(nextProps.tags)
		});

	}

	getTags(tags) {
		if (isEmpty(tags)) {
			return [];
		} else {
			return tags;
		}
	}

	handleClose = removedTag => {
		const tags = this.state.tags.filter(tag => tag.title !== removedTag.title);
		console.log(tags);
		this.setState({tags}, function () {
			this.props.onTagsChange(this.state.tags);
		});
	};

	onAddTag = () => {
		this.setState({
			opTag: null,
			isShowDialog: true
		});
		// this.setState({inputVisible: true}, () => this.input.focus());
	};

	handleInputChange = e => {
		this.setState({inputValue: e.target.value});
	};

	handleInputConfirm = () => {
		const {inputValue} = this.state;
		let {tags} = this.state;
		if (inputValue && tags.indexOf(inputValue) === -1) {
			tags = [...tags, inputValue];
		}
		console.log(tags);
		this.setState({
			tags,
			inputVisible: false,
			inputValue: '',
		});
	};

	saveInputRef = input => (this.input = input);

	render() {
		const {tags, inputVisible, inputValue} = this.state;
		return (
			<div>
				{this.state.isShowDialog &&
				<Modal
					title={this.props.title}
					destroyOnClose="true"
					width={Data.MODEL_WIDTH}
					onCancel={() => this.onDialogDismiss()}
					visible={true}
					footer={[]}
				>
					<TagEditView
						tag={this.state.opTag}
						onDialogDismiss={(tag) => this.onTagDialogDismiss(tag)}
					/>
				</Modal>
				}
				{tags.map((tag, index) => {
					const isLongTag = tag.title.length > 20;
					const isLastLongTag = tag.desc.length > 100;
					const tagElem = (
						<Tag
							key={tag.title} onClose={(event) => {
							this.handleClose(tag);
						}}>

							<span>
							<text
								onClick={() => {
									tag.index = index;
									this.onEditTag(tag)
								}}
							>{isLongTag ? `${tag.title.slice(0, 20)}...` : tag.title}</text>
								 <Popconfirm
									 title="是否要删除该标签"
									 onConfirm={() => {
										 this.handleClose(tag);
									 }}
									 okText="确定"
									 cancelText="取消"
								 >
									<text style={{marginLeft: '0.8rem', cursor: 'pointer'}}>x</text>
                                </Popconfirm>
							</span>
						</Tag>


					);
					return (
						<Tooltip
							placement="bottom"
							title={isLastLongTag ? '点击查看详情': tag.desc} key={index}>
							{tagElem}
						</Tooltip>



					);
				})}
				{inputVisible && (
					<Input
						ref={this.saveInputRef}
						type="text"
						size="small"
						style={{width: 78,}}
						value={inputValue}
						onChange={this.handleInputChange}
						onBlur={this.handleInputConfirm}
						onPressEnter={this.handleInputConfirm}
					/>
				)}
				{!inputVisible && (
					<Tag onClick={this.onAddTag} style={{background: '#fff', borderStyle: 'dashed'}}>
						<Icon type="plus"/>
					</Tag>
				)}
			</div>
		);
	}

	onDialogDismiss() {
		this.setState({
			isShowDialog: false,
		})
	}

	onEditTag(tag, index) {
		this.setState({
			opTag: tag,
			isShowDialog: true,
		});
	}

	onTagDialogDismiss(newTag) {
		let that = this;
		let {tags} = this.state;
		let newTags = [...tags];
		if (newTag.index === -1) {
			newTags.push(newTag);
		} else {
			newTags[newTag.index] = newTag;
		}

		this.setState({
			tags: newTags,
			isShowDialog: false
		}, function () {
			that.props.onTagsChange(that.state.tags);
		});
	}

}

export default TagsLayout;
