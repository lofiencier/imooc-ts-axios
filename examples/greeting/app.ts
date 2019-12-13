/*
 * @Author: Envy
 * @Date: 2019-12-04 16:09:15
 * @LastEditors: Envy
 * @LastEditTime: 2019-12-12 17:08:24
 * @Description: Do no edit
 */
import axios,{ AxiosError } from '../../src/index';

axios({
  method:'GET',
  url:'/api/greeting'
});

axios({
  method:'GET',
  url:'/get/params',
  params:{
    data:[1,3,4,5],
    log:true,
    before:{
      a:1,
      b:2
    },
    string:'12312jhohasa'
  }
});

axios({
  method:'POST',
  url:'/base/post',
  headers:{
    'content-type':'application/json;charset=utf-8'
  },
  data:{
    a:3,
    b:4
  }
}).then((res)=>{
  console.log('res :', res);
})

const arr = new Int32Array([21,32]);
axios({
  method:'POST',
  url:'/base/buffer',
  data:arr
}).then(res=>console.log('res :', res))

axios({
  method:'get',
  url:'/error/timeout',
  timeout:2000
}).then(res=>console.log('res :', res)).catch((e:AxiosError)=>{
  console.log('e.message :', e.message);
  console.log('e.code :', e.code);
})

axios.get('/get/params',{ params:{
  data:[1,3,4,5],
    log:true,
    before:{
      a:1,
      b:2
    }
}}).then(res=>console.log('.get :', res));

axios.post('/base/post',{
  a:3,
  b:4
}).then(res=>console.log('.post',res));
