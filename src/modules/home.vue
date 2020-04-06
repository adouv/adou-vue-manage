<template>
  <div class="page ad-home">
    <div class="page-content">
      <div class="panel system-info">
        <div>
          <div class="media position-relative ad-info">
            <img
              src="http://cdn.admui.com/demo/iframe/2.1.0/images/avatar.svg"
              class="mr-3"
              alt="..."
            />
            <div class="media-body">
              <h5 class="mt-0">欢迎 ADOUV 登录 梦橙 通用管理系统</h5>
              <p>梦橙系统已全面升级，您现在使用的是全新 NET.SQL v3.1.2 版本</p>
              <p>梦橙系统 是一个基于最新 Web 技术的企业级通用管理系统，可以帮助企业极大的提高工作效率，节省开发成本，提升品牌形象。</p>
              <p>
                如果您有何疑问、系统漏洞和不足之处，请点击右边的
                <a href="javascript:void(0);" target="_blank" class="stretched-link">在线客服</a>进行咨询。
              </p>
              <a href="javascript:void(0);" target="_blank" class="stretched-link">官网连接</a>
            </div>
          </div>
        </div>
      </div>
      <div class="panel system-info min-system-info">
        <div class="card">
          <img
            src="http://cdn.admui.com/demo/iframe/2.1.0/images/avatar.svg"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="mt-0">欢迎 ADOUV 登录 橙子 通用管理系统</h5>
            <p>橙子系统已全面升级，您现在使用的是全新 NET.SQL v3.1.2 版本</p>
            <p>橙子 是一个基于最新 Web 技术的企业级通用管理系统，可以帮助企业极大的提高工作效率，节省开发成本，提升品牌形象。</p>
            <p>如果您有何疑问、系统漏洞和不足之处，请点击右边的在线客服进行咨询。</p>
            <a href="javascript:void(0);" target="_blank" class="stretched-link">官网连接</a>
          </div>
        </div>
      </div>
      <div class="row part-info">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xlg-2">
          <div class="panel">
            <div class="panel-body text-center">
              <div class="part-desc">
                <img src="http://cdn.admui.com/demo/iframe/2.1.0/images/home/ui.svg" />
                <h4>个人信息</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xlg-2">
          <div class="panel">
            <div class="panel-body text-center">
              <div class="part-desc">
                <img src="http://cdn.admui.com/demo/iframe/2.1.0/images/home/page.svg" />
                <h4>布局管理</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xlg-2">
          <div class="panel">
            <div class="panel-body text-center">
              <div class="part-desc">
                <img src="http://cdn.admui.com/demo/iframe/2.1.0/images/home/table.svg" />
                <h4>备忘录</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xlg-2">
          <div class="panel">
            <div class="panel-body text-center">
              <div class="part-desc">
                <img src="http://cdn.admui.com/demo/iframe/2.1.0/images/home/form.svg" />
                <h4>消息管理</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xlg-2">
          <div class="panel">
            <div class="panel-body text-center">
              <div class="part-desc">
                <img src="http://cdn.admui.com/demo/iframe/2.1.0/images/home/chart.svg" />
                <h4>数据统计</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xlg-2">
          <div class="panel">
            <div class="panel-body text-center">
              <div class="part-desc">
                <img src="http://cdn.admui.com/demo/iframe/2.1.0/images/home/setting.svg" />
                <h4>系统配置</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdHomeComponent"
};
</script>

<style lang="scss" scoped>
.ad-home {
  .system-info {
    padding: 20px;
    &.min-system-info {
      display: none;
    }
    .card {
      border: none;
    }
    img {
      width: 120px;
      height: 120px;
      margin: 0 auto;
    }
    h5 {
      font-size: 15px;
      padding-bottom: 10px;
      color: #333;
    }
    p {
      font-size: 12px;
      color: #666;
    }
    .stretched-link {
      font-size: 12px;
    }
  }
  .part-info {
    > div {
      .panel-body {
        padding: 25px;
        text-align: center;
        cursor: pointer;
        .part-desc {
          img {
            width: 80%;
            height: 100px;
          }
          h4 {
            font-size: 15px;
            padding-top: 40px;
            color: #333;
          }
        }
      }
    }
  }
}
@media (max-width: 700px) {
  .ad-home {
    .system-info {
      display: none;
      &.min-system-info {
        display: block;
      }
    }
  }
}
</style>