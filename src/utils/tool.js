/* eslint-disable */
import axios from 'axios';

const tools = {
    /**
     * 接口基本地址
    */
    baseURL: 'https://cnodejs.org/api/v1',
    /**
     * 使用axios封装ajax
     * 【调用方法】：tools.ajax({})
     * 【配置参数】：
     *      - url: 接口访问具体地址
     *      - method: 接口请求类型(get/post)
     *      - params: 接口所需的参数
     *      - commit: vuex中的commit函数
     *      - mutationType: vuex中的mutation标识符
     *      - info: 请求信息，用于错误/正确信息提示（格式：[动词]+[操作项], 如，获取文章列表）
     *      - isShowSuccess: 操作成功时，是否显示success提示框，默认为false
    */
    ajax: (function () {
        function _axios(cfg) {

            const _cfg = Object.assign({}, {
                // axios basic API
                url: '',
                method: 'get',
                baseURL: this.baseURL,
                parmas: null,
                responseType: 'json',
                // user defined API
                commit: null,
                mutationType: '',
                result: _axios.resultEnum.object,
                info: '',
                isShowSuccess: false,
            }, cfg);
            const axiosInstance = axios.create(_cfg);

            function triggerSuccess(response) {
                const config = response.config;
                const data = response.data;
                if (config.commit !== null && typeof config.commit == 'function') {
                    console.log('--- exec commit ---');
                    config.commit(config.mutationType, data);
                }

                if (config.isShowSuccess === true) {
                    console.log(`${config.info}成功`);
                }
            }

            function triggerError(msg, response) {
                console.log('--- triggerError ---', response);
                msg = msg || (response.data === null ? '网络请求错误' : (response.data.msg) || '无' );
                console.log(`${response.config.info}失败，信息：${msg}`);
                if (response.config.commit !== null && response.config.commit == 'function') {
                    response.config.commit('');
                }
            }

            function _onSuccess(response) {
                const config = response.config;
                const isSuccess = response.data.success;
                const errMsg = '';
                let isTriggerSuccess = false;

                isSuccess === true ? triggerSuccess(response)
                                  : triggerError(response.data.error_msg, response);

            }

            function _onError(error) {
                triggerError('网络请求失败', error.response);
            }

            // 请求执行之前
            axiosInstance.interceptors.request.use((config) => {
                console.log('---- 请求前 ---');
                return config;
            }, (error) => {
                console.log('--- 请求前发生error ---');
                _onError(error);
                return Promise.reject(error);
            });

            // 收到响应时先执行
            axiosInstance.interceptors.response.use((response) => {
                console.log('--- 成功收到请求后 ----');
                _onSuccess(response);
                return response;
            }, (error) => {
                console.log('--- 未收到响应 发生error ---');
                _onError(error);
                return Promise.reject(error);
            });

            return axiosInstance.request(_cfg);
        }

        // define response type
        _axios.resultEnum = {
            object: 0,
            array: 1,
            bool: 2,
            guid: 3,
            html: 4,
            number: 5,
        };

        return _axios;
    }()),
    /**
     *
     */
    fetch: function (cfg) {
        const axiosInstance = axios.create({
            url: '',
            method: 'get',
            baseURL: this.baseURL,
            params: null,
            responseType: 'json'
        });

        function triggerSuccess(response) {
            // tools.hideLoading()
            if (cfg.isShowSuccess === true) {
                // show dialog
            }

            if (cfg.dispatch !== null) {
                cfg.dispatch({
                    type: cfg.actionType,
                    data: response.data
                });
            }
        }

        function triggerError(msg, response) {
            msg =  msg || (response.data === null ? '网络请求错误' : (response.data.msg) || '无');
            if (config.dispatch !== null && response.config.dispatch == 'function') {
                config.dispatch({
                    type: '',
                });
            }
        }

        function _onSuccess(response) {
            const config = reponse.config;
            const isSuccess = response.data.success;
            const errMsg = '';
            let isTriggerSuccess = false;

            if (response.data.code === 10000) {
                // 服务器返回成功
                isTriggerSuccess = true;
            } else if (response.code === 10010) {
                // 已授权过
                // 全局不做任何处理
                isTriggerSuccess = true;
            } else {
                if (response.code === 10001
                    || response.code === 10004
                    || response.code === 80001
                    || response.code === 80002
                    || response.code === 60002
                ) {
                    // 常规错误无需处理
                } else if (response.code === 10002) {
                    // 登录失效
                    // dialog 请您登陆
                } else if (response.code === 10003) {
                    // 未通过审核
                } else if (response.code === 11001 || response.code === 11002) {
                    // 登陆失败
                } else if (response.code === 11003) {
                    // 权限不足
                } else if (response.code === 12001) {
                    // 功能开关改变
                } else {
                    // 未记录的code
                }

                isTriggerSuccess = false;
            }

            isTriggerSuccess ? triggerSuccess(response) : triggerError(response.data.error_msg, response);
        }

        function _onError(error) {
            triggerError('网络请求失败', error.response);
        }

        axiosInstance.interceptors.request.use((config) => {
            console.log('--- 请求前 ----');
            return config;
        }, (error) => {
            _onError(err);
            return Promise.reject(error);
        });

        axiosInstance.interceptors.response.use((response) => {
            console.log('--- 成功收到请求后 -----');
            _onSuccess(response);
            return reponse;
        }, (error) => {
            _onError(error);
            return Promise.reject(error);
        });

        return axiosInstance.request(cfg);
    }
};

export default tools;
