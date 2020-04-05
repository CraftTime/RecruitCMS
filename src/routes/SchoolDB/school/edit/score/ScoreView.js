import React, {Component} from 'react';
import {connect} from 'dva';
import {Tabs, Card, message, Modal} from 'antd';
import * as Data from '../../../../../data/data';
import {isEmpty, isSuccess} from '../../../../../utils/utils';
import ScoreListView from './ScoreListView';
import {getSchoolAllScore, deleteSchoolScore, addOrUpdateSchoolScore} from '../../../../../services/AppApi';


const {TabPane} = Tabs;

class ScoreView extends Component {

	constructor(props) {
		super();
		this.state = {
			response: {}
		};
	}

	componentDidMount() {
		this.refresh();
	}

	refresh() {
		let that = this;
		getSchoolAllScore(this.props.school.id).then(function (response) {
			if (isSuccess(response)) {
				console.info('获取院校分数列表成功 ' + JSON.stringify(response));
				that.setState({
					response: response
				});
			} else {
				message.error('获取院校分数列表失败 failed: ' + JSON.stringify(response));
			}
		}).catch(function (error) {
			message.error('获取院校分数列表失败 error: ' + JSON.stringify(error));
		})

	}

	collectData(response) {

		let tabViews = [];
		for (let i in response.response) {
			let course = response.response[i];

			let yearList = [];
			let yearScoreMap = new Map();

			for (let j in course.years) {
				let yearScore = course.years[j];
				yearList.push(yearScore.year);
				yearScoreMap.set(yearScore.year, yearScore.info);
			}


			let listView = (
				<ScoreListView
					yearList={yearList}
					yearScoreMap={yearScoreMap}
					onRefresh={()=> this.refresh()}
				/>
			);

			let tab = (
				<TabPane tab={course.name} key={course.courseId}>
					{listView}
				</TabPane>
			);

			tabViews.push(tab);
		}

		return tabViews;
	}

	render() {
		const {response} = this.state;
		return (
			<div>
				<Tabs onChange={(key) => this.callback(key)} type="card">
					{this.collectData(response)}
				</Tabs>
			</div>

		);
	}

	callback(key) {
		console.info(' callback key: ' + key);
	}


}

export default ScoreView;
