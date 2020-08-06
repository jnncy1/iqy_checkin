/*
 * @Author: chengquan
 * @Date: 2020-08-05 15:28:57
 * @LastEditTime: 2020-08-06 11:03:32
 * @Description: 爱奇艺每日签到和会员抽奖
 * @FilePath: \iqy_checkin\iqiyi.js
 */
const axios = require('axios');
/**
 * 这里的cookie需要在app端 个人中心处抓包 在url里搜auth-cookie
 * 不是请求头里的cookie
 * 例子：e6Um38snn9zAGBdrEkMgqWLsm3RO97pfAhwJi84ypALsm3qM0JfHGlvXm3le5***********
 */
const { cookies } = require('./config.json');

exports.main_handler = () => {
  sign();
}

function sign() {
  cookies.forEach(cookie => {
    const headers = { Cookie: cookie };
    getPlatform(cookie)
      .then(res => {
        const platform = /platform:\"(.*?)\"/.exec(res.data);
        if (!platform) { return; }
        const url = `https://tc.vip.iqiyi.com/taskCenter/task/userSign?P00001=${cookie}&platform=${platform[1]}&lang=zh_CN&app_lm=cn&deviceID=pcw-pc&version=v2`;
        return axios.get(url, { headers }).then(res => { console.log(res.data) });
      }).then(_ => {
        lottery(cookie);
      })
  })
}

function getPlatform(cookie) {
  const url = 'https://static.iqiyi.com/js/qiyiV2/20200212173428/common/common.js';
  return axios.get(url, { headers: { Cookie: cookie } });
}

function lottery(cookie) {
  const url = `https://cards.iqiyi.com/views_category/3.0/vip_home?secure_p=iPhone&scrn_scale=0&dev_os=0&ouid=0&layout_v=6&psp_cki=${cookie}&page_st=suggest&app_k=8e48946f144759d86a50075555fd5862&dev_ua=iPhone8%2C2&net_sts=1&cupid_uid=0&xas=1&init_type=6&app_v=11.4.5&idfa=0&app_t=0&platform_id=0&layout_name=0&req_sn=0&api_v=0&psp_status=0&psp_uid=451953037415627&qyid=0&secure_v=0&req_times=0`;
  const headers = {
    'sign': '7fd8aadd90f4cfc99a858a4b087bcc3a',
    't': '479112291'
  };
  axios.get(url, { headers })
    .then(res => {
      let data;
      try {
        data = JSON.stringify(res.data);
      } catch (error) {
      }
      if (data.match(/\"text\":\"\d.+?到期\"/)) {
        const end = data.match(/\"text\":\"(\d.+?到期)\"/)[1];
        console.log(end);
      }
      const promises = new Array(3).fill('').map(() => {
        return axios.get(`https://iface2.iqiyi.com/aggregate/3.0/lottery_activity?app_k=0&app_v=0&platform_id=0&dev_os=0&dev_ua=0&net_sts=0&qyid=0&psp_uid=0&psp_cki=${cookie}&psp_status=0&secure_p=0&secure_v=0&req_sn=0`);
      });
      Promise.all(promises).then((res) => {
        res.forEach((r) => {
          console.log(r.data.awardName || r.data.kv);
        });
      });
    })
}
