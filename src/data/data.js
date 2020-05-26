const PROVINCES = ['福建省', '北京市', '江西省'];
const CITY = ['福州', '厦门', '上海', '深圳', "海洲"];
const NATURE = ['公办', '民办', '独立学院'];
const SCHOOL_TYPE = ['理工类', '综合类', '农林类', '师范类', '财经类', '林业类', '财经政法类'];

const PROFESSIONAL_DIALOG_MODE_RW = 1;
const PROFESSIONAL_DIALOG_MODE_RWS = 2;

//用户设置，进入主页面后，默认被选中的菜单
const DEF_MENU_ITEM = '/home';

const COURSE_TYPE_SCIENCE = 2;
const COURSE_TYPE_LIBERAL = 1;
const COURSE_TYPE_ALL = 3;


const PROMOTION_STATUS_OPEN = 1;
const PROMOTION_STATUS_CLOSE = 0;

const PROMOTION_STATUS_TITLE_MAP = new Map([
	[PROMOTION_STATUS_OPEN, '开启'],
	[PROMOTION_STATUS_CLOSE, '关闭'],
]);

const SCHOOL_LEVEL_211 = 1;
const SCHOOL_LEVEL_985 = 2;
const SCHOOL_LEVEL = [
	{label: '211', value: SCHOOL_LEVEL_211},
	{label: '985', value: SCHOOL_LEVEL_985}
];
const FORMULA_LIST_MODE_RW = 1;
const FORMULA_LIST_MODE_SELECT = 2;

const FORMULA_VIEW_MODE_RW = 1;
const FORMULA_VIEW_MODE_RO = 2;

const SCHOOL_ATTR = ['省属重点', '国家重点建设', '双一流'];
const SCHOOL_SUBJECTION = ['福建省人民政府', '福建省', '福建省人民政府'];

const FORM_ITEM_WIDTH = 200;
const MODEL_WIDTH = 850;


const FORM_ITEM_LAYOUT = {
	labelCol: {
		xs: {span: 24},
		sm: {span: 7},
	},
	wrapperCol: {
		xs: {span: 24},
		sm: {span: 12},
		md: {span: 10},
	},
};

const ADMISSION_PROFESSION_LIST = [
	{
		schoolName: '集美大学',
		professionName: '网络工程',
		rule: 'a+b'
	},
	{
		schoolName: '厦门大学',
		professionName: '软件工程',
		rule: 'a*0.6+b'
	},
];


const SUBMIT_FORM_LAYOUT = {
	wrapperCol: {
		xs: {span: 24, offset: 0},
		sm: {span: 10, offset: 7},
	},
};

const SCHOOL_LIST = [
	{
		id: 0,
		level: 'A批',
		schoolName: '集美大学'

	},
	{
		id: 2,
		level: 'A批',
		schoolName: '厦门大学'

	},
];

const CULTURE_SCORE_TEST_RECORDS = [
	{
		username: '小明',
		telephone: 1,
		userType: '学生',
		grade: '高三',
		city: '福州',
		studio: '橙子文化',
		testSchool: '集美大学',
		testProfession: '设计学',
		professionScore: 230,
		cultureScore: 210,
		remark: '测试备注',
		testTime: 123232,
	}

];

const CULTURE_SCORE_ORDERS = [
	{
		username: '张思',
		orderNo: 'xzdd13defedsd',
		orderPrice: 1.23,
		orderStatus: 1, //1 未付款, 2 已经购买
		purchaseNumber: 999,
		createTime: 2343434,
		payTime: 234343,
	},
	{
		username: '莉丝',
		orderNo: 'xzdd13defedsd',
		orderPrice: 1.23,
		orderStatus: 1, //1 未付款, 2 已经购买
		purchaseNumber: 999,
		createTime: 2343434,
		payTime: 234343,
	},
	{
		username: '王五',
		orderNo: 'xzdd13defedsd',
		orderPrice: 1.23,
		orderStatus: 1, //1 未付款, 2 已经购买
		purchaseNumber: 999,
		createTime: 2343434,
		payTime: 234343,
	}

];

const TEACHER_INVITATION_RECORDS = [
	{
		username: '郭昕',
		totalNumberOfInvitation: 2,
		balance: 100,
		qrCodeUrl: 'https://www.jichuangtech.site:9999/image/326a33eb-2abf-4067-b193-98f7ced0ebf8.jpg'
	}
];

const ADMISSION_CALC_TEST_ORDER = [
	{
		username: '黄彬',
		restNumberOfType: 1,
		restNumberOfProfession: 2,
		restNumberOfCulture: 2,
		restNumberOfForeign: 2,
		payTime: 2323232
	},
	{
		username: '一零跳动',
		restNumberOfType: 1,
		restNumberOfProfession: 2,
		restNumberOfCulture: 2,
		restNumberOfForeign: 2,
		payTime: 2323232
	}
];

const USER_LIST = [
	{
		name: '黄彬',
		telephone: 17750224350,
		username: '一零跳动',
		password: 'zxc',
		city: '福州',
		grade: '高三',
		studio: '艺考网',
		userType: '学生',
	},
	{
		name: '马云',
		telephone: 110,
		username: '阿里巴巴',
		password: 'zxc',
		city: '杭州',
		grade: '高四',
		studio: '淘宝',
		userType: '家长',
	},
];


const USER_TYPE_STUDENT = 1;
const USER_TYPE_TEACHER = 2;
const USER_TYPE_PARENT = 3;


// ==== 文章相关 ===

const BANNER_LOCATION_INDEX = 1;
const BANNER_LOCATION_FLOAT = 2;
const BANNER_LOCATION_CULTURE = 3;
const BANNER_LOCATION_WEB = 4;

const BANNER_ACTION_TYPE_SCENE_CULTURE = '/pages/core/whfcs/whfcs';
const BANNER_ACTION_TYPE_SCENE_SCHOOL_COMPARE = '/pages/core/dxdb/dxdb';
const BANNER_ACTION_TYPE_SCENE_TEACH = '/pages/core/ykjx/ykjx';
const BANNER_ACTION_TYPE_SCENE_COMPREHENSIVE_SCORE = '/pages/core/zhfcs/zhfcs';
const BANNER_ACTION_TYPE_SCENE_QUESTIONS = '/pages/core/dyjh/dyjh';

const BANNER_ACTION_TYPE_SCENE_ADMISSION = '/pages/lqcs/lqcs';
const BANNER_ACTION_TYPE_SCENE_GUIDE = '/pages/bkzn/bkzn';
const BANNER_ACTION_TYPE_SCENE_STUDIO = '/pages/pxjg/pxjg';
const BANNER_ACTION_TYPE_SCENE_MINE = '/pages/mine/mine';

const BANNER_ACTION_TYPE_SCENE_TITLES = new Map([
	[BANNER_ACTION_TYPE_SCENE_CULTURE, '文化分测算'],
	[BANNER_ACTION_TYPE_SCENE_ADMISSION, '录取测算'],
	[BANNER_ACTION_TYPE_SCENE_SCHOOL_COMPARE, '院校对比'],
	[BANNER_ACTION_TYPE_SCENE_GUIDE, '报考指南'],
	[BANNER_ACTION_TYPE_SCENE_TEACH, '艺考教学'],
	[BANNER_ACTION_TYPE_SCENE_COMPREHENSIVE_SCORE, '综合分测算'],
	[BANNER_ACTION_TYPE_SCENE_STUDIO, '培训机构'],
	[BANNER_ACTION_TYPE_SCENE_QUESTIONS, '答疑解惑'],
	[BANNER_ACTION_TYPE_SCENE_MINE, '我的'],
]);

const BANNER_ACTION_TYPE_ARTICLE = 0;
const BANNER_ACTION_TYPE_SCENE = 1;
const BANNER_ACTION_TYPE_NOTHING = 2;

const ARTICLE_TYPE_HEADLINE = 1;
const ARTICLE_TYPE_LECTURE = 2;
const ARTICLE_TYPE_NEWS = 3;
const ARTICLE_TYPE_RECOMMEND = 4;
const ARTICLE_TYPE_COURSE = 5;
const ARTICLE_TYPE_SCHOOL = 6;
const ARTICLE_TYPE_TOPIC = 7;
const ARTICLE_TYPE_REGISTRATION_GUIDE_PROFESSIONAL = 8;
const ARTICLE_TYPE_REGISTRATION_GUIDE_TEACHER = 9;
const ARTICLE_TYPE_REGISTRATION_GUIDE_RECRUIT = 10;
const ARTICLE_TYPE_AE_IMAGE_TEXT = 11;
const ARTICLE_TYPE_STUDIO_IMAGE = 12;
const ARTICLE_TYPE_STUDIO_LECTURE = 13;
const ARTICLE_TYPE_STUDIO_TEACHER = 14;
const ARTICLE_TYPE_BANNER = 15;

const WEB_INDEX_ARTICLE_TYPE = {
	options: [
		{
			label: '艺考头条',
			value: ARTICLE_TYPE_HEADLINE,
		},
		{
			label: '艺考大讲堂',
			value: ARTICLE_TYPE_LECTURE,
		},
		{
			label: '艺考资讯',
			value: ARTICLE_TYPE_NEWS,
		}
	],
	ids: [ARTICLE_TYPE_HEADLINE, ARTICLE_TYPE_LECTURE, ARTICLE_TYPE_NEWS]
};

const MIMI_APP_INDEX_ARTICLE_TYPE = {
	options: [
		{
			label: '推荐',
			value: ARTICLE_TYPE_RECOMMEND,
		},
		{
			label: '教程',
			value: ARTICLE_TYPE_COURSE,
		},
		{
			label: '院校',
			value: ARTICLE_TYPE_SCHOOL,
		},
		{
			label: '话题',
			value: ARTICLE_TYPE_TOPIC,
		}
	],
	ids: [
		ARTICLE_TYPE_RECOMMEND,
		ARTICLE_TYPE_COURSE,
		ARTICLE_TYPE_SCHOOL,
		ARTICLE_TYPE_TOPIC
	]
};

// ==== 文章相关 ===

const BANNER_LOCATION_TITLE = [
	'', '小程序banner', '小程序浮框', '文化分测算banner', '门户信息网banner'
];

const BANNER_ACTION_TYPE_TITLE = [
	'文章显示', '页面跳转', '无链接'
];

const BANNER_EMPTY =
	{
		id: -1,
		locationId: BANNER_LOCATION_INDEX,
		url: '',
		visible: true,
		actionType: BANNER_ACTION_TYPE_ARTICLE,
		actionValue: -1,
	};

const PAGINATION_INFO = {
  pageSize: 10,
};

const PRODUCT_TYPE_CULTURE = 1;
const PRODUCT_TYPE_ADMISSION = 2;
const PRODUCT_TYPE_GUIDE = 3;

const PRODUCT_TTILE_MAP = new Map([
	[PRODUCT_TYPE_CULTURE, '文化分测算'],
	[PRODUCT_TYPE_ADMISSION, '录取测算'],
	[PRODUCT_TYPE_GUIDE, '报考指南'],
]);


const API_STATUS_SUCCESS = 0;
const API_STATUS_SUCCESS_2 = 200;

const STATUS_ALL = -1;
const STATUS_UNPAID = 1;
const STATUS_PAID = 2;
const STATUS_CANCEL = 3;

const COMMENT_STATUS_ALL = -1;
const COMMENT_STATUS_NOT_REVIEWED = 0;
const COMMENT_STATUS_REVIEWED = 1;
const COMMENT_STATUS_REVIEWED_FAILURE = 2;
const COMMENT_STATUS_TITLES = new Map([
	[COMMENT_STATUS_NOT_REVIEWED, '未审核'],
	[COMMENT_STATUS_REVIEWED_FAILURE, '审核失败'],
	[COMMENT_STATUS_REVIEWED, '审核通过'],
]);

const COMMENT_STATUS_TITLE_COLORS = new Map([
	[COMMENT_STATUS_NOT_REVIEWED, ''],
	[COMMENT_STATUS_REVIEWED_FAILURE, '#f00'],
	[COMMENT_STATUS_REVIEWED, '#00f'],
]);


const LEVEL_A = 'A';
const LEVEL_B = 'B';
const LEVEL_ALL = 3;

const ORDER_STATUS_MAP = new Map([
	[STATUS_CANCEL, '已取消'],
	[STATUS_UNPAID, '未支付'],
	[STATUS_PAID, '已支付'],
]);

const USER_TITLE_MAP = new Map([
	[USER_TYPE_STUDENT, '学生'],
	[USER_TYPE_TEACHER, '教师'],
	[USER_TYPE_PARENT, '家长'],
]);


//图片大小
const LOGO_SIZE_TIP_HOME_BANNER = '750x635';
const LOGO_SIZE_TIP_HOME_BELOW_BANNER = '720x190';
const LOGO_SIZE_TIP_NOT_TITLE_ARTICLE = '1x1';
const LOGO_SIZE_TIP_HOME_TITLE_ARTICLE = '361x150';
const LOGO_SIZE_TIP_CULTURE_BANNER = '750x470';
const LOGO_SIZE_TIP_WEB_BANNER = '9x2';
const LOGO_SIZE_TIP_WEB_ARTICLE = '17.5x10';
const LOGO_SIZE_TIP_TEACH_GALLERY = '1x1';
const LOGO_SIZE_TIP_TEACH_VIDEO = '331x180';

//培训机构
const LOGO_SIZE_TIP_TRAIN_COMMON = '宽高比：1.541';
const LOGO_SIZE_TIP_MINI_APP_TRAIN_BANNER = LOGO_SIZE_TIP_TRAIN_COMMON;
const LOGO_SIZE_TIP_WEB_TRAIN_BANNER = '宽高比：4.5';
const  LOGO_SIZE_TIP_TRAIN_LOGO = '宽高比：1';
const LOGO_SIZE_TIP_TRAIN_TEACHER = '宽高比：1';


export {
	PRODUCT_TYPE_ADMISSION,
	PRODUCT_TYPE_CULTURE,
	PRODUCT_TYPE_GUIDE,
	COMMENT_STATUS_TITLES,
	COMMENT_STATUS_TITLE_COLORS,
	COMMENT_STATUS_ALL,
	COMMENT_STATUS_NOT_REVIEWED,
	COMMENT_STATUS_REVIEWED,
	COMMENT_STATUS_REVIEWED_FAILURE,
	LOGO_SIZE_TIP_HOME_BANNER,
	LOGO_SIZE_TIP_HOME_BELOW_BANNER,
	LOGO_SIZE_TIP_NOT_TITLE_ARTICLE,
	LOGO_SIZE_TIP_HOME_TITLE_ARTICLE,
	LOGO_SIZE_TIP_CULTURE_BANNER,
	LOGO_SIZE_TIP_TEACH_GALLERY,
	LOGO_SIZE_TIP_TEACH_VIDEO,

	USER_TITLE_MAP,
	ORDER_STATUS_MAP,
	LEVEL_A,
	LEVEL_B,
	LEVEL_ALL,
	STATUS_ALL,
	STATUS_UNPAID,
	STATUS_PAID,
	STATUS_CANCEL,
	PROVINCES,
	CITY,
	FORM_ITEM_WIDTH,
	NATURE,
	SCHOOL_TYPE,
	SCHOOL_LEVEL,
	SCHOOL_ATTR,
	SCHOOL_SUBJECTION,
	FORM_ITEM_LAYOUT,
	SUBMIT_FORM_LAYOUT,
	CULTURE_SCORE_ORDERS,
	CULTURE_SCORE_TEST_RECORDS,
	SCHOOL_LIST,
	ADMISSION_PROFESSION_LIST,
	MODEL_WIDTH,
	ADMISSION_CALC_TEST_ORDER,
	TEACHER_INVITATION_RECORDS,
	USER_LIST,
	USER_TYPE_STUDENT,
	USER_TYPE_TEACHER,
	USER_TYPE_PARENT,
	BANNER_EMPTY,
	BANNER_LOCATION_INDEX,
	BANNER_LOCATION_FLOAT,
	BANNER_LOCATION_CULTURE,
	BANNER_LOCATION_WEB,
	BANNER_LOCATION_TITLE,
	BANNER_ACTION_TYPE_ARTICLE,
	BANNER_ACTION_TYPE_SCENE,
	BANNER_ACTION_TYPE_NOTHING,
	BANNER_ACTION_TYPE_TITLE,
	PAGINATION_INFO,
	DEF_MENU_ITEM,
	API_STATUS_SUCCESS,
	ARTICLE_TYPE_HEADLINE,
	ARTICLE_TYPE_LECTURE,
	ARTICLE_TYPE_NEWS,
	ARTICLE_TYPE_RECOMMEND,
	ARTICLE_TYPE_COURSE,
	ARTICLE_TYPE_SCHOOL,
	ARTICLE_TYPE_TOPIC,
	ARTICLE_TYPE_REGISTRATION_GUIDE_PROFESSIONAL,
	ARTICLE_TYPE_REGISTRATION_GUIDE_TEACHER,
	ARTICLE_TYPE_REGISTRATION_GUIDE_RECRUIT,
	ARTICLE_TYPE_AE_IMAGE_TEXT,
	ARTICLE_TYPE_STUDIO_IMAGE,
	ARTICLE_TYPE_STUDIO_LECTURE,
	ARTICLE_TYPE_STUDIO_TEACHER,
	ARTICLE_TYPE_BANNER,
	MIMI_APP_INDEX_ARTICLE_TYPE,
	WEB_INDEX_ARTICLE_TYPE,
	BANNER_ACTION_TYPE_SCENE_TITLES,

	BANNER_ACTION_TYPE_SCENE_CULTURE,
	BANNER_ACTION_TYPE_SCENE_ADMISSION,
	BANNER_ACTION_TYPE_SCENE_SCHOOL_COMPARE,
	BANNER_ACTION_TYPE_SCENE_GUIDE,
	BANNER_ACTION_TYPE_SCENE_TEACH,
	BANNER_ACTION_TYPE_SCENE_COMPREHENSIVE_SCORE,
	BANNER_ACTION_TYPE_SCENE_QUESTIONS,
	BANNER_ACTION_TYPE_SCENE_STUDIO,
	BANNER_ACTION_TYPE_SCENE_MINE,
	FORMULA_LIST_MODE_RW,
	FORMULA_LIST_MODE_SELECT,
	FORMULA_VIEW_MODE_RW,
	FORMULA_VIEW_MODE_RO,
	COURSE_TYPE_SCIENCE,
	COURSE_TYPE_LIBERAL,
	COURSE_TYPE_ALL,
	SCHOOL_LEVEL_211, SCHOOL_LEVEL_985,
	PROFESSIONAL_DIALOG_MODE_RW, PROFESSIONAL_DIALOG_MODE_RWS,
	PRODUCT_TTILE_MAP,
	PROMOTION_STATUS_OPEN, PROMOTION_STATUS_CLOSE, PROMOTION_STATUS_TITLE_MAP, LOGO_SIZE_TIP_WEB_BANNER, LOGO_SIZE_TIP_WEB_ARTICLE,
	API_STATUS_SUCCESS_2,
	LOGO_SIZE_TIP_MINI_APP_TRAIN_BANNER, LOGO_SIZE_TIP_WEB_TRAIN_BANNER, LOGO_SIZE_TIP_TRAIN_LOGO, LOGO_SIZE_TIP_TRAIN_COMMON, LOGO_SIZE_TIP_TRAIN_TEACHER

}
