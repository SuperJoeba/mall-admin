// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18

declare global {
  interface Date {
    Format: (fmt:any) => any
  }
}

Date.prototype.Format = function(fmt) {
  let o:any = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}

export function formatTimeToStr(times:any, pattern:string) {
  let d = new Date(times).Format('yyyy-MM-dd hh:mm:ss')
  if (pattern) {
    d = new Date(times).Format(pattern)
  }
  return d.toLocaleString()
}
/**
 * @param {*} duration 将时长转换未
 */
export function durationToStr(duration: any) {
  if (duration < 60) {
    return duration + '秒'
  } else if (duration >= 60 && duration < 60 * 60) {
    const minus = Math.floor(duration / 60)
    return minus + '分' + duration % 60 + '秒'
  } else if (duration >= 60 * 60 && duration < 24 * 60 * 60) {
    const hours = Math.floor(duration / 3600)
    const minus = Math.floor((duration - hours * 3600) / 60)
    const seconds = duration - hours * 3600 - minus * 60
    return hours + '小时' + minus + '分' + seconds + '秒'
  } else if (duration > 24 * 60 * 60) {
    const days = Math.floor(duration / (3600 * 24))
    const hours = Math.floor((duration - days * 3600 * 24) / 3600)
    const minus = Math.floor((duration - days * 3600 * 24 - hours * 3600) / 60)
    const seconds = duration - days * 3600 * 24 - hours * 3600 - minus * 60
    return days + '天' + hours + '小时' + minus + '分' + seconds + '秒'
  } else {
    return duration + '秒'
  }
}
