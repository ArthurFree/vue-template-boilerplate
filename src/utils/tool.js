import React from "react"
import ReactDOM from "react-dom"
import Spin from "antd/lib/spin"
import Modal from "antd/lib/modal"
import $ from "jquery"
import * as core from "./core"


const tools = {
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
    emptyInfo: "暂无信息",
    /**
	 * 用于提交到后台的日期时间格式
	 * @type {String}
	 */
    mmDateFormat: "yyyy-MM-dd hh:mm",
    /**
	 * 用于提交到后台的日期时间格式
	 * @type {String}
	 */
    apiDateFormat: "yyyy-MM-dd hh:mm:ss",
    /**
	 * 日期格式
	 * @type {String}
	 */
    dateFormat: "yyyy/MM/dd",
    dateFormat2: "yyyy-MM-dd",
    /**
	 * 时间格式
	 * @type {String}
	 */
    timeFormat: "hh:mm",
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
    * 第三方sdk地址
    * @type {Number}
    */
    sdk: {
        //腾讯直播播放器sdk（api:http://video.qcloud.com/download/docs/QLIVE_Player_Web_SDK_Developer_Guide.pdf）
        volPlayer: "http://qzonestyle.gtimg.cn/open/qcloud/video/live/h5/live_connect.js",
        //腾讯点播播放器sdk（api:http://video.qcloud.com/download/docs/QVOD_Player_Web_SDK_Developer_Guide.pdf）
        vodPlayer: "http://qzonestyle.gtimg.cn/open/qcloud/video/h5/h5connect.js",
        uploader: "http://qzonestyle.gtimg.cn/open/qcloud/js/vod/sdk/uploaderh5.js"
    },
    /**
    * 图表色板
    * @type {Array<String>}
    */
    // chartColor: ["rgb(101,114,196)", "rgb(27,168,244)", "rgb(76,176,80)", "rgb(249,206,46)", "rgb(253,152,37)"],
    chartColor: ["rgb(2, 155, 224)", "rgb(237, 85, 101)", "rgb(255, 176, 59)", "rgb(138, 184, 0)", "rgb(249,206,46)", "rgb(253,152,37)"],
    /**
    * 获取接口调用的绝对路径（php）
    * @type {String}
    */
    urlContent(url) {
        //return "http://emkt.sfaessentials.com/aj" + url;
        return "http://123.56.178.15/aj" + url;
    },
    /**
    * 获取接口调用的绝对路径（java）
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
    //         rsHost = host.replace(/<%=(([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6})>|<%=((?:[0-9]{1,3}\.){3}[0-9]{1,3})>/, "$4") || "10.90.0.15";
    //     }
    //     return `http://${rsHost}:${rsPort}${url}`;
    // },

    // javaAjApi(url) {
    //     return `${window.location.origin}/v1.2/aj${url}`;
    // },

    javaApi(url) {
        return `http://10.90.0.15:19000${url}`;
    },

    /**
    * 获得地址栏最后的随机字符串：_k=xxxx
    * @type {Number}
    */
    getLocationRandom() {
        return location.href.match(/_k=\w+/)[0]
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
    showLoading() {
        if (this.loadingCount <= 0) {
            ReactDOM.render(
                <div className="sy-loadingwrap">
                    <Spin size="large"></Spin>
                </div>,
                document.getElementById("sy-loading")
            );
        }
        this.loadingCount++;
    },
    /**
     * 隐藏loading框
     * @return {[type]}
     */
    hideLoading() {
        if (this.loadingCount === 0) return;
        this.loadingCount--;
        if (this.loadingCount === 0) {
            ReactDOM.unmountComponentAtNode(document.getElementById("sy-loading"));
        }
    },
    /**
     * 删除所有loading框
     * @return {[type]}
     */
    closeLoading() {
        if (this.loadingCount === 0) return;
        this.loadingCount = 1;
        this.hideLoading();
    },
    // 备用
    // showDialog: (function (tools) {
    //     console.log('tools',tools)
    //     // if (this.dialogCount <= 0) {
    //     let mode = {
    //         success: { title: "成功" },
    //         error: { title: "失败" },
    //         info: { title: "信息" },
    //         confirm: { title: "确认" },
    //         window: { title: "" }
    //     };
    //     let returnModal = {};
    //     $.map(mode, function (val, key) {
    //         returnModal[key] = function (content, okCb, cfg) {
    //             let _cfg = $.extend(true, {
    //                 visible: true,
    //                 title: val.title,
    //                 content: content,
    //                 onOk: typeof okCb === "function" ? okCb : $.noop,
    //                 onCancel: $.noop
    //             }, cfg);
    //             Modal[key](_cfg);
    //         };
    //     });
    //     return returnModal;
    //     // }
    //     // this.dialogCount++;
    // } (this)),
    /**
     * 删除所有dialog
     * @return {[type]}
     */
    closeDialog() {
        let selectors = $("body>div");
        $.map(selectors, ele => ReactDOM.unmountComponentAtNode(ele));
        ReactDOM.unmountComponentAtNode($("#sy-window")[0]);
        selectors.remove();
    }

};

$.extend(true, tools, {
    /**
   * antd 组件config
   * @type {Object}
   */
    config: {
		/**
		 * 分页插件config
		 * @type {Object}
		 */
        pagination: {
            size: "small",
            total: 0,
            pageSizeOptions: ['10', '20', '50'],
            pageSize: tools.listPageSize,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: $.noop
        }
    },
    /**
     * 封装ajax：
     *【调用方法】: MainPage.ajax({});
     *【配置参数】：
     * 支持原$.ajax所有config，此外新增：
     * info ：请求信息，用于错误/正确信息提示（格式：[动词]+[操作项]，如：获取文章列表，保存科室信息...）
     * result ：返回值res.data对应数据类型，调用方式：MainPage.ajax.resultEnum.xxx
     *   - array : 数组
     *   - bool ：布尔值
     *   - guid ：guid数字
     *   - object ：原生对象（默认）
     *   - html ：html字符串
     *   - numbric ：数值
     * isShowSuccess ：当操作成功时，是否显示success提示框，默认为false
     */
    ajax: (function () {
        function _ajax(cfg) {
            let _cfg = $.extend(true, {}, {
                // crossDomain: true,
                // xhrFields: {
                //     withCredentials: true
                // },
                url: "",
                dispatch: null,
                actionType: "",
                type: "get",
                dataType: "json",
                contentType: "application/json",
                result: _ajax.resultEnum.object,
                info: "",
                isShowSuccess: false,


                // header: {

                // }

            }, cfg);

            _cfg.beforeSend = function () { _beforeSend.apply(this, $.makeArray(arguments).concat(cfg)); }
            _cfg.success = function () { _onSuccess.apply(this, $.makeArray(arguments).concat(cfg)); };
            _cfg.error = function () { _onError.apply(this, $.makeArray(arguments).concat(cfg)); };
            _cfg.complete = function () { _onComplete.apply(this, $.makeArray(arguments).concat(cfg)); }


            //执行ajax
            return $.ajax(_cfg);

        }

        function _beforeSend(xhr, opt, userOpt) {
            tools.showLoading();
            //处理post data为string
            if (opt.type.toLocaleLowerCase() === "post".toLocaleLowerCase()) {
                opt.data = JSON.stringify(userOpt.data)
            }
            if (typeof userOpt.beforeSend === "function") {
                userOpt.beforeSend.apply(this, $.makeArray(arguments));
            }
            // if(tools.language == 'cn'){
            //      xhr.setRequestHeader('language','en')
            // }
        }

        function _onSuccess(resp, state, xhr, userOpt) {
            let isTriggerSuccess = false;
            let errorMsg = "";
            let opt = this;
            if (resp.code === 10000) {
                //服务器返回成功
                if (opt.result === (_ajax.resultEnum.object && $.isPlainObject(resp.data)) || _ajax.resultEnum.bool) {
                    isTriggerSuccess = true;
                } else if (opt.result === (_ajax.resultEnum.array && resp.data instanceof Array) || _ajax.resultEnum.bool) {
                    isTriggerSuccess = true;
                } else if (opt.result === _ajax.resultEnum.bool /**&& resp.data === true*/) {
                    isTriggerSuccess = true;
                } else if (opt.result === (_ajax.resultEnum.guid && typeof resp.data === "number") || _ajax.resultEnum.bool) {
                    isTriggerSuccess = true;
                } else if (opt.result === (_ajax.resultEnum.html && typeof resp.data === "string") || _ajax.resultEnum.bool) {
                    isTriggerSuccess = true;
                } else if (opt.result === (_ajax.resultEnum.numbric && !isNaN(Number(resp.data))) || _ajax.resultEnum.bool) {
                    isTriggerSuccess = true;
                } else {
                    isTriggerSuccess = false;
                    errorMsg = "返回值data类型异常";
                }
            } else if (resp.code === 10010) {
                //已授权过
                //全局不做任何处理
                isTriggerSuccess = true;
            } else {
                if (resp.code === 10001
                    //|| resp.code === 10002
                    || resp.code === 10004
                    || resp.code === 80001
                    || resp.code === 80002
                    || resp.code === 60002) {
                    //常规错误，无需特殊处理（code对照表：http://10.90.0.49/SYNAPSE_DevGroup/SYNAPSE_BACKEND/wikis/error_intruduce）
                } else if (resp.code === 10002) {
                    //登录失效
                    tools.showDialog.error("请您登录", () => {
                        window.location = "/account/login";
                    })
                } else if (resp.code === 10003) {
                    //未通过审核
                    window.location = "/account/loginError";
                } else if (resp.code === 11001 || resp.code === 11002) {
                    //登陆失败
                    tools.showDialog.error("请您登录", () => {
                        window.location = "/account/login";
                    })
                } else if (resp.code === 11003) {
                    //权限不足
                    tools.showDialog.error("权限不足", () => {
                        window.location = "/account/login";
                    })
                } else {
                    //未记录的code
                    errorMsg = "response code异常";
                }
                isTriggerSuccess = false;
            }
            isTriggerSuccess === true ?
                triggerSuccess.apply(this, $.makeArray(arguments)) :
                triggerError.apply(this, [errorMsg].concat($.makeArray(arguments)));
        }

        function _onError(xhr, state, msg, userOpt) {
            triggerError.call(this, "网络请求失败", null, state, xhr, userOpt);
            if (typeof userOpt.error === "function") {
                userOpt.error.call(this, xhr, state, msg);
            }
        }

        function _onComplete(xhr, state, userOpt) {
            tools.hideLoading();
            if (typeof userOpt.complete === "function") {
                userOpt.complete.call(this, xhr, state);
            }
        }

        function triggerSuccess(resp, state, xhr, userOpt) {
            let opt = this;
            if (opt.isShowSuccess === true) {
                tools.showDialog.success(opt.info + "成功", function () {
                    triggerUserSuccess.call(opt, resp, state, xhr, userOpt);
                });
            } else {
                triggerUserSuccess.apply(opt, $.makeArray(arguments));
            }

            function triggerUserSuccess(resp, state, xhr, userOpt) {
                if (opt.dispatch != null) {
                    opt.dispatch({
                        type: opt.actionType,
                        data: resp.data
                        //opt: userOpt
                    });
                }
                if (typeof userOpt.success === "function") {
                    userOpt.success.call(opt, resp, state, xhr);
                }
            }
        }

        function triggerError(msg, resp, state, xhr) {
            let opt = this;
            msg = msg || (resp == null ? "网络请求失败" : (resp.msg || "无"));
            tools.showDialog.error(opt.info + "失败，信息：" + msg, function () {
                if (opt.dispatch != null) {
                    opt.dispatch({
                        type: ""
                    });
                }
            });
        }
        _ajax.resultEnum = {
            object: 0,
            array: 1,
            bool: 2,
            guid: 3,
            html: 4,
            numbric: 5
        }
        return _ajax;
    }()),
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
        let numToStr = Number(num).toString();
        if (numToStr.length <= sep) return numToStr;
        const surplusLength = numToStr.length % sep;
        let surplus = [numToStr.substring(0, surplusLength)];
        return surplus.concat(numToStr.substring(surplusLength).match(/(\d{3})/g)).join();
    },
    /**
    * 获取当前域下所有cookie，decode并返回
    * return {obj}
    */
    getCookies: () => {
        let cookies = {};
        document.cookie.replace(/([^=;]+)=([^=;]*)/g, (word, $1, $2) => {
            let key = _decodeLoop($1.trim());
            let val = _decodeLoop($2.trim());
            cookies[key] = val;
        });
        return cookies;
        function _decodeLoop(str) {
            let res = decodeURIComponent(str);
            return res === str ? str : _decodeLoop(res);
        }
    },
    /**
    * 获取当前域下所有cookie，decode并返回
    * return {obj}
    */
    setCookie: (key, value, exdays) => {
        var d = new hDate();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie += key + "=" + value + "; " + expires;
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
    showDialog: (function () {
        let mode = {
            success: { title: "成功" },
            error: { title: "失败" },
            info: { title: "信息" },
            confirm: { title: "确认" },
            window: { title: "" }
        };
        let returnModal = {};
        $.map(mode, function (val, key) {
            returnModal[key] = function (content, okCb, cancelCb, cfg) {
                let _cfg = $.extend(true, {
                    visible: true,
                    title: val.title,
                    content: content,
                    onOk() {
                        if (tools.dialogCount >= 0) {
                            tools.dialogCount--;
                        }
                        if (typeof okCb === "function") {
                            okCb.call(this)
                        }
                    },
                    onCancel() {
                        if (tools.dialogCount >= 0) {
                            tools.dialogCount--;
                        }
                        if (typeof cancelCb === "function") {
                            cancelCb.call(this)
                        }
                    },
                }, cfg);
                if (tools.dialogCount <= 0) {
                    Modal[key](_cfg);
                    tools.dialogCount++;
                }
            };
        });
        return returnModal;
    }()),



    /**
    * 获取当前视窗下的query值，返回键值对
    * return {obj}
    */
    getQuery: () => {
        let query = {};
        let href = window.location.href;
        let query_str = href.substring(href.lastIndexOf("?") + 1);
        query_str.replace(/([^=&?]+)=([^=&?]*)/g, (w, $1, $2) => {
            let key = decodeURIComponent($1);
            let val = decodeURIComponent($2);
            query[key] = val;
        });
        return query;
    },

    /**
    * 动态插入sdk
    * return {obj}
    */
    insertSDK: (attr, cb) => {
        if (!attr.name) {
            console.error("[insertSDK] name is required");
            return;
        }
        let parent = document.querySelector("#source_lib");
        let script = parent.querySelector(`[name=${attr.name}]`);
        //避免重复创建同名sdk
        if (script) {
            if (typeof cb === "function") {
                cb.call(this, script);
            }
        } else {
            script = document.createElement("script");
            //attr

            if (attr.name === 'vodPlayer') {
                script.setAttribute('defer', 'defer');
            }
            Object.getOwnPropertyNames(attr).map(name => {
                script.setAttribute(name, attr[name]);//暂时只支持一层object
            });
            parent.appendChild(script).addEventListener("load", () => {
                if (typeof cb === "function") {
                    cb.call(this, script);
                }
            }, false);
        }
    },
    /**
    * 移除指定sdk
    * return {obj}
    */
    removeSDK: (name) => {
        let parent = document.querySelector("#source_lib");
        Array.prototype.slice.call(parent.querySelectorAll(`[name=${name}]`)).map(node => {
            parent.removeChild(node);
        });
    },
    /**
    * 清除所有sdk
    * return {obj}
    */
    clearSDK: () => {
        let parent = document.querySelector("#source_lib");
        parent.innerHTML = "";
    }
})

//调试模式下，公开全局
if (!!tools.debug) {
    window.tools_dev = tools
}

export default tools;
