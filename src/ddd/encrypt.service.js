import CryptoJS from "crypto-js";
import JSEncrypt from "jsencrypt";
import PublicEnum from "../enum/public.enum";
/**
 * EncryptService
 * 加密服务
 */
export default {
    /**
     * 实体加密（RSA证书加密）
     * @param {*} model
     * @param {*} isEncryption
     */
    dataRSAEncryption(model, isEncryption = false) {
        let encryptionModel = {
            MerchantId: null,
            Data: null,
            EncryptKey: null
        };

        encryptionModel.MerchantId = process.env.merchantID;
        let ran_aesKEY = this.generateAESKey();
        model.Ip = "167.0.12.31";
        model.Mac = "00-15-5D-7E-36-5B";
        model.IsValid = true;
        model.Version = "1.0.0";
        model.TimesTamp = this.getTimesTamp();
        model.Sign = null;

        if (isEncryption) {
            //新版本
            model.Sign = this.getSign(
                encryptionModel.MerchantId,
                model.TimesTamp,
                model.Ip,
                model.Mac
            );
        }

        encryptionModel.Data = JSON.stringify(model);
        encryptionModel.EncryptKey = this.RSAEncrypt(ran_aesKEY);

        return encryptionModel;
    },
    /**
     * 实体加密（明参）
     * @param {*} model 
     * @param {*} isEncryption 
     */
    dataEncryption(model, isEncryption = false) {
        model.MerchantId = process.env.merchantID;
        model.Ip = "167.0.12.31";
        model.Mac = "00-15-5D-7E-36-5B";
        model.IsValid = true;
        model.Version = "1.0.0";
        model.TimesTamp = this.getTimesTamp();

        if (window.localStorage.getItem(PublicEnum.AD_LOCAL_USER_INFO)) {
            let user = JSON.parse(window.localStorage.getItem(PublicEnum.AD_LOCAL_USER_INFO));
            model.Token = JSON.stringify({
                ID: user.ID,
                UserName: user.UserName,
                UserType: user.UserType,
                UserStatus: user.UserStatus,
                IsDel: user.IsDel
            });
        } else {
            let u = {
                ID: 0,
                UserName: "test",
                UserType: 0,
                UserStatus: 0,
                IsDel: 1
            };
            model.Token = JSON.stringify(u);
        }

        model.Sign = null;

        if (isEncryption) {
            //新版本
            model.Sign = this.getSign(
                process.env.merchantID,
                model.TimesTamp,
                model.Ip,
                model.Mac
            );
        }

        return model;
    },
    /* 获取Md5加密sign值
     * @param {*} MerchantId 商户编号
     * @param {*} TimesTamp 时间戳
     * @param {*} Ip IP地址
     * @param {*} Mac MAC
     */
    getSign(MerchantId, TimesTamp, Ip, Mac) {
        let jsonData = `MerchantId=${MerchantId}&TimesTamp=${TimesTamp}&Ip=${Ip}&Mac=${Mac}${process.env.userKey}`;
        let sign = CryptoJS.MD5(jsonData) + "";
        return sign.toUpperCase();
    },
    /**
     * 获取时间戳
     */
    getTimesTamp() {
        let date = new Date();

        let fullYear = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let milliseconds = date.getMilliseconds();

        let timesTamp = Date.UTC(
            fullYear,
            month,
            day,
            hours,
            minutes,
            seconds,
            milliseconds
        );

        return timesTamp;
    },
    /**
     * 生成16位AES - KEY
     */
    generateAESKey() {
        let k = process.env.key.split(",");
        let keyLength = k.length;
        let m = 0;
        let n = keyLength - 1;
        let str = "";

        for (let index = 0; index < 16; index++) {
            let ran = Math.random() * (n - m) + m;
            str = str + process.env.key[parseInt(ran.toString())];
        }

        return str;
    },
    /**
     * 
     * @param data 加密数据
     * @param key 16位KEY
     */
    AESEncrypt(data, key) {
        let k = CryptoJS.enc.Utf8.parse(key);
        let i = CryptoJS.enc.Utf8.parse(key);

        let encrypted = CryptoJS.AES.encrypt(data, k, {
            iv: i,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        let encryptedHexStr = CryptoJS.enc.Hex.parse(encrypted.ciphertext.toString());
        let encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);

        return encryptedBase64Str;
    },
    /**
     * AES数据解密
     * @param {*} data 要解密的数据
     * @param {*} key 16位AES_KEY
     */
    AESDecrypt(data, key) {
        let k = CryptoJS.enc.Utf8.parse(key);
        let i = CryptoJS.enc.Utf8.parse(key);

        let decrypted = CryptoJS.AES.decrypt(data, k, {
            iv: i,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        let decryptedUtf8Str = decrypted.toString(CryptoJS.enc.Utf8);
        return decryptedUtf8Str;
    },
    /**
     * RSA加密
     * @param {*} aesKey AES 加密数据
     */
    RSAEncrypt(aesKey) {
        let encrypt = new JSEncrypt();
        encrypt.setPublicKey(process.env.publicKey);
        let aeskey = encrypt.encrypt(aesKey);
        return aeskey;
    },
    /**
     * URL 参数加密
     * @param {*} str 要加密的参数
     */
    UrlEncode(str) {
        return encodeURI(str);
    },
    /**
     * URL 参数解密
     * @param {*} str 要解密的参数
     */
    UrlDecode(str) {
        return decodeURI(str);
    },
    /**
     * MD5加密
     * @param {*} object 要加密的字符
     */
    MD5Encryption(object = "1234567890", isLowerCase = true) {
        if (isLowerCase) {
            return (CryptoJS.MD5(object) + "").toLowerCase();
        } else {
            return (CryptoJS.MD5(object) + "").toUpperCase();
        }
    }
};