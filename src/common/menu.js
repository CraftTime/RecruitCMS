import {isUrl} from '../utils/utils';

const menuData = [
	// {
	// 	name: '权限管理',
	// 	icon: 'lock',
	// 	path: 'permission',
	//
	// },
	{
		name: '首页',
		icon: 'home',
		path: 'home',
	},
	{
		name: 'Banner广告',
		icon: 'user',
		path: 'banner',
	},
	{
		name: '招聘者',
		icon: 'database',
		path: 'recruiter',
	},
	{
		name: '求职者',
		icon: 'highlight',
		path: 'job-seeker',
	},
	{
		name: '岗位管理',
		icon: 'book',
		path: 'teach',
	},

	{
		name: '简历管理',
		icon: 'message',
		path: 'resume',
	},
	{
		name: '面试管理',
		icon: 'shopping',
		path: 'interview',
	},
	{
		name: '公司管理',
		icon: 'gift',
		path: 'company',
	},
	{
		name: '通知管理',
		icon: 'book',
		path: 'notification',
	},
	{
		name: '用户反馈',
		icon: 'setting',
		path: 'feedback',
	},
	{
		name: '软件信息',
		icon: 'setting',
		path: 'app',
	},
	{
		name: '选项管理',
		icon: 'setting',
		path: 'option',
		children: [
			{
				name: '城市',
				path: 'city'
			},
			{
				name: '年龄',
				path: 'age'
			},
			{
				name: '行业',
				path: 'industry'
			},
			{
				name: '职业',
				path: 'occupation'
			},
			{
				name: '学历',
				path: 'education'
			},
			{
				name: '待遇',
				path: 'treatment'
			},
			{
				name: '工作经验',
				path: 'work-experience'
			},
			{
				name: '工作时间',
				path: ' work-date'
			},
			{
				name: '公司规模',
				path: 'scale'
			},
			{
				name: '薪资待遇',
				path: 'salary'
			},

		]
	}
];

function formatter(data, parentPath = '', parentAuthority) {
	return data.map((item) => {
		let {path} = item;
		if (!isUrl(path)) {
			path = parentPath + item.path;
		}
		const result = {
			...item,
			path,
			authority: item.authority || parentAuthority,
		};
		if (item.children) {
			result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
		}
		return result;
	});
}

export const getMenuData = () => formatter(menuData);
