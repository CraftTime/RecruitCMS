export function getFormatDate(millisecond) {

	let date = new Date(millisecond);  //当前标准时间格式
	let year = date.getFullYear(); //取得四位数的年份
	let month = date.getMonth() + 1; //返回0~11之间的数字，0代表一月，11代表12月
	let day = date.getDate(); //返回天数，0~31，getDay()返回的是星期几（0~6）
	let hour = date.getHours(); //获取小时
	let minute = date.getMinutes(); //获取分钟
	let second = date.getSeconds(); //获取秒

	let monthStr =  month < 10 ? '0' + month : month;
	let dayStr =  day < 10 ? '0' + day : day;
	let hourStr = hour < 10 ? '0' + hour : hour;
	let minuteStr = minute < 10 ? '0' + minute : minute;
	let secondStr = second < 10 ? '0' + second : second;
	let result = year + '-' + monthStr + '-' + dayStr + ' ' + hourStr + ':' + minuteStr + ':' + secondStr;
	return result;
}

export function getFormatCNDate(millisecond) {

	let date = new Date(millisecond);  //当前标准时间格式
	let year = date.getFullYear(); //取得四位数的年份
	let month = date.getMonth() + 1; //返回0~11之间的数字，0代表一月，11代表12月
	let day = date.getDate(); //返回天数，0~31，getDay()返回的是星期几（0~6）
	let hour = date.getHours(); //获取小时
	let minute = date.getMinutes(); //获取分钟
	let second = date.getSeconds(); //获取秒

	let monthStr =  month < 10 ? '0' + month : month;
	let dayStr =  day < 10 ? '0' + day : day;
	let hourStr = hour < 10 ? '0' + hour : hour;
	let minuteStr = minute < 10 ? '0' + minute : minute;
	let secondStr = second < 10 ? '0' + second : second;
	let result = year + '年' + monthStr + '月' + dayStr + '日 ' + hourStr + ':' + minuteStr + ':' + secondStr;
	return result;
}

export function getFormatOnlyDate(millisecond) {

	let date = new Date(millisecond);  //当前标准时间格式
	let year = date.getFullYear(); //取得四位数的年份
	let month = date.getMonth() + 1; //返回0~11之间的数字，0代表一月，11代表12月
	let day = date.getDate(); //返回天数，0~31，getDay()返回的是星期几（0~6）
	let result = year + '-' + month + '-' + day;
	return result;
}

export function getFormatOnlyTime(millisecond) {

	let date = new Date(millisecond);  //当前标准时间格式
	let hour = date.getHours(); //获取小时
	let minute = date.getMinutes(); //获取分钟
	let second = date.getSeconds(); //获取秒
	let result = hour + ':' + minute + ':' + second;
	return result;
}
