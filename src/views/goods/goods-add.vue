<template>
  <div class="goods-add">
    <el-form ref="form" :model="form" label-width="80px" label-position="left">
      <div>
        <div class="title mb32">商品基本信息</div>
        <el-form-item label="商品名称">
          <el-input
            v-model="form.name"
            placeholder="请输入商品名称（必填）"
          ></el-input>
        </el-form-item>

        <el-form-item label="是否上架">
          <el-switch
            v-model="form.putaway"
            active-color="#1BD9A1"
            inactive-color="#D1D1D1"
          />
        </el-form-item>

        <el-form-item label="商品价格" prop="frei">
          <el-input placeholder="请输入商品价格（必填）" v-model="form.frei">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>

        <el-form-item label="商品分类">
          <el-select
            style="width: 500px"
            v-model="form.region"
            placeholder="请选择商品分类（必填）"
          >
            <el-option label="日用品" value="1"></el-option>
            <el-option label="家具电器" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="库存量" prop="stock">
          <el-input
            placeholder="请填写商品库存量（必填）"
            v-model="form.stock"
          />
        </el-form-item>
      </div>

      <div>
        <div class="title">商品规格</div>

        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          placeholder="请输入颜色类型"
          style="width: 160px"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <!-- <i class="el-icon-circle-plus-outline"></i> -->
        <el-button
          v-else
          class="button-new-tag"
          type="text"
          size="small"
          @click="showInput"
          >添加属性</el-button
        >
      </div>

      <div>
        <div class="title">轮播图</div>
        <el-form-item label="商品图片" prop="stock">
          <image-upload>
            <span
              >建议上传尺寸750*750px的图片,格式仅支持png、jpg、jpeg,轮播图片数量最多不能大于9张</span
            >
          </image-upload>
        </el-form-item>
      </div>

      <div>
        <div class="title mb20">商品详情</div>
        <el-form-item label="内容详情" prop="content">
          <Tinymce ref="editor" style="margin-top: 20px" :height="478" />
        </el-form-item>
      </div>

      <div>
        <div class="title mb24">商品物流信息</div>

        <el-form-item label="发货地">
          <el-cascader
            style="width: 500px"
            v-model="selectedOptions"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="hangleChange"
          />
        </el-form-item>

        <el-form-item label="运费">
          <el-select v-model="form.region" style="width: 500px">
            <el-option label="包邮" value="1"></el-option>
            <el-option label="不包邮" value="2"></el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="underpart">
        <el-button>取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
import Tinymce from "@/components/Tinymce";
import ImageUpload from "@/components/Upload/ImageUpload";

export default {
  components: { Tinymce, ImageUpload },
  data() {
    return {
      form: {
        province: "",
        city: "",
        name: "",
        putaway: "",
        frei: "",
        region: "",
        stock: "",
      },
      provinceList: [],
      cityList: [],
      dynamicTags: ["属性一", "属性二", "属性三"],
      inputVisible: false,
      inputValue: "",
      selectedOptions: [],
      options: regionData,
    };
  },
  methods: {
    async getRegion(id) {
      let _this = this;
      let data = {
        region_id: id,
      };
      this.form.city = "";
      if (id == 0) {
        const res = await this.$axios.post("/region/list", { ...data });
        _this.provinceList = res.data;
      } else {
        const res = await this.$axios.post("/region/list", { ...data });
        _this.cityList = res.data;
      }
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$refs.saveTagInput.$refs.input.focus();
      this.$nextTick((_) => {});
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    hangleChange() {
      this.form.provinces = CodeToText[this.selectedOptions[0]];
      this.form.city = CodeToText[this.selectedOptions[1]];
      this.form.area = CodeToText[this.selectedOptions[2]];
    },
  },
};
</script>

<style lang="scss" scoped>
.goods-add {
  width: 100%;
  padding: 40px 40px 0 74px;
  background: #ffffff;
  font-family: Microsoft YaHei;

  .title {
    font-size: 20px;
    font-weight: bold;
    color: #333333;
    line-height: 54px;
  }

  .underpart {
    padding: 26px 0;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 20px;
    // height: 32px;
    line-height: 30px;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}

::v-deep .el-form-item__label {
  font-family: Microsoft YaHei;
  font-size: 16px;
  font-weight: 400;
  color: #333333;
  line-height: 54px;
}

::v-deep .el-input__inner {
  height: 48px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #999999;
  line-height: 54px;
}

::v-deep .el-switch__core {
  margin-top: 10px;
}
</style>