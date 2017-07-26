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
            },
            radio: {
                question: null
            },
            alert: {
                closed: false,
                closed2: false,
                alerts: [],
                errors: { "isValid": false, "errors": [ { "key": "email", "value": "Invalid email." }, { "key": "iq", "value": "Too low iq." } ] }
            }
        }
    },    
    methods: {
        addAlert () {        
          this.alert.alerts.push({ id: new Date().getTime() })        
      }
    }
});

// App
require('./app.scss');
