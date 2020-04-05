import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Modal, Button} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import LectureListView from './LectureListView';
import * as Data from '../../../data/data';
import TypeListView from '../../../components/Studio/TypeList/TypeListView';
import Style from '../../../css/common.less';


const {TabPane} = Tabs;

@connect(({studio}) => ({
	studio,
}))
class StudioLectureView extends Component {
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
			type: 'studio/getLectureTypeList',
			param: {
				institutionId: this.props.studioInfo.id
			}
		});
	}

	render() {
		const {studio: {lectureTypeList}} = this.props;


		let tabPanes = [];

		for (let index in lectureTypeList) {
			let type = lectureTypeList[index];

			let tabPane = (
				<TabPane tab={type.name} key={type.id}>
					<LectureListView
						onShowTypeMrg={()=> this.onShowTypeMrg()}
						studioInfo={this.props.studioInfo}
						typeId={type.id}
					/>
				</TabPane>
			);

			tabPanes.push(tabPane);
		}


		return (
			<div>
				{this.state.isShowModel &&
				<Modal
					destroyOnClose="true"
					title="画室课程类型管理"
					onCancel={() => this.onDialogDismiss(false)}
					visible={true}
					width={(Data.MODEL_WIDTH)}
					footer={[]}
				>
					<TypeListView
						institutionId={this.props.studioInfo.id}
						typeList={lectureTypeList}
						addOrUpdateMethod="addOrUpdateLectureTypeList"
						getTypeListMethod="getLectureTypeList"
						deleteUrl='/institutionLessonType/delete'
						title="画室课程类型"
					/>

				</Modal>
				}
				{lectureTypeList.length === 0 &&
				<div className={Style.commonBtnLayout}>
					<Button className={Style.commonBtn} type="primary" onClick={() => {
						this.onShowTypeMrg();
					}}>画室课程类型管理</Button>
				</div>
				}
				<Tabs onChange={(key) => this.callback(key)} type="card">
					{tabPanes}
				</Tabs>
			</div>
		);
	}

	callback(key) {
		console.info(' callback key: ' + key);
	}


	onShowTypeMrg() {
		this.setState({
			isShowModel: true,
			modelTitle: '画室课程类型管理',
		});
	}


	onDialogDismiss() {
		this.setState({
			isShowModel: false,
		});
	}

}

export default StudioLectureView;
