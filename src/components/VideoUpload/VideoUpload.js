import React, {Component} from 'react';

import {Upload, Icon, Modal, message, Button} from 'antd';
import Style from './ArticleImage.less';
import {importExcelFile} from '../../services/AppApi';
import * as AppInfo from '../../utils/AppInfo';
import {isSuccess, isEmpty} from '../../utils/utils';

import {
	Player,
	BigPlayButton,
	ControlBar,
	PlayToggle,
	VolumeMenuButton,
	FullscreenToggle,
} from 'video-react';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "video-react/dist/video-react.css";

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}


export default class VideoUpload extends Component {
	constructor(props) {
		super();
		this.state = {
			videoUrl: props.url,
			previewVisible: !isEmpty(props.url),
			fileList: [],
			videoFile: null,
			isShowVideo: false
		}
	}

	handleCancel = () => {
		this.player.pause();
		this.player.seek(0);
		this.setState({isShowVideo: false})
	};

	handlePreview = async file => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		this.setState({
			previewImage: file.url || file.preview,
			previewVisible: true,
		});
	};


	handleChange = ({fileList}) => {
		this.setState({fileList})
	};

	uploadFile(file) {
		if (isEmpty(file)) {
			console.error(' video file is empty');
			return;
		}
		const {onUrlChange} = this.props;
		const that = this;
		const formData = new FormData();
		formData.append('image', file);

		importExcelFile(this.props.uploadUrl, formData).then(function (response) {
			if (isSuccess(response)) {
				console.info(' 视频上传成功');
				onUrlChange(response.response);
			} else {
				console.error(' 视频上传失败 error: ' + JSON.stringify(response));
			}
		}).catch(function (error) {
			console.error(' 视频上传失败 error: ' + JSON.stringify(error));
		});
	}

	componentWillReceiveProps(nextProps) {
		const newUrl = nextProps.url;
		this.setState({
			videoUrl: newUrl
		});
	}

	render() {
		const that = this;
		const props = {
			onRemove: file => {

				this.setState({
					fileList: [],
					videoFile: null
				});

			},
			beforeUpload: file => {
				this.videoFile = file;
				this.setState({
					fileList: file,
					videoFile: file
				});
				return false;
			},
			accept: 'mp4',
		};

		const {previewVisible, fileList, videoUrl, isShowVideo} = this.state;
		const uploadButton = (
			<div>
				<Icon type="plus"/>
				<div className={Style.antUploadText}></div>
			</div>
		);
		let isEmptyVideoFile = isEmpty(this.state.videoFile);
		return (
			<div>
				<Upload
					{...props}
					listType="picture-card"
					fileList={fileList}
					onChange={this.handleChange}
				>
					{fileList.length >= 1 ? null : uploadButton}
				</Upload>
				<div>
					<Button disabled={isEmpty(this.state.videoFile)}
					        onClick={() => this.uploadFile(this.state.videoFile)}>
						<Icon type={isEmptyVideoFile ? 'select' : "upload"}/>{isEmptyVideoFile ? '选择视频' : '上传视频'}
					</Button>
					<Button style={{marginLeft: '10px'}} disabled={isEmpty(videoUrl)} onClick={() => {
						this.setState({
							isShowVideo: true

						})
					}}>
						<Icon type="play-circle"/>预览视频
					</Button>
				</div>
				{isShowVideo &&
				<Modal
					destroyOnClose="true"
					visible={true} footer={null} onCancel={this.handleCancel}>
					<Player
						ref={player => {
							this.player = player;
						}}
						autoPlay={true}
						className={Style.video} videoId="video-1" playsInline="true">
						<source src={videoUrl}/>
						<BigPlayButton position="center" className={Style.videoBtn}/>
						<ControlBar onDismiss={() => message.success('ds')} autoHide="false"
						            disableDefaultControls="true">
							<PlayToggle/>
							<VolumeMenuButton/>
							<FullscreenToggle/>
						</ControlBar>
					</Player>
				</Modal>
				}
			</div>
		);

	}
}
