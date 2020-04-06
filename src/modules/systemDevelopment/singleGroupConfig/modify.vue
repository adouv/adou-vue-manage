<template>
<ad-main :title="['首页','系统开发配置','单页分类配置',`${params.ID===0?'添加':'编辑'}单页分类配置`]">
    <div class="row row-lg">
        <div class="col-sm-12 col-md-12">
            <ad-example title="分类名称" required>
                <a-input v-model="params.Name" placeholder="请输入分类名称"></a-input>
            </ad-example>
        </div>

        <div class="col-sm-12 col-md-12">
            <ad-example title="排序值">
                <a-input type="number" v-model="params.Sort" placeholder="请输入排序值"></a-input>
            </ad-example>
        </div>

        <div class="col-sm-12 col-md-12">
            <ad-example title="以下为单页资料信息固定属性">
                <div class="example table-responsive ad-table">
                    <div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>属性名称</th>
                                    <th>描述</th>
                                    <th>配置</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in fixedFieldList" :key="index">
                                    <td>{{item.label}}</td>
                                    <td>{{item.desc}}</td>
                                    <td>
                                        <span v-if="item.setting.length===0">无配置项</span>
                                        <ad-example v-for="(items,j) in item.setting" :key="j" :title="items.label" style="margin-bottom:10px">
                                            <a-input :placeholder="`请输入${items.label}`" style="width:150px" v-model="items.value"></a-input>
                                        </ad-example>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </ad-example>
        </div>

        <div class="col-sm-12 col-md-12">
            <ad-example title="是否增加自定义属性">
                <a-radio-group v-model="params.IsCustomField" buttonStyle="solid" size="small">
                    <a-radio-button :value="0">否</a-radio-button>
                    <a-radio-button :value="1">是</a-radio-button>
                </a-radio-group>
            </ad-example>
        </div>

        <div class="col-sm-12 col-md-12" v-if="params.IsCustomField==1">
            <ad-example title="自定义区域" des="(可增加、修改、删除自定义属性)，注：以下自定义属性，增加成功后不可随意进行删除操作，避免影响到用户显示！">
                <div class="example table-responsive ad-table ad-table-custom">
                    <div style="width:100%;min-width:1000px;">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>表字段名称</th>
                                    <th>属性名称</th>
                                    <th>文本类型</th>
                                    <th>文本规则</th>
                                    <th>是否必填</th>
                                    <th>备注</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in customFieldList" :key="index">
                                    <td width="15%">
                                        <!-- <i class="fa fa-times" aria-hidden="true" @click="btnDeleteInputOptionHandller(item,index)"></i> -->
                                        <a-input placeholder="请输入表字段名称" v-model="item.Field"></a-input>
                                    </td>
                                    <td width="15%">
                                        <a-input placeholder="请输入属性名称" v-model="item.Label"></a-input>
                                    </td>
                                    <td width="15%">
                                        <ad-select name="InputType" v-model="item.InputType" @change="selectInputTypeHandller(item);">
                                            <option :value="0">input(输入框)</option>
                                            <option :value="1">file(上传框)</option>
                                            <option :value="2">select(选择器)</option>
                                            <option :value="3">radio(单选框)</option>
                                            <option :value="4">checkbox(多选框)</option>
                                            <option :value="5">textarea(多行文本框)</option>
                                            <option :value="6">time(时间选择器)</option>
                                            <option :value="7">date(日期选择器)</option>
                                            <option :value="8">start date、end date(开始、结束日期选择器)</option>
                                        </ad-select>
                                    </td>
                                    <td width="15%">
                                        <adbu-input-type :item="item" :type="item.InputType" v-model="item.InputRule"></adbu-input-type>
                                    </td>
                                    <td width="20%">
                                        <a-input type="textarea" :rows="2" placeholder="请输入备注" v-model="item.Remark"></a-input>
                                    </td>
                                    <td>
                                        <a-checkbox v-model="item.IsRequire">必填</a-checkbox>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="6">
                                        <a-button type="primary" @click.native="btnAddInputOptionHandller">增加扩展属性项</a-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </ad-example>
        </div>

        <div class="col-sm-12 col-md-12">
            <a-button type="secondary" @click.native="$router.go(-1);">返回</a-button>
            <a-button type="primary" @click.native="btnSave()">保存</a-button>
        </div>
    </div>
</ad-main>
</template>

<script>
import adSystemDictionaryService from "../../../service/adSystemDictionaryService";
import adSingleGroupService from "../../../service/adSingleGroupService";
import adSingleAndCustomService from "../../../service/adSingleAndCustomService";
import adSingleCustomFieldService from "../../../service/adSingleCustomFieldService";
import ArticleEnum from "../../../enum/artlce.enum";
export default {
    name: "AdSystemDevSingleGroupConfigModifyComponent",
    data() {
        return {
            params: {
                ID: 0,
                Name: "",
                Sort: 100,
                IsCustomField: 0,
                IsDel: 1,
                Setting: "",
                AdSingleCustomFieldList: []
            },
            fixedFieldList: ArticleEnum.fixedFieldList,
            customFieldList: []
        };
    },
    mounted() {
        let params = this.$route.params;

        if (params.ID !== undefined) {
            this.params = params;
            this.fixedFieldList = [];
            this.customFieldList = [];
            this.fixedFieldList = JSON.parse(params.Setting);
            this.params.AdSingleCustomFieldList.forEach(element => {
                if (
                    element.InputType === 2 ||
                    element.InputType === 3 ||
                    element.InputType === 4
                ) {
                    element.DictionaryName = element.InputRule.split("|")[1];
                }
                this.customFieldList.push(element);
            });
        }
    },
    methods: {
        /**
         * 增加输入项事件
         */
        btnAddInputOptionHandller() {
            this.customFieldList.push({
                ID: 0,
                Field: "",
                Label: "",
                InputType: 0,
                InputRule: "",
                DictionaryName: "",
                Remark: "",
                IsRequire: false,
                GroupID: 0
            });
        },
        /**
         * 删除输入项
         */
        btnDeleteInputOptionHandller(item, index) {
            if (item.ID > 0) {
                this.http$
                    .all([
                        adSingleCustomFieldService.updateAdSingleCustomFieldIsDelByID({
                            ID: item.ID,
                            IsDel: 0
                        }),
                        adSingleAndCustomService.updateAdSingleAndCustomIsDelByGroupIDAndCustomFieldID({
                            GroupID: this.params.ID,
                            CustomFieldID: item.ID,
                            IsDel: 0
                        })
                    ])
                    .then(
                        this.http$.spread((res1, res2) => {
                            if (response > 0) {
                                this.customFieldList.splice(index, 1);
                                this.$tip("删除成功");
                            } else {
                                this.$tip("删除失败");
                            }
                        })
                    );
            } else {
                this.customFieldList.splice(index, 1);
            }
        },
        /**
         *
         */
        selectInputTypeHandller(item) {
            item.InputRule = "";
            console.log(item);
        },
        /**
         * 保存
         */
        btnSave() {
            this.params.Setting = JSON.stringify(this.fixedFieldList);
            this.params.AdSingleCustomFieldList = this.customFieldList;

            let result = null;

            if (this.params.ID === 0) {
                result = adSingleGroupService.addAdSingleGroup(this.params);
            } else {
                result = adSingleGroupService.updateAdSingleGroupByID(this.params);
            }

            result.then(response => {
                if (response > 0 && response !== null) {
                    let args = {
                        Title: this.params.Name,
                        Icon: "fa fa-laptop",
                        Url: "adWebSingle",
                        OtherID: 0,
                        ParentID: 42,
                        LevelID: 0,
                        Type: -2,
                        Perms: "",
                        Sort: this.params.Sort,
                        IsValide: 1
                    };
                    if (this.params.ID === 0) {
                        args.OtherID = response;
                        adSystemMenuService.addSystemMenu(args).then(res => {
                            if (res > 0 && res !== null) {
                                this.$tip("保存成功");
                            } else {
                                this.$tip("保存失败");
                            }
                        });
                    } else {
                        args.OtherID = this.params.ID;
                        adSystemMenuService.updateSystemMenuByOtherID(args).then(res => {
                            if (res > 0 && res !== null) {
                                this.$tip("保存成功");
                            } else {
                                this.$tip("保存失败");
                            }
                        });
                    }
                } else {
                    this.$tip("保存失败");
                }
                this.$router.go(-1);
            });
        }
    }
};
</script>
