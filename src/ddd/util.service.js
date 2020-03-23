import Vue from "vue";
/**
 * 工具类服务
 */
export default {
    /**
     * 通过生日获取年龄
     * @param {any} birthday
     */
    getAge(birthday) {
        let date = new Date();
        let oldDate = new Date(birthday);
        return parseInt(date.getFullYear()) - parseInt(oldDate.getFullYear());
    },
    /**
     * 获取菜单树列表
     * @param {*} data 
     * @param {*} pid 
     */
    getMenuTreeList(data, pid) {
        let getJsonTree = function(data, pid) {
            let itemArr = [];
            let childList = [];
            if (data.length > 0) {
                data.forEach(item => {
                    if (item.ParentID === pid) {
                        let newNode = {};
                        newNode.id = item.ID;
                        newNode.title = item.Title;
                        newNode.icon = item.Icon;
                        newNode.url = item.Url;
                        newNode.path = item.Path;
                        newNode.otherId = item.OtherID;
                        newNode.parentId = item.ParentID;
                        newNode.levelId = item.LevelID;
                        newNode.type = item.Type;
                        newNode.perms = item.Perms;
                        newNode.sort = item.Sort;
                        newNode.isValide = item.IsValide;
                        newNode.isValideCheck = item.IsValide == 1 ? true : false;
                        newNode.isDel = item.IsDel;
                        newNode.createTime = item.CreateTime;
                        newNode.createUser = item.CreateUser;
                        newNode.modifyTime = item.ModifyTime;
                        newNode.modifyUser = item.ModifyUser;
                        newNode.hover = "";
                        newNode.subHover = "";
                        newNode.hasSub = false;
                        newNode.isOpen = false;
                        childList = getJsonTree(data, item.ID);
                        if (childList.length > 0) {
                            newNode.hasSub = true;
                            newNode.children = childList;
                        } else {
                            newNode.children = [];
                        }
                        itemArr.push(newNode);
                    }
                });
            }
            return itemArr;
        };
        return getJsonTree(data, pid);
    }
}