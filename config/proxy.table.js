module.exports = {
    '/_Ashx': {
        target: 'http://localhost:63003',
        changeOrigin: true,
        pathRewrite: {
            '^/_Ashx': '/_Ashx'
        },
        headers: {
            referer: "http://localhost:63003"
        }
    },
    // '/_Ashx': {
    //     target: 'http://www.a-dou.com',
    //     changeOrigin: true,
    //     pathRewrite: {
    //         '^/_Ashx': '/_Ashx'
    //     },
    //     headers: {
    //         referer: "http://www.a-dou.com"
    //     }
    // },
};