<template>
    <div class="container">
        <div class="st-container">
          <input type="radio" name="radio-set" checked="checked" id="st-control-1"/>
          <a href="#st-panel-1">Serendipity</a>
          <input type="radio" name="radio-set" id="st-control-2"/>
          <a href="#st-panel-2">Happiness</a>
          <input type="radio" name="radio-set" id="st-control-3"/>
          <a href="#st-panel-3">Tranquility</a>
          <input type="radio" name="radio-set" id="st-control-4"/>
          <a href="#st-panel-4">Positivity</a>
          <input type="radio" name="radio-set" id="st-control-5"/>
          <a href="#st-panel-5">Passion</a>

          <div class="st-scroll">
            <section class="st-panel" id="st-panel-1">
              <div class="st-desc" data-icon="S">
              </div>
              <h2>Serendipity</h2>
              <p>Serendipity Content</p>
            </section>
          </div>
          <div class="st-scroll">
            <section class="st-panel st-color" id="st-panel-2">
              <div class="st-desc" data-icon="H">
              </div>
              <h2>Happiness</h2>
              <p>Happiness Content</p>
            </section>
          </div>
          <div class="st-scroll">
            <section class="st-panel" id="st-panel-3">
              <div class="st-desc" data-icon="T">
              </div>
              <h2>Tranquility</h2>
              <p>Tranquility Content</p>
            </section>
          </div>
          <div class="st-scroll">
            <section class="st-panel st-color" id="st-panel-4">
              <div class="st-desc" data-icon="P">
              </div>
              <h2>Positivity</h2>
              <p>Positivity Content</p>
            </section>
          </div>
          <div class="st-scroll">
            <section class="st-panel" id="st-panel-5">
              <div class="st-desc" data-icon="P">
              </div>
              <h2>Passion</h2>
              <p>Passion Content</p>
            </section>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Radio制作导航"
    }
</script>

<style scoped>

  .container {
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .st-container {
    height: 100%;
  }

  .st-container input, a {
    width: 20%;
    height: 34px;
    line-height: 34px;
    /*底对齐，永远处在页面最底部*/
    position: absolute;
    bottom: 0;
  }

  .st-container input {
    /*隐藏元素的方法*/
    /*隐藏不占位*/
    /*display: none;*/

    /*隐藏占位*/
    /*visibility: hidden;*/
    opacity: 0.1;
    z-index: 1000;
    cursor: pointer;
  }

  .st-container a {
    z-index: 10;
    font-weight: 700;
    font-size: 16px;
    background: #e23a6e;
    text-align: center;
    color: #fff;
    text-shadow: 1px 1px 1px rgba(151, 24 ,64, 0.2);

  }

  /*它和它后面的a*/
  #st-control-1, #st-control-1 + a {
    left: 0%;
  }
  #st-control-2, #st-control-2 + a {
    left: 20%;
  }
  #st-control-3, #st-control-3 + a {
    left: 40%;
  }
  #st-control-4, #st-control-4 + a {
    left: 60%;
  }
  #st-control-5, #st-control-5 + a {
    left: 80%;
  }

  /*需要通过input控制a来变化*/
  .st-container input:checked + a,
  .st-container input:checked:hover + a{
    background: #821134;
  }

  /*画三角形*/
  .st-container input:checked + a:after {
    content: "";
    width: 0;
    height: 0;
    overflow: hidden;
    border: 20px solid transparent;
    border-bottom-color: #821134;
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -20px;
  }

  .st-container input:hover + a {
    background: #ad244f;
  }
  /*占满屏幕*/
  .st-scroll, .st-panel {
    width: 100%;
    height: 100%;
    position: relative;
  }
  /*5个页面都在st-scroll里面，其他的在下面不可见，点击按钮后通过上下平移st-scroll来显示其他页面*/
  .st-scroll {
    top: 0;
    left: 0;
    /*平移*/
    -webkit-transform: translate3d(0,0,0);
    /*定义当元素不面向屏幕是是否可见*/
    -webkit-backface-visibility: hidden;
    /*动画*/
    -webkit-transition: all 0.6s ease-in-out;
  }

  .st-panel {
    background: #fff;
    overflow: hidden;
  }

  #st-control-1:checked ~ .st-scroll {
    -webkit-transform: translateY(0%);
  }

  #st-control-2:checked ~ .st-scroll {
    -webkit-transform: translateY(-100%);
  }

  #st-control-3:checked ~ .st-scroll {
    -webkit-transform: translateY(-200%);
  }

  #st-control-4:checked ~ .st-scroll {
    -webkit-transform: translateY(-300%);
  }

  #st-control-5:checked ~ .st-scroll {
    -webkit-transform: translateY(-400%);
  }

  .st-desc {
    width: 200px;
    height: 200px;
    background: #fa96b5;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -100px;
    -webkit-transform: translateY(-50%) rotate(45deg);
  }

  [data-icon]:after {
    content: attr(data-icon);
    width: 200px;
    height: 200px;
    /*background: #0f0;*/
    color: #fff;
    font-size: 90px;
    text-align: center;
    line-height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -100px 0 0 -100px;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg) translateY(25%);
  }

  .st-panel h2 {
    color: #e23a6e;
    font-size: 54px;
    line-height: 50px;
    text-align: center;
    font-weight: 900;
    position: absolute;
    width: 80%;
    top: 50%;
    left: 10%;
    margin-top: -100px;
    text-shadow: 1px 1px 1px rgba(151, 24, 64, 0.2);
  }

  /*#st-control-1:checked ~ .st-scroll #st-panel1 h2,*/
  /*#st-control-2:checked ~ .st-scroll #st-panel2 h2,*/
  /*#st-control-3:checked ~ .st-scroll #st-panel3 h2,*/
  /*#st-control-4:checked ~ .st-scroll #st-panel4 h2,*/
  /*#st-control-5:checked ~ .st-scroll #st-panel5 h2 {*/
    /*-webkit-animation: moveDown 2.6s ease-in-out 0.3s backwards;*/
  /*}*/

  /*@-webkit-keyframes moveDown {*/
    /*0% {*/
      /*-webkit-transform: translateY(-40px);*/
      /*opacity: 0;*/
    /*}*/
    /*100% {*/
      /*-webkit-transform: translateY(0px);*/
      /*opacity: 1;*/
    /*}*/
  /*}*/

  .st-panel p {
    position: absolute;
    width: 50%;
    top: 50%;
    left: 25%;
    font-size: 22px;
    line-height: 22px;
    text-align: center;
    color: #8b8b8b;
  }
</style>
