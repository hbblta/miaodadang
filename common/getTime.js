export default function getTime(e){
    var date = new Date(e)
    var year = date.getFullYear() + '/' + addzero((date.getMonth() + 1)) + '/' + addzero(date.getDate()) + " " + addzero(date.getHours()) + ":" + addzero(date.getMinutes()) + ":" + addzero(date.getSeconds())
    return year
}

function addzero(str) {
    if (str < 10) {
      return "0" + str
    } else {
      return str
    }
  }