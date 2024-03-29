var timeFormatUtils = {
  getShortDate: function () {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  },
  addDays: function (timestamp, days) {
    return timestamp + days * 24 * 60 * 60 * 1000;
  },
  addHours: function (timestamp, hours) {
    return timestamp + hours * 60 * 60 * 1000;
  },
  addMinutes: function (timestamp, minutes) {
    return timestamp + minutes * 60 * 1000;
  },
  // yyyy-MM-dd hh:mm
  getDateFormat: function (timestamp, fmt) {
    let date = new Date(timestamp);
    var o = {
      "Y+": date.getFullYear(), //年份
      "M+": date.getMonth() + 1, //月份 
      "d+": date.getDate(), //日 
      "h+": date.getHours(), //小时 
      "m+": date.getMinutes(), //分 
      "s+": date.getSeconds(), //秒 
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
  // 年月日转化年时间戳
  dateToTimestamp:function(dateStr) {
   if (!dateStr) {
       return ''
   }
   let newDataStr = dateStr.replace(/\.|\-/g, '/')
   let date = new Date(newDataStr);
   let timestamp = date.getTime();
   return timestamp
 }
};

module.exports = timeFormatUtils;