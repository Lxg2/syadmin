<Table Name="SyArticle" TableName="sy_article" Description="内容表">
<Columns>
  <Column Name="id" DataType="String" RawType="varchar(50)" PrimaryKey="True" Nullable="False" />
  <Column Name="Title" DataType="String" RawType="varchar(255)" Master="True" Length="255" Nullable="False" Description="标题" />
  <Column Name="Categoryid" DataType="Int32" RawType="int(11)" Description="分类ID" />
  <Column Name="Content" DataType="String" RawType="longtext" Length="0" Description="正文" />
  <Column Name="Isshow" DataType="Int32" RawType="int(1)" Description="显示/隐藏" />
  <Column Name="Sortid" DataType="Int32" RawType="int(11)" Nullable="True" Description="排序值" />
  <Column Name="Userid" DataType="String" RawType="varchar(50)" Description="创建者" />
  <Column Name="Username" DataType="String" RawType="varchar(50)" Description="创建人" />
  <Column Name="Createtime" DataType="DateTime" Description="创建时间" />
  <Column Name="Lastupdatetime" DataType="DateTime" Description="最后修改时间" />
  <Column Name="Isdelete" DataType="Int32" RawType="int(1)" Description="是否删除 1是已删" />
  <Column Name="Hotstr" DataType="String" RawType="varchar(50)" Description="是否热门那些选项" />
  <Column Name="HdAddress" ColumnName="hd_address" DataType="String" RawType="varchar(255)" Length="255" Description="活动_地点" />
  <Column Name="HdLng" ColumnName="hd_lng" DataType="String" RawType="varchar(50)" />
  <Column Name="HdLat" ColumnName="hd_lat" DataType="String" RawType="varchar(50)" />
  <Column Name="Limitusercount" DataType="Int32" RawType="int(11)" Nullable="True" Description="活动_活动限制人数" />
  <Column Name="Imgurl" DataType="String" RawType="varchar(255)" Length="255" Description="封面图片" />
  <Column Name="Tags" DataType="String" RawType="varchar(255)" Length="255" Description="标签" />
  <Column Name="Servicetype" DataType="String" RawType="varchar(255)" Length="255" Description="融资_服务类型" />
  <Column Name="Channelname" DataType="String" RawType="varchar(50)" Description="频道别名" />
  <Column Name="Begintime" DataType="DateTime" Description="活动开始时间" />
  <Column Name="Companyid" DataType="String" RawType="varchar(50)" Description="公司关联ID" />
  <Column Name="Viewcount" DataType="Int32" RawType="int(11)" Nullable="True" Description="浏览量" />
  <Column Name="Touzilingyu" DataType="String" RawType="varchar(255)" Length="255" Description="投资领域" />
  <Column Name="Jijinguimo" DataType="String" RawType="varchar(255)" Length="255" Description="基金规模" />
  <Column Name="Jijinguanliren" DataType="String" RawType="varchar(255)" Length="255" Description="基金管理人" />
  <Column Name="Guanlirenjieshao" DataType="String" RawType="longtext" Length="0" Description="管理人介绍" />
  <Column Name="Guanlirentouzianli" DataType="String" RawType="longtext" Length="0" Description="管理人投资案例" />
  <Column Name="Worktime" DataType="String" RawType="varchar(50)" Description="工作时间 社区" />
  <Column Name="Communityname" DataType="String" RawType="varchar(255)" Length="255" Description="所属社区" />
  <Column Name="Communityusername" DataType="String" RawType="varchar(50)" Description="社区负责人姓名" />
  <Column Name="Communityusermobile" DataType="String" RawType="varchar(50)" Description="社区负责人电话" />
  <Column Name="Communitypositon" DataType="String" RawType="varchar(50)" Description="社区负责人职务" />
  <Column Name="Remarks" DataType="String" RawType="varchar(500)" Length="500" Description="内容描述" />
  <Column Name="JrCompanyname" ColumnName="jr_companyname" DataType="String" RawType="varchar(50)" Description="金融产品发布者的企业名称" />
  <Column Name="Author" DataType="String" RawType="varchar(50)" Description="作者" />
  <Column Name="Areaid" DataType="String" RawType="varchar(50)" Description="找空间所属区域（社区）" />
  <Column Name="Floor" DataType="String" RawType="varchar(255)" Length="255" Description="楼层/栋" />
  <Column Name="Rent" DataType="String" RawType="varchar(255)" Length="255" Description="租金（元/m2）" />
  <Column Name="Area" DataType="String" RawType="varchar(255)" Length="255" Description="面积（单位/m2）" />
  <Column Name="Floorheight" DataType="String" RawType="varchar(50)" Description="层高" />
  <Column Name="Elevatortype" DataType="String" RawType="varchar(50)" Description="电梯类型" />
  <Column Name="Loads" DataType="String" RawType="varchar(50)" Description="荷载（单位kg/m2）" />
  <Column Name="Rentingfloors" DataType="String" RawType="varchar(100)" Length="100" Description="在租楼层与户型" />
  <Column Name="Deliverystandards" DataType="String" RawType="varchar(255)" Length="255" Description="交付标准" />
  <Column Name="Yearbuilt" DataType="String" RawType="varchar(50)" Description="建成年份" />
  <Column Name="RecruitmentRegion" DataType="String" RawType="varchar(100)" Length="100" Description="招聘地区" />
  <Column Name="Educationalbackground" DataType="String" RawType="varchar(100)" Length="100" Description="学历" />
  <Column Name="Workyear" DataType="String" RawType="varchar(50)" Description="工作年限" />
  <Column Name="Salaryrange" DataType="String" RawType="varchar(50)" Description="薪资范围" />
  <Column Name="Supplytype" DataType="Int32" RawType="int(1)" PrimaryKey="True" Description="找市场 0是供应 1是需求" />
</Columns>
<Indexes>
  <Index Name="PRIMARY" Columns="id,supplytype" Unique="True" PrimaryKey="True" />
  <Index Name="PRIMARY" Columns="id,supplytype" Unique="True" PrimaryKey="True" />
</Indexes>
</Table>