const gulp = require('gulp')
const fs = require('fs')
const tIconData = require('./src/assets/lib/themify-icons/Themify IconFonts 5-23-2014.json')
const wIconData = require('./src/assets/lib/webicons/src/icons.json')

gulp.task('wicon', function() {
    var list = [];
    Object.keys(wIconData).forEach((item, index) => {
        let params = {
            id: index,
            name: item,
            icon: "icon wb-" + item
        };
        list.push(params);
    });

    let result = {
        UserId: null,
        Data: list,
        Message: "成功",
        ErrorCode: "0000",
        IsSuccess: true,
        Status: 200
    };


    fs.writeFile('./static/icon/iconWeb.json', JSON.stringify(result), { 'flag': 'a' }, function(err) {
        if (err) {
            throw err;
        }

        console.log('Hello.');

        // 写入成功后读取测试
        fs.readFile('./static/icon/iconWeb.json', 'utf-8', function(err, data) {
            if (err) {
                throw err;
            }
            console.log(data);
        });
    });
});

gulp.task('ticon', function() {
    var list = [];
    var temp = [];
    tIconData.iconSets.forEach((item, index) => {
        temp.push(...item.selection);
    });

    temp.forEach((item, index) => {
        var args = {
            id: index,
            name: item.name,
            icon: 'icon ti-' + item.name
        };

        list.push(args);
    });

    let result = {
        UserId: null,
        Data: list,
        Message: "成功",
        ErrorCode: "0000",
        IsSuccess: true,
        Status: 200
    };

    fs.writeFile('./static/icon/iconThemify.json', JSON.stringify(result), { 'flag': 'a' }, function(err) {
        if (err) {
            throw err;
        }

        console.log('Hello.');

        // 写入成功后读取测试
        fs.readFile('./static/icon/iconThemify.json', 'utf-8', function(err, data) {
            if (err) {
                throw err;
            }
            console.log(data);
        });
    });
});