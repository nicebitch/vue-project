<template>
    <div class="pagination">
        <el-pagination
            v-if='pageTotal > 0'
            background
            :page-sizes="paginations.pageSizes"
            :page-size="paginations.pageSize"
            :layout="paginations.layout"
            :total="pageTotal"
            :current-page='paginations.pageIndex'
            @current-change='handleCurrentChange'
            @size-change='handleSizeChange'>
        </el-pagination>
    </div>
</template>


<script>
    //页面显示
  export default {
      name:'pagination',
      data(){
          return {
            paginations: {
                pageIndex: 1,  
                pageSize: 20,   
                pageSizes: [5, 10, 15, 20],  
                layout: "total, sizes, prev, pager, next, jumper"   
            },
          }
      },
      props:{
          pageTotal:Number
      },
      created(){

      },
      mounted(){

      },
      methods:{ 
          handleCurrentChange(page){
              this.$emit('handleCurrentChange',page);
          },
          handleSizeChange(page_size){
              this.$emit('handleSizeChange',page_size);
          }
      }
  }
</script>

<style lang="less" scoped>
    .pagination{
        text-align: right;
        padding: 10px 18px;
    }
</style>
