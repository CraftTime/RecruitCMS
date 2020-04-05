import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Form, Input, Button, message, Select, Switch, InputNumber} from 'antd';
import * as Data from '../../../data/data';
import * as DateUtils from '../../../utils/DateUtils';
import ArticleImage from "../../../components/ArticleImgage/ArticleImage";
import {addOrUpdateStudio} from '../../../services/AppApi';
import {isEmpty} from '../../../utils/utils';
import {addOrUpdateStudioBanner} from '../../../services/AppApi';
import CommonStyle from '../../../css/common.less';

const FormItem = Form.Item;
const {TextArea} = Input;

const NAME = 0;
const DESC = NAME + 1;
const VISIBLE = NAME + 2;
const LOGO = NAME + 10;

@Form.create()
@connect(({studio}) => ({
	studio,
}))
class BannerEditView extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			banner: this.getInfo(props.banner)
		};
	}

	render() {
		const {banner} = this.state;
		const {studioInfo} = this.props;
		const {getFieldDecorator} = this.props.form;
		return (
			<Form
				onSubmit={e => this.handleSubmit(e)}
				hideRequiredMark
				style={{marginTop: 8}}
			>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="画室名称"
					style={{}}
				>
					<text>{studioInfo.name}</text>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="描述"
					style={{}}
				>
					{getFieldDecorator('desc', {
						initialValue: banner.desc,
						rules: [{
							required: true, message: '请输入Banner描述',
						}],
					})(
						<TextArea
							rows={4}
							style={{width: Data.FORM_ITEM_WIDTH}}
							value={banner.desc} placeholder=""
							onChange={(event) => this.onChange(DESC, event.target.value)}/>
					)}
				</FormItem>


				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="图片"
					hasFeedback
				>{getFieldDecorator('url', {
					initialValue: banner.url,
					rules: [{
						required: true, message: '请选择Banner图片',
					}],
				})(
					<Input
						value={banner.url} placeholder=""
						onChange={(event) => this.onChange(LOGO, event.target.value)}/>
				)}
					<ArticleImage
						title="画室Banner图片"
						onUrlChange={(url) => this.onChange(LOGO, url)}
						url={banner.url}
					/>
				</FormItem>

				<FormItem
					{...Data.FORM_ITEM_LAYOUT}
					label="显示开关"
					style={{}}
				>
					<Switch checked={banner.visible}
					        onChange={(value) => this.onChange(VISIBLE, value)}/>
				</FormItem>


				<FormItem {...Data.SUBMIT_FORM_LAYOUT} style={{marginTop: 32}}>
					<Button type="primary" htmlType="submit">
						提交
					</Button>
				</FormItem>
			</Form>
		);
	}

	getInfo(banner) {

		if (banner !== null) {
			return banner;
		} else {
			return {
				id: -1,
				articleId: -1,
			};
		}
	}

	onChange(type, value) {
		let {banner} = this.state;
		let newInfo = {...banner};

		switch (type) {

			case DESC:
				newInfo.desc = value;
				break;

			case VISIBLE:
				newInfo.visible = value;
				break;

			case LOGO:
				newInfo.url = value;
				break;
		}

		this.setState({
			banner: newInfo
		});

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
		const param = {
			studioId: this.props.studioInfo.id,
			banner: this.state.banner
		};
		const baseDialogTitle = isEmpty(this.props.banner) ? "新增画室Banner" : "编辑画室Banner";
		let that = this;
		addOrUpdateStudioBanner(param).then(function (response) {
			if (Data.API_STATUS_SUCCESS === response.meta.code) {
				that.props.onDialogDismiss();
				message.success(baseDialogTitle + "操作成功");
			} else {
				message.error(baseDialogTitle + "操作失败: " + JSON.stringify(response));
			}

		}).catch(function (error) {
			message.error(baseDialogTitle + "操作失败: " + JSON.stringify(error));
		});
	}

}

export default BannerEditView;
