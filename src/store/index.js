import VueX from "vuex";
import Vue from 'vue';
import axios from '@/axios';
import { url } from '@/axios';
// import { resolve } from "core-js/fn/promise";

Vue.use(VueX);

export default new VueX.Store({
    state:{
        msg:"Hello VueX",
        isCollapse:false,
        user:{
            username:"",
            avator:"",
            email:"",
            phone:"",
            gender:"",
        },
        // firstTitle:[],
        // {
        //     // id:"",
        //     // name:"",
        //     // create_time:"",
        //     // update_time:""
        // },
        token:"",    //token在硬盘中存储  vuex在内存条存储
    },
    mutations:{
        removeToken(state){
            state.token = "";
        },
        saveToken(state,token){  //保存token
            state.token = token;
        },
        // changeMsg(state,value){
        //     // state.msg = 20000;
        //     state.msg = value;
        // },
        changeIsCollapse(state){
            state.isCollapse = !state.isCollapse;
        },
        saveUserProfile(state,payload){
            state.user.id = payload.id;
            state.user.avator = payload.avator;
            state.user.email = payload.email;
            state.user.phone = payload.phone;
            if(payload.gender == 1){
                state.user.gender = "男";
            }else{
                state.user.gender = "女";
            }
            
        },
        // saveFirstTitle(state,payload){
        //     // state.firstTitle.username = payload.username;
        //     // state.firstTitle.name = payload.name;
        //     // state.firstTitle.create_time = payload.create_time;
        //     // state.firstTitle.update_time = payload.update_time;
        //     state.firstTitle = payload;
        // }
    },
    actions:{
        getUserProfile({ commit }){  //发请求
            return new Promise((resolve,reject) => {
                axios({
                    url:"api/superprofile",
                    data:``
                }).then(res => {
                    if(!res.data.status){
                        // 成功拿到信息了，接下来存储vuex
                        res.data.avator = `${url}${res.data.avator}`;
                        commit('saveUserProfile',res.data);
                        resolve(res.data);
                    }else{
                        reject(res.data);
                    }
                }).catch(error => {
                    reject(error);
                })
            })
        },
        // getFirstTitle({ commit }){
        //     return new Promise((resolve,reject) => {
        //         axios({
        //             url:"api/classify",
        //         }).then(res => {
        //             if(!this.data.status){
        //                 res.data = `${url}${res.data}`;
        //                 commit('saveFirstTitle',res.data);
        //                 resolve(res.data);
        //                 console.log(res.data)
        //             }else{
        //                 reject(res.data);
        //             }
        //         }).catch(error => {
        //             reject(error);
        //         })
        //     })
        // }

    }
})
// actions 存放异步操作
// mutations 存放同步操作