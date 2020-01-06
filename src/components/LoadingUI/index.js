import Vue from 'vue'
import LoadingComponent from './loadingui.vue'

const messageBox = Vue.extend(LoadingComponent)
console.log('loadingui')
Message.install = function (options, type) {
    if (options === undefined || options === null) {
        options = {
            content: ''
        }
    } else if (typeof options === 'string' || typeof options === 'number') {
        options = {
            content: options
        }
        if (type != undefined && options != null) {
            options.type = type;
        }
    }

    let instance = new messageBox({
        data: options
    }).$mount()

    document.body.appendChild(instance.$el)

    Vue.nextTick(() => {
        instance.visible = true
    })
}

export default LoadingComponent
