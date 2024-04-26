<template>
  <div class="road-container" style="width: 1688px; height: 1720px; background: #FFFFFF;">
    <el-form ref="form" :model="form" :label-position="labelPosition" label-width="100px" >
       <el-form-item label="管理员姓名">
         <el-input v-model="form.name" placeholder="请输入管理员姓名" />
       </el-form-item>

        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="form.telephone" placeholder="请输入手机号" />
        </el-form-item>

        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account" placeholder="请输入账号" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>

        <el-form-item label="所属部门" prop="depm">
          <el-select v-model="form.depm" placeholder="请选择所属部门">
            <el-option label="总经办" value="gmo"></el-option>
            <el-option label="财务部" value="acc"></el-option>
            <el-option label="人力资源部" value="hr"></el-option>
            <el-option label="技术部" value="it"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="头像" prop="picture">
            <div class="flex mb20">
            <image-upload>
              <span>上传400*400px，JPG，PNG，JPEG格式的 图片，图片小于1M</span>
            </image-upload>
        </div>
        </el-form-item>
        
        <el-form-item label="启用状态">
          <el-switch v-model="form.state" active-color="#1BD9A1" inactive-color="#D1D1D1"></el-switch>
        </el-form-item>

        <el-form-item label="权限分配">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" text-color="#1BD9A1">公司管理:</el-checkbox>
              <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedComp" @change="handleCheckedCompChange">
                <el-checkbox v-for="comp in comp" :label="comp" :key="comp">{{comp}}</el-checkbox>
            </el-checkbox-group>

            <el-checkbox :indeterminate="isvIndeterminate" v-model="checkAll" @change="handleCheckAllChange">视频管理:</el-checkbox>
              <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedVideo" @change="handlecheckedVideoChange">
                <el-checkbox v-for="video in video" :label="video" :key="video">{{video}}</el-checkbox>
            </el-checkbox-group>

            <el-checkbox :indeterminate="isifIndeterminate" v-model="checkAll" @change="handleCheckAllChange">咨询管理:</el-checkbox>
              <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedInfo" @change="handlecheckedInfoChange">
                <el-checkbox v-for="info in info" :label="info" :key="info">{{info}}</el-checkbox>
            </el-checkbox-group>

            <el-checkbox :indeterminate="isgIndeterminate" v-model="checkAll" @change="handleCheckAllChange">商品管理:</el-checkbox>
              <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedGoods" @change="handlecheckedGoodsChange">
                <el-checkbox v-for="goods in goods" :label="goods" :key="goods">{{goods}}</el-checkbox>
            </el-checkbox-group>

            <el-checkbox :indeterminate="isoIndeterminate" v-model="checkAll" @change="handleCheckAllChange">订单管理:</el-checkbox>
              <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedOrder" @change="handlecheckedOrderChange">
                <el-checkbox v-for="order in order" :label="order" :key="order">{{order}}</el-checkbox>
            </el-checkbox-group>

            <el-checkbox :indeterminate="isuIndeterminate" v-model="checkAll" @change="handleCheckAllChange">用户管理:</el-checkbox>
              <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedUser" @change="handlecheckedUserChange">
                <el-checkbox v-for="user in user" :label="user" :key="user">{{user}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>

          <el-button>取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
    </el-form>
  </div>
</template>

<script>
import ImageUpload from "@/components/Upload/ImageUpload.vue";

const compOptions = ['添加轮播图', '删除轮播图', '添加信息', '删除信息'];
const videoOptions = ['发布视频', '删除视频',  '编辑视频'];
const infoOptions = ['发布资讯', '删除资讯',  '编辑资讯', '删除评论'];
const goodsOptions = ['导入商品', '新增商品',  '上架/下架', '查看评论'];
const orderOptions = ['查看列表', '查看详情',  '发货', '同意/拒绝退款'];
const userOptions = ['查看列表', '新增用户',  '修改'];

export default {
    components: {
      ImageUpload,
   },
    data() {
      return {
        labelPosition: 'left',
        form: {
          name: '',
          telephone: '',
          account: '',
          password: '',
          depm: '',
          state: '',
        },
          checkAll: false,
          checkedComp: [],
          comp: compOptions,
          isIndeterminate: true,
          isvIndeterminate:true,
          isifIndeterminate:true,
          isgIndeterminate:true,
          isoIndeterminate:true,
          isuIndeterminate:true,
          checkedVideo: [],
          video: videoOptions,
          checkedInfo: [],
          info: infoOptions,
          checkedGoods: [],
          goods: goodsOptions,
          checkedOrder: [],
          order: orderOptions,
          checkedUser: [],
          user: userOptions,
      }
    },
    methods: {
      onSubmit() {
      },
      handleCheckAllChange(val) {
        this.checkedComp = val ? compOptions : [];
        //this.checkedVideo = val ? videoOptions : [];
        this.isIndeterminate = false;
        
      },
      handleCheckedCompChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.comp.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.comp.length;
      }/* ,
      handleCheckAllChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.comp.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.video.length;
      } */
    }
  }
</script>

<style lang="scss" scoped>

.el-form {
 padding: 39px 71px 139px 72px;

}
.el-select, .el-input {
  width: 1448px;
  height: 48px;
  padding-bottom:30px;
}

.bot {
  padding: 169px 780px 1015px 93px;
}
.el-button {
  width: 240px;
  height: 48px;
  margin-top: 133px;
  border: 1px solid #D9D9D9;
  font-size: 16px;
  font-weight: 400;
}
</style>