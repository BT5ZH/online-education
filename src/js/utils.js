export const timeConvert = ((s) => {
    let day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整 
    let hour = Math.floor((s - day * 24 * 3600) / 3600);
    let minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
    let second = Math.floor(s - day * 24 * 3600 - hour * 3600 - minute * 60);
    let result = "";
    if (day > 0) {
        result = day + "天" + hour + "时" + minute + "分" + second + "秒";
    } else if (day == 0 && hour > 0) {
        result = hour + "时" + minute + "分" + second + "秒";
    } else if (day == 0 && hour == 0 && minute > 0) {
        result = minute + "分" + second + "秒";
    } else if (day == 0 && hour == 0 && minute == 0 && second > 0) {
        result = second + "秒";
    }
    return result
});

export const timeStampConvert = ((t)=>{
    const d1 = new Date(t);
    const d2 = d1.toLocaleDateString().replace(/\//g, "-") + " " + d1.toTimeString().substr(0, 8); 
    return d2;
});
