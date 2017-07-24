// Vue
import Vue from 'vue';
import NaniKore from '../../src';

Vue.use(NaniKore);

new Vue({
    el: '#app',

    data() {
        return {
            checkboxSwitch: {
                smart: false,            
                food: ['orange']
            }
        }
    },
});

// App
require('./app.scss');
