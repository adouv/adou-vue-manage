<template>
<div class="ad-input-type-business-component">
    <!--input-->
    <ad-select name="InputType" @change="selectHandller(item);" v-if="type===0" v-model="val">
        <option value>请选择规则</option>
        <option value="text">text</option>
        <option value="number">number</option>
    </ad-select>

    <!--file-->
    <p v-if="type==1">默认规则</p>

    <!--select-->
    <a-button v-if="type===2" type="success" @click.native="selectDicHandller(item);">{{val?'已选择:'+val:'选择类目'}}</a-button>

    <!--radio-->
    <a-button v-if="type===3" type="success" @click.native="selectDicHandller(item);">{{val?'已选择:'+val:'选择类目'}}</a-button>

    <!--checkbox-->
    <a-button v-if="type===4" type="success" @click.native="selectDicHandller(item);">{{val?'已选择:'+val:'选择类目'}}</a-button>

    <!--textarea-->
    <p v-if="type===5">默认规则</p>

    <!--time-->
    <ad-select name="InputType" @change="selectHandller(item);" v-if="type===6" v-model="val">
        <option value>请选择规则</option>
        <option value="HH:mm">HH:mm</option>
        <option value="HH:mm:ss">HH:mm:ss</option>
    </ad-select>

    <!--date-->
    <ad-select name="InputType" @change="selectHandller(item);" v-if="type===7" v-model="val">
        <option value>请选择规则</option>
        <option value="yyyy/MM/dd">yyyy/MM/dd</option>
        <option value="yyyy-MM-dd">yyyy-MM-dd</option>
        <option value="yyyy年MM月dd日">yyyy年MM月dd日</option>
        <option value="yyyy/MM">yyyy/MM</option>
        <option value="yyyy-MM">yyyy-MM</option>
        <option value="yyyy年MM月">yyyy年MM月</option>
    </ad-select>

    <!--start date、end date-->
    <ad-select name="InputType" @change="selectHandller(item);" v-if="type===8" v-model="val">
        <option value>请选择规则</option>
        <option value="yyyy/MM/dd">yyyy/MM/dd</option>
        <option value="yyyy-MM-dd">yyyy-MM-dd</option>
        <option value="yyyy年MM月dd日">yyyy年MM月dd日</option>
        <option value="yyyy/MM">yyyy/MM</option>
        <option value="yyyy-MM">yyyy-MM</option>
        <option value="yyyy年MM月">yyyy年MM月</option>
    </ad-select>
</div>
</template>

<script>
import ArtlceEnum from "../../../enum/artlce.enum";
import AdDicListBusinessComponent from "../adDicList/index.vue";
export default {
    name: "AdInputTypeBusinessComponent",
    props: {
        item: {
            type: Object,
            default: {}
        },
        type: {
            type: [Number],
            default: 0
        },
        value: [Number, String, Boolean, Date, Array]
    },
    data() {
        return {
            val: ""
        };
    },
    watch: {
        value(val) {
            this.val = val;
        }
    },
    mounted() {
        this.val = this.value;
        this.$nextTick(() => {
            this.val = this.value;
        });
        this.$emit("input", "");
    },
    methods: {
        /**
         * 下拉菜单改变事件
         */
        selectHandller(item) {
            this.$emit("input", this.val);
        },
        /**
         * 选择字典数据
         */
        selectDicHandller(item) {
            this.adModal$({
                visible: true,
                title: `请选择字典目录`,
                cancelText: "关闭",
                componentName: AdDicListBusinessComponent,
                params: item
            });

        }
    }
};
</script>
