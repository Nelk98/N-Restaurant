<template>
  <div class="modify">
    <div class="bgc" @click.capture="closeBox"></div>
    <div class="modify-box" v-if="content">
      <!-- <div class="close-btn" @click="closeBox">×</div> -->
      <div class="info-box">
        <span class="iid">编号：&nbsp;<span style="letterSpacing: 5px; color: #079992;">{{content.iid}}</span></span>
        <label for="name" class="name label">
          名称：
          <input type="text" id="name" v-model="name">
        </label>
        <label for="category" class="category label">
          分类：
          <input type="text" id="category" v-model="category">
        </label>
        <label for="price" class="price label">
          价格：
          <input type="number" id="price" v-model="price">
        </label>
        <label for="desc" class="desc label">
          描述：
          <textarea id="desc" v-model="desc"></textarea>
        </label>
        <div class="tags">
          标签：
          <div class="tags-box">
            <el-checkbox class="checkbox" v-model="cold" border>冰</el-checkbox>
            <el-checkbox class="checkbox" v-model="hot" border>辣</el-checkbox>
            <el-checkbox class="checkbox" v-model="sour" border>酸</el-checkbox>
            <el-checkbox class="checkbox" v-model="sweet" border>甜</el-checkbox>
            <el-checkbox class="checkbox" v-model="tw" border>台湾特色</el-checkbox>
          </div>
        </div>
      </div>
      <div class="img-box">
        <van-uploader class="upload" v-model="imgList" multiple :max-count="1" :preview-full-image="false"></van-uploader>
        <div class="commit-btn" @click="commitModify">确认修改</div>
      </div>
    </div>
  </div>
</template>

<script>
import {Checkbox} from 'element-ui';
import VanUploader from 'vant/lib/uploader';
import 'vant/lib/uploader/style';


export default {
  name: 'ModifyBox',
  components: {
    Checkbox,
    VanUploader
  },
  props: {
    content: Object
  },
  data() {
    return {
      imgList: [],
      name: null,
      category: null,
      price: null,
      desc: null,
      cold: null,
      hot: null,
      sour: null,
      sweet: null,
      tw: null,
      isChangeImg: false
    }
  },
  methods: {
    closeBox() { 
      this.$parent.show = false
    },
    upload(e) {
      // console.log(e.target.files)
      // console.log(this.$refs.upload.files)
      console.log(URL.createObjectURL(e.target.files[0]))
    },
    commitModify() {
      const modify = {
        name: this.name,
        category: this.category,
        price: this.price,
        desc: this.desc,
        imgList: this.imgList,
        isChangeImg: this.isChangeImg,
        tags: {
          cold: this.cold,
          hot: this.hot,
          sour: this.sour,
          sweet: this.sweet,
          tw: this.tw
        }
      }
      this.$emit('commitModify', modify)
    }
  },
  watch: {
    content() {
      this.imgList = [{url: this.content.img}]
      this.name = this.content.name
      this.category = this.content.category
      this.price = this.content.price
      this.desc = this.content.desc
      this.cold = this.content.tags.cold
      this.hot = this.content.tags.hot
      this.sour = this.content.tags.sour
      this.sweet = this.content.tags.sweet
      this.tw = this.content.tags.tw
      //重新设置图片未修改
      this.isChangeImg = false
    },
    imgList() {
      if(this.imgList[0] && this.imgList[0].content) {
        this.isChangeImg = true
      }
    }
  }
}
</script>

<style scoped>
.modify {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 99;
}
.bgc {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(51, 51, 51, .38);
  cursor: pointer;
}
.modify-box {
  width: 1000px;
  height: 600px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  border-radius: 16px;
  display: flex;
}
.close-btn {
  width: 46px;
  height: 46px;
  font-size: 34px;
  line-height: 42px;
  text-align: center;
  color: #fff;
  background-color: #eb2f06;
  box-shadow: 0 0 6px rgba(51, 51, 51, .1);
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate3d(30%, -30%, 0);
  cursor: pointer;
  z-index: 999;
}
.info-box,
.img-box {
  flex: 1;
  position: relative;
}
.info-box::after {
  content: '';
  height: 500px;
  width: 1px;
  background-color: #d8d8d8;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate3d(0, -50%, 0);
}
span.iid {
  position: absolute;
  left: 40px;
  top: 80px;
}
label.label {
  position: absolute;
  left: 40px;
}
label.name {
  top: 120px;
}
label.category {
  top: 180px;
}
label.price {
  top: 240px;
}
label.desc {
  top: 300px;
}
div.tags {
  top: 440px;
  position: absolute;
  left: 40px;
}
input[type="text"],
input[type="number"]{
  width: 320px;
  height: 40px;
  text-indent: 0.6em;
  border: 1px solid #d8d8d8;
  background-color: #f3f3f3;
}
textarea {
  vertical-align: top;
  resize: none;
  width: 320px;
  height: 120px;
  padding: 10px;
  border: 1px solid #d8d8d8;
  background-color: #f3f3f3;
}
.tags-box {
  width: 350px;
  height: 100px;
  /* background-color: #f3f3f3;
  border: 1px solid #d8d8d8; */
  float: right;
  margin-left: 5px;
}
label {
  margin-left: 0;
}
.checkbox {
  margin: 10px;
}
.upload {
  width: 300px;
  height: 300px;
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
.commit-btn {
  width: 200px;
  height: 49px;
  background-color: #2ecc71;
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  line-height: 49px;
  text-align: center;
  color: #fff;
  border-radius: 6px;
  box-shadow: 0 0 6px 1px rgba(51, 51, 51, .38);
  cursor: pointer;
}
</style>