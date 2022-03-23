export function randomNum(minNum,maxNum){
  switch(arguments.length){
    case 1:
      return parseInt(Math.random()*minNum+1,10);
      break;
    case 2:
      return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
      break;
    default:
      return 0;
      break;
  }
}

/**
 * 格式化日期
 * @param time    Date/String/Number
 * @param format 'yyyy-MM-dd hh:mm:ss'  'yyyy-MM-dd'
 * @returns {*}
 */
export function formatDate(time, format) {
  time = new Date(time)
  const o = {
    "M+": time.getMonth() + 1,                   //月份
    "d+": time.getDate(),                        //日
    "h+": time.getHours(),                       //小时
    "m+": time.getMinutes(),                     //分
    "s+": time.getSeconds(),                     //秒
    "q+": Math.floor((time.getMonth() + 3) / 3), //季度
    "S": time.getMilliseconds()                  //毫秒
  };
  if (/(y+)/.test(format))
    format = format.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (const k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return format;
}
