<template>
  <div class="recordEntrust" id="recordEntrust">
    <div class="bk-title">
      <el-tabs  v-model="form.status" @tab-click="handleTabClick">
        <el-tab-pane :label='$t("message.om.OpenOrder")' name="1"></el-tab-pane>
        <el-tab-pane :label='$t("message.om.OrderHistory")' name="2"></el-tab-pane>
        <el-tab-pane :label='$t("message.om.TransactionStatement")' name="3"></el-tab-pane>
      </el-tabs>
      <div class='all-records' @click="allRecordsClick">所有记录</div>
    </div>
    <div class="rt-view">

      <!--当前委托-->
      <div :style="{display:form.status==1?'block':'none'}" class='content-table'>
      <!-- <ul class='table_header'>
        <li v-for="item in openOrderNames">{{item}}</li>
      </ul>
      <ul class='table_body'>
         <li v-for="item in openOrderNames">{{item}}</li>
      </ul> -->

        <el-table :data="nowListData"  :fit="tableFit" highlight-current-row border   style="width: 100%;"
          :row-class-name="tableRowClass" :cell-class-name="cellClass"
        >
          <el-table-column prop="consign_time" :label="$t('message.om.OrderDate')" min-width="120" align="left" 
              :formatter="tableTimeFormatter">
          </el-table-column>
          <el-table-column prop="" :label="$t('message.om.Paris')"  min-width="80" align="left"  
                           :formatter="tableParisFormatter">
          </el-table-column>
          <el-table-column prop="trans_direction" :label="$t('message.om.Type')"  min-width="60"  align="left" 
                           :formatter="transDirectionFormatter">
          </el-table-column>

          <el-table-column prop="consign_price" :label="$t('message.om.ooPrice')"  min-width="80" align="left" 
                           :formatter="consignPriceFormatter">
                            
          </el-table-column>
          <el-table-column prop="consign_number" :label="$t('message.om.ooAmount')"  min-width="80" align="left" 
                           :formatter="consignNumberFormatter">
          </el-table-column>
          <el-table-column prop="consign_turnover" :label="$t('message.om.ooTotal')"  min-width="80" align="left" 
                           :formatter="consignTurnoverFormatter">
          </el-table-column>
          <el-table-column prop="trans_number" :label="$t('message.om.Executed')"  min-width="80" align="left" 
                           :formatter="executedFormatter">
          </el-table-column>
          <el-table-column prop="" :label="$t('message.om.Unexecuted')"  min-width="80" align="left" 
                           :formatter="unexecutedFormatter">
          </el-table-column>
          <el-table-column prop="" :label="$t('message.om.Action')"  min-width="80" align="center" >
            <template  slot-scope="scope"> 
              <el-button plain class='consign_records_btn' @click="cancelClick(scope.$index, scope.row)">
                {{$t("message.om.Cancel")}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <!--暂无记录-->
        <div class="el-table__empty-block" style="width: 100%;" v-if="nowListData.length==0">
          <span class="el-table__empty-text"> {{$t("message.om.NoRecord")}}</span>
        </div>
        
      </div>
      <!--历史委托-->
      <div :style="{display:form.status==2?'block':'none'}">

        <el-table :data="historyListData"  :fit="tableFit" highlight-current-row border   style="width: 100%;"
          :row-class-name="tableRowClass" :cell-class-name="cellClass" 
          :row-key="getRowKeys"
          :expand-row-keys="expands"
        >
          <!--历史记录详情-->
          <el-table-column type="expand" width="1" class="table-expand">
            <template slot-scope="props">
              <div class="inTableClass">
                <div class="inTableTitle">
                  <ul>
                    <li>{{$t("message.om.TradedDate")}}</li>
                    <li>{{$t("message.om.Price")}}</li>
                    <li>{{$t("message.om.Amount")}}</li>
                    <li>{{$t("message.om.Total")}}</li>
                    <li>{{$t("message.om.Fee")}}</li>
                  </ul>
                </div>
                <div class="inTableContent"  >
                  <div class="inTableRow" v-for="item in consignDetailData">
                    <span>{{item.finish_time_}}</span>
                    <span>{{item.trans_price}}</span>
                    <span>{{item.trans_number}}</span>
                    <span>{{item.trans_turnover}}</span>
                    <span style="text-align:right">{{item.rival_fee}}</span>
                  </div> 
                </div>
              </div>
            </template>
          </el-table-column>


          <el-table-column prop="consign_time" :label="$t('message.om.OrderDate')" min-width="120" align="left" 
              :formatter="tableTimeFormatter">
          </el-table-column>
          <el-table-column prop="" :label="$t('message.om.Paris')"  min-width="80" align="left"  
                           :formatter="tableParisFormatter">
          </el-table-column>
          <el-table-column prop="trans_direction" :label="$t('message.om.Type')"  min-width="60"  align="left" 
                           :formatter="transDirectionFormatter">
          </el-table-column>

          <el-table-column prop="consign_price" :label="$t('message.om.ooPrice')"  min-width="80" align="left" 
                           :formatter="consignPriceFormatter">
                            
          </el-table-column>
          <el-table-column prop="consign_number" :label="$t('message.om.ooAmount')"  min-width="80" align="left" 
                           :formatter="consignNumberFormatter">
          </el-table-column>
          <el-table-column prop="consign_turnover" :label="$t('message.om.ooTotal')"  min-width="80" align="left" 
                           :formatter="consignTurnoverFormatter">
          </el-table-column>
          <el-table-column prop="trans_number" :label="$t('message.om.Executed')"  min-width="80" align="left" 
                           :formatter="executedFormatter">
          </el-table-column>
          <el-table-column prop="status" :label="$t('message.om.State')"  min-width="80" align="left" 
                           :formatter="historyStatusFormatter">
          </el-table-column>
          <el-table-column prop="" :label="$t('message.om.Action')"  min-width="80" align="center" >
            <template  slot-scope="scope"> 
              <el-button plain class='consign_records_btn' @click="detailsClick(scope.$index, scope.row)">
                {{$t("message.om.Details")}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--暂无记录-->
        <div class="el-table__empty-block" style="width: 100%;" v-if="historyListData.length==0">
          <span class="el-table__empty-text"> {{$t("message.om.NoRecord")}}</span>
        </div>

      </div>
      <!--成交明细-->
      <div :style="{display:form.status==3?'block':'none'}">
         <el-table :data="dealListData"  :fit="tableFit" highlight-current-row border   style="width: 100%;"
          :row-class-name="tableRowClass" :cell-class-name="cellClass"
         >
          <el-table-column prop="finish_time" :label="$t('message.om.OrderDate')" min-width="100" align="left" 
              :formatter="tableTimeFormatter">
          </el-table-column>
          <el-table-column prop="" :label="$t('message.om.Paris')"  min-width="80" align="left"  
                           :formatter="tableParisFormatter">
          </el-table-column>
          <el-table-column prop="trans_direction" :label="$t('message.om.Type')"  min-width="60"  align="left" 
                           :formatter="transDirectionFormatter">
          </el-table-column>

          <el-table-column prop="trans_avg_price" :label="$t('message.om.Price')"  min-width="100" align="left" 
                           :formatter="transAvgPriceFormatter">
                            
          </el-table-column>
          <el-table-column prop="trans_number" :label="$t('message.om.Amount')"  min-width="100" align="left" 
                           :formatter="transAvgPriceFormatter">
          </el-table-column>
          <el-table-column prop="trans_turnover" :label="$t('message.om.Total')"  min-width="100" align="left" 
                           :formatter="transAvgPriceFormatter">
          </el-table-column>
          <el-table-column prop="fee_number" :label="$t('message.om.Fee')"  min-width="80" align="left" 
                           :formatter="transAvgPriceFormatter">
          </el-table-column>
        </el-table>
        <!--暂无记录-->
        <div class="el-table__empty-block" style="width: 100%;" v-if="dealListData.length==0">
          <span class="el-table__empty-text"> {{$t("message.om.NoRecord")}}</span>
        </div>
      </div>
    </div>
    <transition name="el-fade-in-linear">
      <bk-prompt  v-show="isPrompt" :isPrompt='isPrompt' :promptText='promptText' ></bk-prompt>
    </transition>
  </div>
</template>
<script>
import util from '../../common/js/util'
import Bus from '../../common/js/bus.js'
import bkSelect from '@/components/bkSelect' 
import bkPrompt from '@/components/bkPrompt' 
import {getRequest,getJavaRequest} from '@/axios/axios'
export default {
  name:'recordEntrust',
 
  components:{
    bkSelect,
    bkPrompt
  },
  props:['otcSymbol','bbSymbol'],
  data(){
    return {
      tableFit:true,//表格自适应
      expands: [],// 要展开的行，数值的元素是row的key值
      getRowKeys(row) {// 获取row的key值
          return row.id;
      },
      otcSelectAttr:['coin_short_name','coin_short_name',''],//下拉框数据属性
      isPrompt:0,//0 不显示 1成功 -1失败
      promptText:'',//提示框文字

      total_record_1:0, //数据总数
      price_precision_1:0,//价格精度
      number_precision_1:0,//数量精度
      total_record_2:0, //数据总数
      price_precision_2:0,//价格精度
      number_precision_2:0,//数量精度
      total_record_3:0, //数据总数
      price_precision_3:0,//价格精度
      number_precision_3:0,//数量精度
      //查询参数
      form:{
       
        status: "1", //1当前委托 2历史委托 3成交明细

        page:1, //页码
        page_size:9, //页数
        type:1  //数据来源  1数据库 2缓存
      },
      listData:[],//表格数据
      nowListData:[],
      historyListData:[],
      dealListData:[],

      consignDetailData:[], //详情数据

      //–>1：买入  2：卖出
      transDirections:[
        {
          value:1,
          label:this.$t('message.om.Buy')
        },
        {
          value:2,
          label:this.$t('message.om.Sell')
        }
      ],
      //历史状态
      historyStatus:[
        {
          value:1,
          label:this.$t('message.om.PartialTraded')
        },
        {
          value:2,
          label:this.$t('message.om.Traded')
        },
        {
          value:3,
          label:this.$t('message.om.Cancel')
        }
      ],
      //表格数据
      /*openOrderNames:[
        this.$t('message.om.OrderDate'),
        this.$t('message.om.Paris'),
        this.$t('message.om.Type'),
        this.$t('message.om.Price'),
        this.$t('message.om.Amount'),
        this.$t('message.om.Total'),
        this.$t('message.om.Fee'),
        this.$t('message.om.Buy'),
        this.$t('message.om.Action')
      ],*/
    }
  },
  computed:{
    

  },
  watch: {
    
  },
 /* create(){
    
  },*/
  mounted(){
    this.nowConsignRecordsAction();
    //组件通讯接收
    Bus.$on('limitMarketTrade',(v) => {
      this.nowConsignRecordsAction();
      this.historyConsignRecordsAction();
      this.dealConsignRecordsAction();

    })
     
    
  },
  methods:{

   /*  //选择下拉数据
    setSelectData(value) {
      this.form.otc_coin_name = value;
    },*/
    //提示框
    promptShowHide(value,text){
      this.isPrompt = value;
      this.promptText=text;
      let self = this;
      let pmtTime = window.setTimeout(function() {
        self.isPrompt = 0;
        self.promptText = '';
        window.clearInterval(pmtTime);
      }, 2000);
    },
    //tab切换
    handleTabClick(tab, event) {
      this.form.page = 1;
      this.expands = [];
      if(this.form.status == 1){
        this.nowConsignRecordsAction();
      }
      else if(this.form.status == 2){
         this.historyConsignRecordsAction();
      }
      else if(this.form.status == 3){
         this.dealConsignRecordsAction();
      }
    },
    //所有记录
    allRecordsClick(){
      //this.$router.push({name:'consignRecords'}); 
      this.$router.push({path:'/consignRecords/'});    
    },
   /* //搜索
    searchClick(){
      this.form.page = 1;
      this.consignRecordsAction();
    },
     //分页查询
    handleCurrentChange(val) {
      this.form.page = val;
      this.consignRecordsAction();
      //this.getUsers();
    },*/
    //撤单
    cancelClick(index,row){
      this.orderUntodoAction(row.id);
    },
   //详情
    detailsClick(index,row){
        this.consignDetailAction(row.id); 
      },
    /*//请求币币
    bbOtcLegelAction(){
      let params = {
        uid:779,
        api_type:"otc",
        api_method:"Consign_bbOtcLegel"
      }
      this.$store.dispatch('bbOtcLegelAction',params).then((res)=>{
        console.log('res',res)
      });
    },*/
    nowConsignRecordsAction(){
     
      let params = {
        api_type:"WEB_API",
        api_method:"AppConsign_ConsignRecords",
        otc_coin_name:this.otcSymbol,
        bb_coin_name:this.bbSymbol,
        uid:779,
      }
      Object.assign(params,this.form);
      params.status = 1;

      //请求
      getJavaRequest(params).then((res) => {
        let {msg,data,status} = res;
        if(status != 200){
        }else{
          //console.log('data',data);
          this.nowListData = data.list;
          //this.listData = data.list; //表格数据
          this.total_record_1 = data.total_record; //数据总数
          this.price_precision_1 = parseInt(data.price_precision);//价格精度
          this.number_precision_1 = parseInt(data.number_precision);//数量精度
        }
      });
      
    },
    historyConsignRecordsAction(){
      /*let params = {
        api_type:"otc",
        api_method:"Consign_consignRecords"
      }*/
      let params = {
        api_type:"WEB_API",
        api_method:"AppConsign_ConsignRecords",
        otc_coin_name:this.otcSymbol,
        bb_coin_name:this.bbSymbol,
        uid:779,
      }
      Object.assign(params,this.form);
      params.status = 2;

      //请求
      getJavaRequest(params).then((res) => {
        let {msg,data,status} = res;
        if(status != 200){
        }else{
          console.log('data',data);
          this.historyListData = data.list;
          //this.listData = data.list; //表格数据
          this.total_record_2 = data.total_record; //数据总数
          this.price_precision_2 = parseInt(data.price_precision);//价格精度
          this.number_precision_2 = parseInt(data.number_precision);//数量精度
        }
      });
      
    },
    dealConsignRecordsAction(){
      /*let params = {
        api_type:"otc",
        api_method:"Consign_consignRecords"
      }*/
      let params = {
        api_type:"WEB_API",
        api_method:"AppConsign_ConsignRecords",
        otc_coin_name:this.otcSymbol,
        bb_coin_name:this.bbSymbol,
        uid:779,
      }
      Object.assign(params,this.form);
      params.status = 3;

      //请求
      getJavaRequest(params).then((res) => {
        let {msg,data,status} = res;
        if(status != 200){
        }else{
          //console.log('data',data);
          this.dealListData = data.list;
          //this.listData = data.list; //表格数据
          this.total_record_3 = data.total_record; //数据总数
          this.price_precision_3 = parseInt(data.price_precision);//价格精度
          this.number_precision_3 = parseInt(data.number_precision);//数量精度
        }
      });
      
    },
    //请求委托数据 成交明细
    consignRecordsAction(){
      /*let params = {
        api_type:"otc",
        api_method:"Consign_consignRecords"
      }*/
      let params = {
        api_type:"WEB_API",
        api_method:"AppConsign_ConsignRecords",
        otc_coin_name:this.otcSymbol,
        bb_coin_name:this.bbSymbol,
        uid:779,
      }
      Object.assign(params,this.form);
      //console.log('AppConsign_ConsignRecords',params);
      params.status = Number(params.status);

      //请求
      getJavaRequest(params).then((res) => {
        let {msg,data,status} = res;
        if(status != 200){
        }else{
          console.log('data',data);
          if(this.form.status = 1){
             this.nowListData = data.list;
          }
          else if(this.form.status = 2){
            this.historyListData = data.list;
          }
          else if(this.form.status = 3){
            this.dealListData = data.list;
          }
          //console.log('dealListData',this.dealListData)
          //this.listData = data.list; //表格数据
          this.total_record = data.total_record; //数据总数
          this.price_precision = parseInt(data.price_precision);//价格精度
          this.number_precision = parseInt(data.number_precision);//数量精度
        }
      });
      //this.$store.dispatch('consignRecordsAction',params);
    },
    //撤单
    orderUntodoAction(id){
      //this.promptShowHide(-1,'撤销申请失败');
      let params = {
        order_id:id,
        api_type:"WEB_API",
        api_method:"AppbbUndoTrans"
      }
      getJavaRequest(params).then((res) => {
        let {msg,data,status} = res;
        if(status != 200){
          this.promptShowHide(-1,'撤销申请失败');
        }else{
          this.promptShowHide(1,'撤销申请成功');  
          this.nowConsignRecordsAction();
        }
      });
      /*this.$store.dispatch('orderUntodoAction',params).then(() => { 
        if(this.orderUntodo.status != 200){
         this.promptShowHide(-1,'撤销申请失败');
        }else{ 
        //this.promptShowHide(1,'撤销申请成功'); 
        }
      });*/
    },
    //详情
    consignDetailAction(id){
       let params = {
        consign_uid:779,
        consign_id:id,
        api_type:"WEB_API",
        api_method:"AppConsign_ConsignDetail"
      }

      getJavaRequest(params).then((res) => {
        let {msg,data,status} = res;
        if(status != 200){
          this.promptShowHide(-1,'查询详情失败');
        }else{
          //console.log('consignDetailAction',data)
          this.consignDetailData = data.list;
          this.expands = [];
          this.expands.push(id);  
        }
      });
      /*this.$store.dispatch('consignDetailAction',params).then((res) => { 
        console.log('res',res)
        if(res.status != 200){
          this.promptShowHide(-1,'查询详情失败');
        }else{
          this.expands = [];
          this.expands.push(id);  
        } 
      });*/

    },
    //时间戳转换
    tableTimeFormatter(row, column, cellValue, index){
      if(!cellValue){return '--';}
      let cellTime =new Date(parseInt(cellValue) * 1000);
      return util.formatDate.format(cellTime);
      //return cellValue
    },
    //表格交易对
    tableParisFormatter(row, column, cellValue, index){
      let bb = row.bb_coin_name ? row.bb_coin_name : '--',
          otc = row.otc_coin_name ? row.otc_coin_name : '--';
      let pari = bb + ' / ' + otc;
      return pari;
    },
    //交易方向
    transDirectionFormatter(row, column, cellValue, index){
      if(!cellValue){return '--';}
      for(let item of this.transDirections){
        if(item.value == cellValue){
          return item.label;
        }
      }
    },
    //历史委托 状态
    historyStatusFormatter(row, column, cellValue, index){
      if(!cellValue){return '--';}
      for(let item of this.historyStatus){
        if(item.value == cellValue){
          return item.label;
        }
      }
    },
    //委托价
    consignPriceFormatter(row, column, cellValue, index){
      let price_precision = 0;
      if(this.form.status == 1){
        price_precision = this.price_precision_1;
      }
      else if(this.form.status == 2){
        price_precision = this.price_precision_2;
      }
      else if(this.form.status == 3){
        price_precision = this.price_precision_3;
      }
       if(row.consign_price==null){
        return '市价';
      }
      let returnValue = Number(row.consign_price).toFixed(price_precision);
      return row.consign_type == 1 ? returnValue : '--';
     /* if(row.consign_type == 1){
        return Number(row.consign_price).toFixed(price_precision);
      }*/
    },
    //委托量
    consignNumberFormatter(row, column, cellValue, index){
      let number_precision = 0;
      if(this.form.status == 1){
        number_precision = this.number_precision_1;
      }
      else if(this.form.status == 2){
        number_precision = this.number_precision_2;
      }
      else if(this.form.status == 3){
        number_precision = this.number_precision_3;
      }
      let returnValue = Number(row.consign_number).toFixed(number_precision);
      if(row.consign_type == 1){
        return returnValue;
      }else{
        return row.trans_direction == 1 ? '--' : returnValue;
        /*if(row.trans_direction == 1){
          return '--';
        }else{
          return row.consign_number//.toFixed(number_precision);
        }*/
      }
    },
    //委托总额
    consignTurnoverFormatter(row, column, cellValue, index){
      let price_precision = 0;
      if(this.form.status == 1){
        price_precision = this.price_precision_1;
      }
      else if(this.form.status == 2){
        price_precision = this.price_precision_2;
      }
      else if(this.form.status == 3){
        price_precision = this.price_precision_3;
      }
      let returnValue = Number(row.consign_turnover).toFixed(price_precision);
      if(row.consign_type == 1){
        return returnValue;
      }else{
        return row.trans_direction == 1 ? returnValue : '--'
        /*if(row.trans_direction == 1){
          return row.consign_turnover//.toFixed(price_precision);
        }else{
          return '--';
        }*/
      }
    },
    //已完成
    executedFormatter(row, column, cellValue, index){
      let number_precision = 0;
      if(this.form.status == 1){
        number_precision = this.number_precision_1;
      }
      else if(this.form.status == 2){
        number_precision = this.number_precision_2;
      }
      else if(this.form.status == 3){
        number_precision = this.number_precision_3;
      }
      let executed = Number(row.trans_number).toFixed(number_precision);
      return executed;
    },
    //未完成
    unexecutedFormatter(row, column, cellValue, index){
      let number_precision = 0;
      if(this.form.status == 1){
        number_precision = this.number_precision_1;
      }
      else if(this.form.status == 2){
        number_precision = this.number_precision_2;
      }
      else if(this.form.status == 3){
        number_precision = this.number_precision_3;
      }
      let unexecuted = Number(row.consign_number - row.trans_number).toFixed(number_precision);
      if(row.consign_type == 1){
        return unexecuted;
      }else{
        return row.trans_direction == 1 ? '--' : unexecuted;
        /*if(row.trans_direction == 1){
          return '--';
        }else{
          return unexecuted;
        }*/
      }
    },
    //空
    tableNullFormatter(row, column, cellValue, index){
      let returnValue = cellValue ? cellValue : '--';
      return returnValue;
    },
    //成交均价
    transAvgPriceFormatter(row, column, cellValue, index){
      let price_precision = 0;
      if(this.form.status == 1){
        price_precision = this.price_precision_1;
      }
      else if(this.form.status == 2){
        price_precision = this.price_precision_2;
      }
      else if(this.form.status == 3){
        price_precision = this.price_precision_3;
      }
      let returnValue = cellValue ?Number(cellValue).toFixed(price_precision) : '--';
      return returnValue;
    },

    //样式
    tableRowClass(row){
      return 'table-row';
    },
    cellClass(row){
      return "cell-class";
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
$block-color: #161920;

.recordEntrust{
  letter-spacing:0;
  width: 100%;
  height:100%;
  margin-top:0;
  .bk-title{
    height:60px;
    line-height:60px;
    padding:0 16px;

    background-color:#1C2029;
    border-radius:4px 4px 0 0;
    font-size:14px;
    color:#BAC1DA;
    box-shadow: 0px 2px 4px #000000;
    .all-records{
      float:right;
      cursor:pointer;
    }
  }
  .rt-view{
    height:530px;
    background-color:$block-color;
    padding:0 16px;
    font-size:13px;
  }
}




</style>
<style type="text/css">


.content-table{
    width: 100%;
    height: 500px;
    overflow: hidden;
  }
  .content-table .table_header{
    width: 100%;
    display: block;
  }
  .content-table .table_header li,.content-table .table_body li{
    display: inline-block;
    font-size: 12px;
    color:#555E70;
    border-bottom: 1px solid #1C2029;
    float: left;
  }
  .table_header li{
    height: 40px;
    line-height: 40px;
  }
  .table_body li{
    height: 60px;
    line-height: 60px;
  }
  .content-table  li:nth-of-type(1){
    width: 14.82%;
    min-width:180px;
  }
  .content-table  li:nth-of-type(2){
    width: 10.70%;
    min-width:130px;
  }
  .content-table  li:nth-of-type(3){
    width:5.07%;
    min-width:70px;
  }             
  .content-table  li:nth-of-type(4){
    width: 12.52%;
    min-width:152px;
  }
  .content-table  li:nth-of-type(5){
    width: 12.35%;
    min-width:150px;
  }
  .content-table  li:nth-of-type(6){
    width: 13.18%;
    min-width:160px;
  }
  .content-table  li:nth-of-type(7){
    width: 12.52%;
    min-width:152px;
  }
  .content-table  li:nth-of-type(8){
    width: 6.60%;
    min-width:80px;
  }
  .content-table  li:nth-of-type(9){
    width: 11.52%;
    min-width:140px;
    text-align: right;
  }


  /* elementUI css reset */
#recordEntrust  .el-tabs__item:hover {
    color: #FFAE36;
  }
#recordEntrust  .el-tabs__item.is-active {
    color: #FFAE36;
  }
#recordEntrust  .el-tabs__nav-wrap::after {
    background-color: initial;
  }
#recordEntrust  .el-tabs__active-bar {
    background-color: #1C2029;
  }
#recordEntrust  .el-tabs__item {
    /* padding: 0 46px; */
    line-height: 20px;
    color: #BAC1DA;
    font-weight: 200;
  }

#recordEntrust  .el-tabs{
    width: 480px; 
    height: 40px;
    float: left;
  }



 #recordEntrust .el-table {
    font-size: 12px;
    color: #858CA3;
}
#recordEntrust .el-table .cell-class{
  padding: 12px 0;
}

#recordEntrust .el-table,#recordEntrust .el-table__expanded-cell {
  background-color: #161920;
}
#recordEntrust .el-table--border,#recordEntrust .el-table--group {
  border: 1px solid #161920;
  border-bottom: 1px solid #161920;
  /* border-bottom: 1px solid #1C2029; */
}
 #recordEntrust .el-table th,#recordEntrust .el-table tr {
  background-color: #161920;
}

#recordEntrust .el-table td,#recordEntrust .el-table th.is-leaf {
  border-bottom: 1px solid #1C2029;
}
#recordEntrust .el-table--border td,#recordEntrust .el-table--border th,#recordEntrust .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
  border-right: 0;
}
#recordEntrust .el-table--border::after,#recordEntrust .el-table--group::after,#recordEntrust .el-table::before {
  background-color: #161920;
}
#recordEntrust .el-table thead {
  color: #555E70;
  font-weight: 200;
}

#recordEntrust .el-table__empty-block:nth-of-type(1){
  display: none;
}

#recordEntrust .el-table__empty-block{
  padding-top: 68px;
  background: url(../../assets/pic_zwjl_heidi.png) center center no-repeat;
  
}
#recordEntrust .el-table__empty-text{
  display: inline-block;
  padding-top: 50px;
  padding-right: 6px;
  color: #858CA3;
}

#recordEntrust .el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: #343A4C;
  border-right: 0;
}
#recordEntrust .el-table__body tr.current-row>td{
  background-color: #161920;
}


#recordEntrust .el-button{
  padding: 0;
  margin-left: 6px;
  text-align: center;
  color: #bac1da;
  background-color: #1c2029;
  border: 1px solid #bac1da;
}
#recordEntrust .consign_records_btn{
  width: 48px;
  line-height: 24px;
  height: 24px;
  display: inline-block;
}
#recordEntrust .el-button.is-plain:focus,#recordEntrust .is-plain:hover,#recordEntrust .consign_records_btn.is-plain:active{
  color: #FFAE36;
  border:1px solid #FFAE36;
  background-color: #1C2029;
}
#recordEntrust .el-table__expanded-cell{
  padding: 0;
}

#recordEntrust  .el-table__expand-icon>.el-icon {
  display: none;
  }


.inTableClass{
  margin-left: 12px;
  margin-right: 1.06%;
  padding-left: 40px;
  background-color: #262C38;
  font-size: 12px;
  color:#BAC1DA;
}
.inTableClass .inTableTitle{
  height: 40px;
  padding:10px 0;
  
}
.inTableClass .inTableTitle ul{
  height: 100%;
}
.inTableClass .inTableTitle ul li{
  display: inline-block;

  width: 19%;
}
.inTableClass .inTableTitle ul li:last-child{
  text-align: right;
}

.inTableClass  .inTableContent{
  height: 40px;
  padding:10px 0;
}

.inTableClass .inTableContent .inTableRow{
   height: 100%;
}
.inTableClass .inTableContent .inTableRow span{
   display: inline-block;

  width: 19%;
}


  /* end */
th {
  font-weight: 200;    
}

  
</style>