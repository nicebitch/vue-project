
<template>
  <div class="logContainer">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>项目介绍：</span>
      </div>
      <div class="logArea el-scrollbar">
            <div class="item" v-for="(item,index) in logsData" :key="index">
              <div class="logContent">
                  <p class="title">内容：</p>
                  <ul class="logUl">
                    <li v-for="(citem,cindex) in item.data" :key="cindex">{{citem}}</li>
                </ul>
              </div>
          </div>
      </div>
   
  </el-card>
  </div>
</template>

<script>
  import logsData from "@/assets/datas/logs.json";


  export default {
    name:'logList',
    data() {
      return {
        logsData:logsData.data,
      };
    }
  }
</script>

<style lang="less" scoped>
.logContainer{
    padding: 10px;
    background: #fff;
    box-sizing: border-box;
    height:370px;
    max-height: 370px;
    overflow: hidden;
    border-radius: 6px;
    .logArea{
       overflow: auto;
       height: 100%;
    }
    .item{
       .title{
         font-size: 13px;
       }
       .time{
         color:#87DE75;
       }
        .logContent{
          .logUl{
            padding-left: 30px;
            li{
              font-size: 12px;
              list-style: disc;
              line-height: 20px;
            }
          }
      }
    }
}
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

