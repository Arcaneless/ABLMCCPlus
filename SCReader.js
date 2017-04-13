const month = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
const fs = require('fs')

function read(file) {
  const allLines = file.split(/\r\n|\n/)
  var sum = []
  allLines.map((line, i) => {
    line = line.trim()
    if(line != '') {
      var n = readLine(line)
    }
    sum.push.apply(sum, n);
  })
  return sum
}

function readLine(line) {
  var isCaleneder = false
  const component = line.split(' ')
  if(component[0][1] == '月' || component[0][2] == '月') currentMonth = component[0], isCaleneder = true
  if(!isNaN(component[0][0])) {
    isCaleneder = true
    if(Number(component[0]) > 32) isCaleneder = false
  }
  let len = component.length
  let arr = []
  let j = 0
  component.map((word, i) => {
    if(len != i+1 && isCaleneder) {
      if(isNaN(component[i+1][0]) && !isNaN(word[0])) {
        var h = i+1, event = [], p = component[h]
        while(p!=undefined && ((h+1 == len) || isNaN(p[0]) || (!isNaN(p[0])&&!isNaN(component[h+1][0])))) {
          event.push(p)
          h++
          p = component[h]
        }
        arr[j] = {
          date: dateTransform(word),
          event: event.join(' ')
        }
        j++
      }
    }
  })
  return arr
}

function dateMapping(p) {
  return p.length==1 ? '0'+p : p
}

function initMap(t) {
  let nT = ''
  if(t.split('/').length>1) nT = t.split('/').map(dateMapping).reverse().join('-')
  else nT = [month.indexOf(currentMonth)+1+'', t].map(dateMapping).join('-')
  return nT
}

function dateTransform(date) {
  let t1 = []
  if(date.split('-').length>1) {
    t1 = date.split('-')
    t1 = t1.map(initMap)
  }
  else if(date.split(',').length>1) t1 = date.split(',')
  else t1[0] = date
  // / process
  t1 = t1.map(t => {

  })
  return t1
}

export default class SCReader {
  constructor() {
    this.already = undefined
  }
  getEvents() {
    return new Promise((resolve, err) => {
      if(this.already != undefined) resolve(this.already)
      fs.readFile('sc.txt', 'utf8', (err2, data) => {
        if (err2) err(err2)
        console.log('Read OK: ' + filename)
        this.already = read(data.toString())
        resolve(this.already)
      })
    })
  }
}
