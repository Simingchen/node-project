// import Vue from 'vue'
// import VueResource from 'vue-resource';
// import apiList from "../apiList.js"  //api列表

// Vue.use(VueResource);
// var oVue = new Vue();
// export default {
//     getHotList (commit) {
//         var url = apiList.data.GdsHots;
//         oVue.$http.post(url,{
//             url:path
//         }).then(function(data){ 
//             var oData = data.body;
//             if(oData){    
//                 // actions上配合commit到mutations  
//                 commit("saveHotList", oData);
//             }
//         },function(response){
//             console.info(response);
//         });
//     }
// }