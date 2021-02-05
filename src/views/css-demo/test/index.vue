<template>
    <div class="main">
        <div class="button">
            <a><span>Members Login</span></a>
        </div>
        <div class="text">
            <span>Home</span>
        </div>
        <div class="rotate">
        </div>
        <div class="width">
        </div>

        <div class="moveblock"></div>
    </div>
</template>

<script>
    export default {
        name: "csstest"
    }
</script>

<style scoped>
    .main {
        height: 800px;
        background-size: 100% 100%;
        margin-left: 100px;
    }

    .button a {
        background-color: transparent;
        border: solid rgba(97, 101, 250, 1) 1px;
        cursor: pointer !important;
        transition: border-color 0.4s ease 0s, background-color 0.4s ease 0s;
        border-radius: 100px;
    }

    .button a:hover {
        background-color: rgba(97, 101, 250, 1);
        border-color: transparent;
    }

    .button a:hover span {
        color: #181818;
    }

    .button a span {
        font: normal normal normal 15px/1.875em helvetica-w01-roman, helvetica-w02-roman, helvetica-lt-w10-roman, sans-serif;
        transition: color 0.4s ease 0s;
        color: #6165FA;
        display: inline-block;
        margin: calc(-1 * 1px) 1px 0;
        position: relative;
        white-space: nowrap;
    }

    .text {
        background: black;
        cursor: pointer;
    }

    .text span {
        transition: color 0.4s ease 0s;
        color: #FFFFFF;
    }

    .text span:hover {
        color: #243E85;
        /*transition: color 0.4s ease 0s;*/
    }

    .moveblock {
        width:50px;
        height:400px;
        margin:0 auto;
        background-size:60px 60px;
        background-image:linear-gradient(135deg,red 0%,red 25%,white 25%,white 50%,red 50%,red 75%,white 75%,white 100%);
        animation:move 1s linear infinite;
    }
    @keyframes move {
        0% {
        }100% {
             background-position:60px 0;
         }
    }

    .rotate {
        width: 100px;
        height: 100px;
        background: #409EFF;
        transition: transform 0.5s ease 0s;
    }

    .rotate:hover {
        transform: rotate(45deg);
    }

    .width {
        width: 100px;
        height: 100px;
        background: #409EFF;
        transition: width 0.5s ease 0s;
    }

    .width:hover {
        width: 500px;
    }

</style>
