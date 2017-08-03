import Vue from 'vue';
import VueHighlightJS from 'vue-highlightjs'
import NaniKore from '../../src';

Vue.use(NaniKore);
Vue.use(VueHighlightJS);

const bus = new Vue();

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
                sure: false,
                clever: true
            },
            radio: {
                question: null
            },
            alert: {
                closed: false,
                closed2: false,
                alerts: [],
                errors: { "isValid": false, "errors": [ { "key": "email", "value": "Invalid email." }, { "key": "iq", "value": "Too low iq." } ] }
            },
            bus: bus,
            notify: {
                method: 'first',
                position: 'top-right'
            }
        }
    },    
    methods: {
        addAlert () {        
            this.alert.alerts.push({ id: new Date().getTime() })        
        },
        notifyMe() {            
            this.bus.$emit('show-notification', { closable: true, data: { title: 'Important message', text: 'Hello, people of Earth. My cosmic watch shows: ' + new Date().getTime() }})
        }
    }
});

// App
require('./app.scss');
