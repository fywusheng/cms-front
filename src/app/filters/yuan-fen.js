export function fen2yuan(value) {
    return _.chain(value).toInteger().padStart(3, '0').replace(/\d{2}$/, '.$&').value() - 0 + '';
}

export function yuan2fen(value) {
    // 把输入值元转化成分, 并用四舍五入的方式抵销精度问题
    return Math.round(parseFloat(value) * 100);
}
