import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Modal, Button} from 'antd';
import Style from '../../../css/common.less';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import ImageTextListView from './ImageTextListView';
import TeachImageTextSecondView from './TeachImageTextSecondView';
import * as Data from '../../../data/data';
import TypeListView from '../../../components/Studio/TypeList/TypeListView';


const {TabPane} = Tabs;

@connect(({teach}) => ({
	teach,
}))
class TeachImageTextView extends Component {
	constructor(props) {
		super();
		this.state = {
			isShowDialog: false
		};
	}

	componentDidMount() {
		this.getTypeList();
	}

	getTypeList() {
		const {dispatch} = this.props;
		dispatch({
			type: 'teach/getImageTextTypeList',
		});
	}

	render() {
		const {teach: {imageTextTypeList}} = this.props;


		let tabPanes = [];

		for (let index in imageTextTypeList) {
			let type = imageTextTypeList[index];

			let tabPane = (
				<TabPane tab={type.name} key={type.id}>
					<TeachImageTextSecondView
						onShowFirstTypeMrg={()=> this.onShowTypeMrg()}
						parentTypeId={type.id}
					/>
				</TabPane>
			);

			tabPanes.push(tabPane);
		}


		return (
			<PageHeaderLayout title="图文教学" content="">
				<Card bordered={false}>
					{this.state.isShowModel &&
					<Modal
						destroyOnClose="true"
						title="图文教学一级类型管理"
						onCancel={() => this.onDialogDismiss(false)}
						visible={true}
						width={(Data.MODEL_WIDTH)}
						footer={[]}
					>
						<TypeListView
							typeList={imageTextTypeList}
							modelName="teach"
							addOrUpdateMethod="addOrUpdateImageTextType"
							getTypeListMethod="getImageTextTypeList"
							deleteUrl='/teachArticleTypeOne/delete'
							title="艺考图文教学一级类型管理"
						/>

					</Modal>
					}
					{imageTextTypeList.length === 0 &&
					<div className={Style.commonBtnLayout}>
						<Button className={Style.commonBtn} type="primary" onClick={() => {
							this.onShowTypeMrg();
						}}>图文教学一级类型管理</Button>
					</div>
					}
					<Tabs onChange={(key) => this.callback(key)} type="card">
						{tabPanes}
					</Tabs>
				</Card>
			</PageHeaderLayout>
		);
	}

	onShowTypeMrg() {
		this.setState({
			isShowModel: true,
			modelTitle: '艺考教学图文类型管理',
		});
	}

	callback(key) {
		console.info(' callback key: ' + key);
	}


	onDialogDismiss() {
		this.setState({
			isShowModel: false,
		});
	}



}

export default TeachImageTextView;
