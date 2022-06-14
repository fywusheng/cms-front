// 对象转query
export function toQuery(obj){
    return _
        .chain(obj)
        .mapValues(n => encodeURIComponent(n))
        .toPairs()
        .map(n => n.join('='))
        .join('&')
        .value()
}

// query转对象
export function toObject(str){
    return _
        .chain(str)
        .split('&')
        .map(n => n.split('='))
        .fromPairs()
        .mapValues(n => decodeURIComponent(n))
        .value()
}

// 缺省是当前的query对象
export default toObject(location.search.substr(1))