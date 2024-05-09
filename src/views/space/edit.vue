<template>
  <div class="container-box">
    <el-form class="my-form" :rules="rules" ref="myform" :model="ruleForm" label-width="200px">
      <el-form-item label="空间名称" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入空间名称"></el-input>
      </el-form-item>
      <el-form-item label="标签展示">
        <el-tag
          :key="tag"
          v-for="tag in ruleForm.tags"
          closable
          :disable-transitions="false"
          @close="colseitem(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput" style="font-size: 13px !important;">+ 类型标签</el-button>
      </el-form-item>
      <!-- <el-form-item label="热度" prop="title">
        <el-input type="number" v-model="ruleForm.title" placeholder="请输入空间名称"></el-input>
      </el-form-item> -->
      <el-form-item label="所属分类" prop="categoryid">
        <el-select style="width: 100%;" v-model="ruleForm.categoryid" clearable placeholder="请选择分类">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.Categorytitle"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区域">
        <el-select style="width: 100%;" v-model="ruleForm.areaid" filterable placeholder="请选择区域">
          <el-option
            v-for="item in options2"
            :key="item.Categorytitle"
            :label="item.Categorytitle"
            :value="item.Categorytitle">
          </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="楼层/栋">
        <el-input v-model="ruleForm.floor" placeholder="例如C栋3层"></el-input>
      </el-form-item>
      <el-form-item label="租金(单位:元/m²)">
        <el-input v-model="ruleForm.rent" placeholder="请输入租金"></el-input>
      </el-form-item>
      <el-form-item label="面积(单位:m²)">
        <el-input v-model="ruleForm.area" placeholder="请输入面积"></el-input>
      </el-form-item>



      
      <!-- <el-form-item label="房屋类型" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入空间名称"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入空间名称"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="月租价格(单位:元/m²)" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入空间名称"></el-input>
      </el-form-item> -->
      <el-form-item label="层高(单位:m)">
        <el-input v-model="ruleForm.floorheight" placeholder="请输入空间名称"></el-input>
      </el-form-item>
      <el-form-item label="电梯类型">
        <el-select style="width: 100%;" v-model="ruleForm.elevatortype" clearable placeholder="请选择电梯">
          <el-option
            v-for="item in options3"
            :key="item.Categorytitle"
            :label="item.Categorytitle"
            :value="item.Categorytitle">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="荷载(单位:kg/m²)">
        <el-input v-model="ruleForm.loads" placeholder="请输入荷载"></el-input>
      </el-form-item>
      <el-form-item label="在租楼层与户型">
        <el-input v-model="ruleForm.rentingfloors" placeholder="请输入在租楼层与户型"></el-input>
      </el-form-item>
      <el-form-item label="交付标准">
        <el-select style="width: 100%;" v-model="ruleForm.deliverystandards" clearable placeholder="请选择交付标准">
          <el-option
            v-for="item in options4"
            :key="item.Categorytitle"
            :label="item.Categorytitle"
            :value="item.Categorytitle">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="建成年份">
        <el-input v-model="ruleForm.recruitmentRegion" placeholder="请输入公司地址"></el-input>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="ruleForm.hdAddress" placeholder="请输入详细地址"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="ruleForm.communityusermobile" placeholder="请输入公司地址"></el-input>
      </el-form-item>
      
      <el-form-item label="空间简介" prop="content">
        <Tinymce ref="editor" v-if="editflag" v-model="ruleForm.remarks" :height="250">
        </Tinymce>
      </el-form-item>
      <el-form-item label="配套设施" prop="content">
        <Tinymce ref="editor" v-if="editflag" v-model="ruleForm.content" :height="250">
        </Tinymce>
      </el-form-item>
      <!-- <el-form-item label="成立时间">
        <el-input v-model="ruleForm.null" placeholder="请输入成立时间"></el-input>
      </el-form-item>
      <el-form-item label="公司地址">
        <el-input v-model="ruleForm.hdAddress" placeholder="请输入公司地址"></el-input>
      </el-form-item> -->

      <el-form-item label="置顶/热门">
        <div style="margin-left: 10px;">
          <el-checkbox-group v-model="ruleForm.hotstr">
            <el-checkbox label="置顶" :value="1"></el-checkbox>
            <el-checkbox label="热门" :value="2"></el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item label="排序ID">
        <el-input v-model="ruleForm.sortid" placeholder="ID越小越靠前"></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <div style="margin-left: 10px;">
          <el-switch
            v-model="ruleForm.isshow"
            active-text="显示"
            inactive-text="隐藏">
          </el-switch>
        </div>
      </el-form-item>
      <el-form-item label="封面" prop="filelist">
        <el-upload
          :action="$store.state.user.beseFile"  
          list-type="picture-card"  
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-upload="beforeUpload"
          :on-remove="handleRemove"
          :file-list="fileList"
          :headers="upheaders"
          multiple
        >  
          <div slot="trigger" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">  
            <i style="font-size: 80px;" class="el-icon-picture-outline"></i>  
            <i style="font-size: 14px; margin-top: 10px;" class="el-icon-plus">添加封面</i>  
          </div>  
        </el-upload>
      </el-form-item>
      <el-form-item>
        <div class="but-b">
          <el-button @click="$router.go(-1)">取消</el-button>
          <el-button type="primary" @click="submitForm('myform')">发布</el-button>
         </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageUpload from "@/components/Upload/ImageUpload.vue";
import Tinymce from "@/components/Tinymce";
import {GetArtcileInfo,GetSelectCategory,UpdateArticle} from '@/api/user'
export default {
  components: {
    ImageUpload,
    Tinymce
  },
  data() {
    // 图片验证规则
    var validateImg = (rule, value, callback) => {
        if (value === '' || value === undefined) {
          callback(new Error('请上传封面'));
        } else {
          callback();
        }
      };
    return {
      editflag:false,
      options:[
        {
          id:0,
          Categorytitle:'工业'
        },
        {
          id:1,
          Categorytitle:'办公'
        },
        {
          id:2,
          Categorytitle:'商业'
        }
      ],
      options2:[
        {
          Categorytitle:'石龙社区'
        },
        {
          Categorytitle:'水田社区'
        },
        {
          Categorytitle:'官田社区'
        },
        {
          Categorytitle:'上屋社区'
        },
        {
          Categorytitle:'龙腾社区'
        },
        {
          Categorytitle:'浪心社区'
        },
        {
          Categorytitle:'宝源社区'
        },
        {
          Categorytitle:'罗租社区'
        },
        {
          Categorytitle:'塘头社区'
        },
        {
          Categorytitle:'应人石社区'
        },
      ],
      options3:[
        {
          Categorytitle:'不限'
        },
        {
          id:0,
          Categorytitle:'客梯'
        },
        {
          id:1,
          Categorytitle:'货梯'
        },
      ],
      options4:[
        {
          Categorytitle:'不限'
        },
        {
          id:0,
          Categorytitle:'毛坯'
        },
        {
          id:1,
          Categorytitle:'精装'
        },
      ],
      fileList: [],
      upheaders:{},
      imgdialogVisible:false,
      validateImg,
      dialogImageUrl:'',
      inputVisible: false,
      inputValue: '',
      ruleForm: {
        title:'',
        tags:[],
        categoryid:'',
        areaid:'',
        floor:'',
        rent:'',
        area:'',
        floorheight:'',
        elevatortype:'',
        loads:'',
        rentingfloors:'',
        deliverystandards:'',
        yearbuilt:'',
        recruitmentRegion:'',
        communityusermobile:'',
        remarks:'',
        isshow:true,
        hotstr:[],
        content:'',
        sortid:'',
        filelist:[],
        hdAddress:'',
      },
      rules: {
        title: [
            { required: true, message: '请输入政策标题', trigger: 'blur' },
          ],
          categoryid: [
            { required: true, message: '请选择分类', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请填写政策内容', trigger: 'change' }
          ],
          filelist: [
            { required: true, trigger: 'change', validator: validateImg, }
          ],
      },
    };
  },
  created(){
    this.getclasslist()
       // 获取详情
       GetArtcileInfo({id:this.$route.query.id}).then(res=>{
        let {Title:title,Content:content,Hotstr:hotstr,Categoryid:categoryid,Sortid:sortid,Isshow:isshow,
          Tags:tags,Areaid:areaid,Floor:floor,Rent:rent,Area:area,Floorheight:floorheight,Elevatortype:elevatortype,
          Loads:loads,Rentingfloors:rentingfloors,Deliverystandards:deliverystandards,Yearbuilt:yearbuilt,
          RecruitmentRegion:recruitmentRegion,Communityusermobile:communityusermobile,Remarks:remarks,
          Fileslist:filelist,HdAddress:hdAddress
        } = res.datalist
        this.ruleForm.title = title
        if(tags){
        this.ruleForm.tags = tags.split(',')
      }
        this.ruleForm.areaid = areaid
        this.ruleForm.floor = floor
        this.ruleForm.rent = rent
        this.ruleForm.area = area
        this.ruleForm.floorheight = floorheight
        this.ruleForm.elevatortype = elevatortype
        this.ruleForm.loads = loads
        this.ruleForm.rentingfloors = rentingfloors
        this.ruleForm.deliverystandards = deliverystandards
        this.ruleForm.yearbuilt = yearbuilt
        this.ruleForm.recruitmentRegion = recruitmentRegion
        this.ruleForm.communityusermobile = communityusermobile
        let arr = []
        filelist.forEach(item=>arr.push({uid:Math.ceil(Math.random() * 10000000000000+Math.random(10)),url:item}))
        this.ruleForm.filelist = arr
        this.fileList = arr
        this.ruleForm.hdAddress = hdAddress
        this.ruleForm.hotstr = hotstr.split(',')
        this.ruleForm.categoryid = categoryid
        this.editflag = true
        this.ruleForm.sortid = sortid
        this.ruleForm.isshow = isshow? true : false
        this.$nextTick(()=>{
          this.ruleForm.content = content
          this.ruleForm.remarks = remarks
        })
      })
  },
  mounted(){
  },
  methods: {
    async getclasslist() {
      let res = await GetSelectCategory({channelname:this.$route.meta.channelname})
      this.options = res.datalist
    },
    showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
    colseitem(tag){
        this.ruleForm.tags.splice(this.ruleForm.tags.indexOf(tag), 1);
      },
         // 添加标签
    handleInputConfirm(){
      let inputValue = this.inputValue;
        if (inputValue) {
          // 去重
          if(this.ruleForm.tags.length !== 0){
            !this.ruleForm.tags.includes(inputValue) && this.ruleForm.tags.push(inputValue);
          }else{
            this.ruleForm.tags.push(inputValue);
          }
        }
        this.inputVisible = false;
        this.inputValue = '';
    },
    beforeUpload(file) {  
      const isJPG = file.type === 'image/jpeg';  
      const isPNG = file.type === 'image/png';  
      const isLt10M = file.size / 1024 / 1024 < 10;  
      if (!isJPG && !isPNG) {  
        this.$message.error('上传图片只能是 JPG/PNG 格式!');  
      }  
      if (!isLt10M) {  
        this.$message.error('上传图片大小不能超过 10MB!');  
      }  
      return isJPG || isPNG && isLt10M;
    },  
    handleSuccess(response, file, fileList) {
    if(response.status === 200){
      if (fileList.every(item => item.status == "success")) {
          //由于fileList是所有的文件包含之前已上传过的，这里需要做区分（带response的即为新上传的）
          fileList.map(item => {
            if(item.response){
              this.ruleForm.filelist.push({url:item.response.filepath,uid:item.uid});
            }
          })
        }
    }
      // this.ruleForm.filelist.push({url:response.filepath,uid:file.uid});
    },
    handleError(error) {
      this.$message.error(error.msg);
      // 你可以在这里处理上传失败后的逻辑
    },  
    handleRemove(data) {
      // 排除
      let index = this.ruleForm.filelist.findIndex(item => item.uid === data.uid);
      this.ruleForm.filelist.splice(index, 1);
    },
    async getselectlist(){
      let res = await GetSelectCategory({channelname:this.$route.meta.channelname})
      this.options = res.datalist
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          let {hotstr,isshow,filelist,tags} = this.ruleForm
          filelist = filelist.map(item => item.url).join(',')
          tags = tags.join(',')
          this.ruleForm.hotstr = hotstr.join(',')
          let res = await UpdateArticle({...this.ruleForm,filelist,tags,id:this.$route.query.id,channelname:this.$route.meta.channelname,isshow:+isshow})
          if(res.status == 200){
            this.$message.success(res.msg)
            this.$router.go(-1)
          }
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .my-form .el-form-item .el-form-item__label{
    font-size: 17px !important;
}
}
.container-box {
  min-height: 100%;
  height: auto !important;
  padding: 3.038% 0px 1%;
  box-sizing: border-box;
}
</style>
