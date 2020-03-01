<template>
    <div :id="id" class="orderArea"></div>
</template>

<script>
    import echarts from 'echarts'
    import echartsTheme from "cps/echarts/theme/westeros.json";
    
    export default {
        name:'radarChart',
        data(){
            return {
                 id:"radarChart",
                 myChart:null,
            }
        },
        mounted(){
            this.loadChart();
        },
        beforeDestroy() {
			if (!this.myChart) {
				return
			}
			this.myChart.dispose();
			this.myChart = null;
        },
        methods: {
            loadChart(){
                this.$nextTick(() => {
                    this.myChart = echarts.init(document.getElementById(this.id));
                    this.myChart.setOption(this.initOption());
                })
            },
         	initOption(){
               let option = {
                    radar: [{
                    name: {
                        fontSize: 11 
                    },
                    splitLine: {
                        lineStyle: {
                          color: '#00aaff'
                        }
                    },
                    axisLabel: {
                        inside: true
                    },
                    axisLine: {
                        lineStyle: {
                          color: '#00aaff' 
                        }
                    },
                    splitArea: {
                        areaStyle: {
                        }
                    },
                    indicator: [
                        {text: '东北区域', max: 100, color: '#87DE75'}, 
                        {text: '华南区域', max: 100,color: '#FFA3A1'},
                        {text: '华中区域', max: 100,color: '#FF9900'},
                        {text: '华北区域', max: 100,color: '#5FB4FA'},
                        {text: '西北区域', max: 100,color: '#a9d86e'},
                        {text: '西南区域', max: 100,color: '#FF6C60'},
                        {text: '东北区域', max: 100,color: '#18a689'},
                        {text: '港澳台', max: 100,color: '#3b5999'}
                    ]
                    }],
                    series: [{
                    type: 'radar',
                    data: [{
                        value: [60, 73, 85, 40, 50, 100],
                        areaStyle: {
                        normal: {
                            opacity: 0.8, 
                            color: '#87DE75' 
                        }
                        },
                        lineStyle: {
                        color: '#6397ff' 
                        },
                        label: {
                        normal: {
                            show: true,
                            color: '#6397ff', 
                            fontSize: 16,  
                            formatter: function (params) {
                              return params.value
                            }
                        }
                        }
                    }]
                    }]
                }
				return option;
			},
        },
        watch: {
        }
    }
</script>

<style lang="less">

</style>
