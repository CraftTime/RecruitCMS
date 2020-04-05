import React, {Component} from 'react';
import {Comment, Tooltip, List, message} from 'antd';
import {isEmpty} from '../../../../utils/utils';


class CommentListView extends Component {


	render() {
		const {data, onPaginationChange} = this.props;
		let that = this;
		return (
			<List
				className="comment-list"
				header={`${that.props.paginationInfo.total}个评论`}
				itemLayout="vertical"
				split={true}
				dataSource={data}
				pagination={{
					onChange: (page, pageSize) => {
						if(onPaginationChange) {
							onPaginationChange(page, pageSize);
						}
					},
					...that.props.paginationInfo
				}}
				renderItem={item => (
					<li>
						<Comment
							actions={item.actions}
							author={item.author}
							avatar={isEmpty(item.avatar) ?  'https://www.yk0591.com/images/def_user_logo.png' : item.avatar}
							content={item.content}
							datetime={item.datetime}
						/>
					</li>
				)}
			/>
		);
	}

}

export default CommentListView;
