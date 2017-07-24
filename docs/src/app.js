require('bootstrap-loader');
import Vue from 'vue';
import NaniKore from '../../src';

Vue.use(NaniKore);

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
    },
});

// App
require('./app.scss');
