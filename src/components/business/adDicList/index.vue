<template>
<div class="ad-dic-list-business-component">
    <ad-table :columns="columns" :dataSource="list" :loading="loading" :minWidth="450">
        <template slot="check" slot-scope="rows">
            <a-checkbox :checked="rows.data.check" @change="selectHandller(rows.data);"></a-checkbox>
        </template>
    </ad-table>
</div>
</template>

<script>
import adSystemDictionaryService from "../../../service/adSystemDictionaryService";
export default {
    name: "AdDicListBusinessComponent",
    data() {
        return {
            request: {
                ParentID: 0,
                IsValide: 1,
                OrderBy: "Sort",
                IsDesc: false
            },
            columns: [{
                    title: "选择",
                    dataIndex: "check",
                    key: "check",
                    width: "15%"
                }, {
                    title: "编号",
                    dataIndex: "ID",
                    key: "ID",
                    width: "40%"
                },
                {
                    title: "字典",
                    dataIndex: "Label",
                    key: "Label"
                }
            ],
            list: [],
            loading: false
        };
    },
    mounted() {
        this.getSystemDicList()
    },
    methods: {
        /**
         * 获取字典列表
         */
        getSystemDicList() {
            this.loading = true;
            this.list = [];
            adSystemDictionaryService.getSystemDictionaryList(this.request).then(response => {
                if (response && response.length > 0) {
                    response.forEach(element => {
                        element.check = false;
                        this.list.push(element);
                    });
                }
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            });
        },
        /**
         * 
         */
        selectHandller(item) {
            item.check = !item.check;
            if (item.check) {
                this.$emit('change', item);
                this.list.filter(e => e.ID !== item.ID).forEach(e => e.check = false);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/ddd/mixin.scss";

.ad-dic-list-business-component {
    >div {
        margin: 0px;
        padding: 0px;
    }

    height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
    @include scroll-bar(5px);
}
</style>
