import React, {Component, Fragment} from 'react';
import {connect} from 'dva';

import {
	Form,
	message,
	Button
} from 'antd';
import TagsLayout from '../../../../../components/tag/TagsLayout';
import * as Data from '../../../../../data/data';
import {addApplyGuiderProfessionArticle, getApplyGuiderProfessionArticle}from '../../../../../services/AppApi';

const FormItem = Form.Item;


@Form.create()
class IntroduceEditView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tags: []
		}
	}

	componentDidMount() {
		let that = this;
		getApplyGuiderProfessionArticle(this.props.schoolId).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				let professionArticleList = response.response;
				console.log(" professionArticleList: " + JSON.stringify(professionArticleList));

				that.setState({
					tags: that.getTagsFromList(professionArticleList)
				});

			} else {
				message.error(this.props.profession.professionalName + " 获取专业介绍失败 error: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error(this.props.profession.professionalName + " 获取专业介绍失败 error: " + JSON.stringify(error));
		});
	}

	getTagsFromList(list) {
		let id = this.props.profession.professionalId;
		console.log(" getTagsFromList id: " + id);
		for(let index in list) {
			let item = list[index];
			if(id === item.professionalId) {
				console.log(" getTagsFromList has same id ");
				return item.contentJson;
			}
		}
		console.log(" getTagsFromList end ");
		return [];
	}

	render() {
		console.log(" introduce render tags: " + JSON.stringify(this.state.tags));
		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>
				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="介绍"
					style={{}}
				>
					<TagsLayout
						title="专业介绍"
						onTagsChange={(tags) => this.onChange(tags)}
						tags={this.state.tags}
					/>
				</FormItem>

				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<Button type="primary" htmlType="submit">
						保存
					</Button>
				</FormItem>
			</Form>
		);
	}

	onChange(tags) {
		this.setState({
			tags: tags
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		const {getFieldProps, getFieldValue} = this.props.form;
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.addOrUpdate();
			} else {
				console.log(' user input data is invalid ... ');
			}
		});
	}

	addOrUpdate() {
		let param = {
			contentJson: this.state.tags,
			professionalId: this.props.profession.professionalId,
			schoolId: this.props.schoolId
		};

		let that = this;
		addApplyGuiderProfessionArticle(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.props.onDialogDismiss();
				message.success("学校专业介绍编辑成功");
			} else {
				message.success("学校专业介绍编辑失败: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.success("学校专业介绍编辑失败: " + JSON.stringify(error));
		});
	}



}

export default IntroduceEditView;
