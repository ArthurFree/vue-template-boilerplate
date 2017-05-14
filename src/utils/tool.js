/* eslint-disable */
import axios from 'axios';

const tools = {
    baseURL: 'https://cnodejs.org/api/v1',
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
};

export default tools;
