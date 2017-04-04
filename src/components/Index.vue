<template>
    
    <mobile-tear-sheet>
        <div class="sec-input">
            <mu-text-field hintText="请输入磁力" v-model="secStr" class="demo-divider-form" :underlineShow="false" />
            <mu-raised-button label="Default" @click="search()" class="demo-raised-button"/>
            <mu-divider />
        </div>
    <mu-list>
        <mu-list-item v-for="item in dataList" @click="openJump(item)" :key="item.data" :title="item.name" :describeText="item.size">
            <mu-icon slot="right" value="info"/></mu-list-item>
            <mu-divider />
        </mu-list-item>
    </mu-list>

    <mu-flat-button primary label="测试按钮" @click="testBtn" slot="actions"/>

    <mu-dialog :open="choDialog" @close="close" title="" scrollable>
        <mu-menu>
            <div style="padding-bottom:20px;padding-left:16px;">
                <a target="_blank" :href="hrefJump">长按新窗口打开（先点）</a><br>
            </div>
            <div style="padding-bottom:20px;padding-left:16px;">
                <a target="_blank" :href="videoUrl">点击下载（后点）</a><br>
            </div>
            <div style="padding-bottom:20px;padding-left:16px;">
                <a href="javascript:void(0)" @click="playVideo">点击播放（后点）</a><br>
            </div>
        </mu-menu>
        <mu-flat-button primary label="关闭" @click="close" slot="actions"/>
    </mu-dialog>

    <div>
        <mu-dialog :open="hashError" title="错误">
            {{msg}}
            <mu-flat-button label="管关闭" slot="actions" primary @click="close"/>
        </mu-dialog>
    </div>
    </mobile-tear-sheet>
</template>

<script>
export default {
  data () {
    return {
        secStr:"34e9f160c069fcdbb1bbb451d0cc78daa992d7fa",
        hrefJump: '', //跳转qq首页地址
        backData: {}, //返回的数据
        hashError: false, //磁力不对时，弹出
        msg: "", //错误弹出内容
        videoUrl:'',
        tempData: '',// 暂时存储数据
        dialogJump: false, //弹出跳转写入cookie
        choDialog: false, //选择界面
        dataList: []
    }
  },
  created: function(){
      let self = this;
      
  },
  methods: {
      /**
       * 关闭所有窗口
       */
      close: function(){
          this.hashError = false;
          this.dialogJump = false;
          this.choDialog = false;
          this.hashError = false;
          this.hashError = false;
      },
      /**
       * 打开选择界面
       */
      openJump: function(item){
          let self = this;
          self.tempData = item.data;
          self.choDialog = true;
          self.$http.get('',{
              params:{
                  url:g.getCookie + self.tempData
              }
          }).then(function(res){
              if(res.status == 200){
                  let data = res.data;
                  if(data.code == 1){
                      self.backData = data.data;
                      let cook = data.data.play_url_cookie.replace("FTN5K=","");
                      self.hrefJump = "http://www.qq.com/?cook="+cook;
                      self.videoUrl = data.data.play_url;
                    //   window.location.href="http://www.qq.com/404/?cook="+cook;
                  }else{
                      self.msg="没有数据！";
                      self.hashError = true;
                  }
              }else{
                  self.msg="服务端发生错误！";
                  self.hashError = true;
              }
          }).catch(function(){
              self.msg="服务端发生错误！";
              self.hashError = true;
          });
      },
      /**
       * 跳转播放
       */
      playVideo: function(){
          this.$router.push({
          path: "/playvideo",
          query: {
            url: this.backData.play_url
          }
        });
      },
      /**
       * 弹出跳转写入cookie
       */
      jumpA: function(){
          let self = this;
          self.$http.get('',{
              params:{
                  url:g.getCookie + self.tempData
              }
          }).then(function(res){
              if(res.status == 200){
                  let data = res.data;
                  if(data.code == 1){
                      let cook = data.data.play_url_cookie.replace("FTN5K=","");
                      window.location.href="http://www.qq.com/404/?cook="+cook;
                  }else{
                      self.msg="没有数据！";
                      self.hashError = true;
                  }
              }else{
                  self.msg="服务端发生错误！";
                  self.hashError = true;
              }
          }).catch(function(){
              self.msg="服务端发生错误！";
              self.hashError = true;
          });
          
      },
      search:function(){
          let self = this;
          let hash = self.secStr;
          let handleHash = self.handleMagnet(hash);
          if(handleHash.length > 1){
              self.$http.get('',{
                params:{
                    url:g.getHash + handleHash
                }
             }).then(function(res){
                if(res.status == 200){
                    let data = res.data;
                    if(data.code == 1){
                        self.dataList = data.data;
                    }else{
                        self.msg = '链接还没收录';
                        self.hashError = true;
                    }
                }
             }).catch(function(){
                 self.msg = '服务器发生错误！';
                 self.hashError = true;
             });
          }else{
              self.msg = '磁力链接格式不正确';
              self.hashError = true;
          }          
      },
      /**
       * 磁力链接处理
       */
      handleMagnet:function(str){
          if(str.length == 60){
            let index = str.indexOf("magnet:?xt=urn:btih:");
            if(index == -1){
                return "";
            }else{
                if(str.replace("magnet:?xt=urn:btih:","").length == 40){
                    return str.replace("magnet:?xt=urn:btih:","");
                }else{
                    return "";
                }
            }
          }else if(str.length == 40){
              let regExp = /^[a-z0-9]+$/i;
              if(regExp.test(str)){
                  return str;
              }else{
                  return "";
              }
          }else{
              return "";
          }
          

      },
      /**
       * 测试按钮
       */
      testBtn: function(){
          let self = this;
          self.choDialog=true;
      }
    
  }
}
</script>

<style scoped>
</style>
