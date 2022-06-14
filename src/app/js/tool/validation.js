/**
 * 表单验证组件校验规则
 */
export default {
    isNotEmpty(value) {
        return value;
    },

    minLength(value, length) {
        return value.length < length;
    },

    maxLength(value, length) {
        return value.length > length;
    },

    /**
     * 手机号码验证
     * 验证规则：
     * @param  {String}  value    待验证的值
     * @param  {String}  errorMsg 错误信息
     * @return {String}           错误信息
     */
    isMobile(value) {
        // 此正则未必囊括所有的手机号码格式
        return /^[0-9]?\d{11}$/.test(value);
    },

    isEmail(value) {
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
    },

    password(value) {
        return /[A-Za-z0-9]{6,12}/.test(value);
    }
}
