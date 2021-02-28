module.exports.formatDateString = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let d = date.getDate();
    if(month < 10){
        month = '0' + month;
    }
    if(d < 10){
        d = '0' + d;
    }
    return [year, month, d].join('-');
}