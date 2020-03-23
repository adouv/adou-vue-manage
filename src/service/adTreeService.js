export default {
    /**
     * 递归系统菜单数据
     * @param {*} data 数据列表
     * @param {*} ParentID 父级编号
     */
    getMenuTreeList(data, ParentID) {
        let getJsonTree = function(data, ParentID) {
            let itemArr = [];
            let childList = [];
            if (data.length > 0) {
                data.forEach(item => {
                    if (item.ParentID === ParentID) {
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
        return getJsonTree(data, ParentID);
    },
    /**
     * 递归系统字典数据
     * @param {*} data 数据列表
     * @param {*} ParentID 父级编号
     */
    getDictionaryTreeList(data, ParentID) {
        let getJsonTree = function(data, ParentID) {
            let itemArr = [];
            let childList = [];
            if (data.length > 0) {
                data.forEach(item => {
                    if (item.ParentID === ParentID) {
                        let newNode = {};
                        newNode.id = item.ID;
                        newNode.coding = item.Coding;
                        newNode.label = item.Label;
                        newNode.value = item.Value;
                        newNode.parentName = item.ParentName;
                        newNode.parentId = item.ParentID;
                        newNode.sort = item.Sort;
                        newNode.isValide = item.IsValide;
                        newNode.isValideCheck = item.IsValide == 1 ? true : false;
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
        return getJsonTree(data, ParentID);
    }
}