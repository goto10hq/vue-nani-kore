require('bootstrap-loader');
import Vue from 'vue';
import VueHighlightJS from 'vue-highlightjs'
import NaniKore from '../../src';

Vue.use(NaniKore);
Vue.use(VueHighlightJS);

import 'highlight.js/styles/default.css'

new Vue({
    el: '#app',

    data() {
        return { 
            checkboxSwitch: {
                disabler: false,            
                food: ['orange'],
                lastOne: true
            },
            checkbox: {
                sure: false
            }
        }
    }    
});

// App
require('./app.scss');
