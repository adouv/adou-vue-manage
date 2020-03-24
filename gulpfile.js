const gulp = require('gulp')
const fs = require('fs')
const iconData = require('./src/assets/lib/themify-icons/Themify IconFonts 5-23-2014.json')

gulp.task('web-icon', function() {
    var list = [];
    var temp = [];
    iconData.iconSets.forEach((item, index) => {
        temp.push(...item.selection);
        // console.log(item);

    });

    temp.forEach((item, index) => {
        var args = {
            id: index,
            name: item.name,
            icon: 'icon ti-' + item.name
        };

        console.log(args);

        list.push(args);
    });
    fs.writeFile('./static/icon/iconThemify.json', JSON.stringify(list), { 'flag': 'a' }, function(err) {
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