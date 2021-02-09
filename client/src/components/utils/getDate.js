const date = new Date()
const year = date.getFullYear()
const month = date.getMonth()
const day = date.getDate()
let m = month + 1
let d = day
if (m < 10){
    m = "0" + m
}
if (d < 10){
     d = "0" + d
}
export const currentDate = year+"-"+m+"-"+d