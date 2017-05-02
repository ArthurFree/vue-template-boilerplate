/*
import React from "react"
import ReactDOM from "react-dom"
import Spin from "antd/lib/spin"
import Modal from "antd/lib/modal"
import $ from "jquery"

*/
import * as core from './core';

const tools = {
    /**
    * 国际化语言设置
    * @type {bool}
    */
    language: 'zh',
    /**
    * debug模式，生产环境请关闭（false）
    * @type {bool}
    */
    debug: true,
    /**
	 * 空信息
	 * @type {String}
	 */
    emptyInfo: '暂无信息',
    /**
	 * 日期格式
	 * @type {String}
	 */
    dateFormat: 'yyyy-MM-dd',
    /**
	 * 时间格式
	 * @type {String}
	 */
    timeFormat: 'hh:mm',
    /**
	 * 列表页每页显示条数
	 * @type {Number}
	 */
    listPageSize: 20,
    /**
	 * 详情、弹框每页显示条数
	 * @type {Number}
	 */
    detailPageSize: 5,
    /**
    * 当前loading数
    * @type {Number
    */
    loadingCount: 0,
    /**
    * 当前摸态框数
    * @type {Number
    */
    dialogCount: 0,
    /**
    * 图表色板
    * @type {Array<String>}
    */
    chartColor: ['rgb(2, 155, 224)', 'rgb(237, 85, 101)', 'rgb(255, 176, 59)', 'rgb(138, 184, 0)', 'rgb(249,206,46)', 'rgb(253,152,37)'],
    /**
    * 获取接口调用的绝对路径
    * @type {String}
    */
    // javaApi(url, port = "<%=80>", host = "<%=10.90.0.15>") {
    //     let rsPort = port;
    //     let rsHost = host;
    //     if (isNaN(Number(port))) {
    //         //模板
    //         rsPort = port.replace(/<%=(\d+)>/, "$1") || "19000";
    //     }
    //     if (host) {
    //         rsHost = host.replace(/<%=(([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)
    //                 +[a-zA-Z]{2,6})>|<%=((?:[0-9]{1,3}\.){3}[0-9]{1,3})>/, "$4")
    //                 || "10.90.0.15";
    //     }
    //     return `http://${rsHost}:${rsPort}${url}`;
    // },

    // javaAjApi(url) {
    //     return `${window.location.origin}/v1.2/aj${url}`;
    // },

    javaApi(url) {
        return url;
    },

    /**
    * 获得地址栏最后的随机字符串：_k=xxxx
    * @type {Number}
    */
    getLocationRandom() {
        return location.href.match(/_k=\w+/)[0];
    },

    /**
    * 获得一个任意长度的随机字符串
    * @type {Number}
    */
    getRandom(count) {
        return core.getRandom(count);
    },

    /**
     * 显示loading框
     * @return {[type]}
     */
    showLoading() {},
    /**
     * 隐藏loading框
     * @return {[type]}
     */
    hideLoading() {},
    /**
     * 删除所有loading框
     * @return {[type]}
     */
    closeLoading() {},
    /**
     * 删除所有dialog
     * @return {[type]}
     */
    closeDialog() {},
    /**
    * 返回数值类型按千分符分割后结果
    * return {obj}
    */
    getToThousands(num) {
        if (isNaN(Number(num))) {
            console.error(`num ${num} is not a number`);
            return;
        }
        const sep = 3;
        const numToStr = Number(num).toString();
        /* eslint consistent-return: "off" */
        if (numToStr.length <= sep) return numToStr;
        const surplusLength = numToStr.length % sep;
        const surplus = [numToStr.substring(0, surplusLength)];
        return surplus.concat(numToStr.substring(surplusLength).match(/(\d{3})/g)).join();
    },
    /**
    * 获取当前域下所有cookie，decode并返回
    * return {obj}
    */
    getCookies: () => {
        /* eslint no-underscore-dangle: "off" */
        function _decodeLoop(str) {
            const res = decodeURIComponent(str);
            return res === str ? str : _decodeLoop(res);
        }
        const cookies = {};
        document.cookie.replace(/([^=;]+)=([^=;]*)/g, (word, $1, $2) => {
            const key = _decodeLoop($1.trim());
            const val = _decodeLoop($2.trim());
            cookies[key] = val;
        });
        return cookies;
    },
    /**
    * 获取当前域下所有cookie，decode并返回
    * return {obj}
    */
    setCookie: (key, value, exdays) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = `expires=${d.toUTCString()}`;
        document.cookie += `${key}=${value}; ${expires}`;
    },


    /**
     * 显示提示框
     * 调用方式component.showDialog.xxx(content,okCb,cfg);
     * @param {ReactDOM，String} [content] [弹出内容]
     * @param {Function} [okCb] [点击确定是回调函数]
     * @param {Object} [cfg] [Modal配置项]
     *
     * Dialog类型：
     * success:成功
     * error:失败
     * info:提示信息
     * confirm:确认
     */
    showDialog: () => {},
    /**
    * 获取当前视窗下的query值，返回键值对
    * return {obj}
    */
    getQuery: () => {
        const query = {};
        const href = window.location.href;
        const queryStr = href.substring(href.lastIndexOf('?') + 1);
        queryStr.replace(/([^=&?]+)=([^=&?]*)/g, (w, $1, $2) => {
            const key = decodeURIComponent($1);
            const val = decodeURIComponent($2);
            query[key] = val;
        });
        return query;
    },
};

// 调试模式下，公开全局
if (tools.debug) {
    window.tools_dev = tools;
}

export default tools;
