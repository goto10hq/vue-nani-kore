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
            },
            uploader: {
                errors: [],
                files: [{ id: 1, file: 'a.jpg', size: 216000, server: 'blob/' }, { id: 2, file: 'b.jpg', size: 110175, server: 'blob/' }]
            }
        }
    },    
    methods: {
        addAlert () {        
            this.alert.alerts.push({ id: new Date().getTime() })        
        },
        notifyMe() {            
            this.bus.$emit('show-notification', { closable: true, data: { title: 'Important message', text: 'Hello, people of Earth. My cosmic watch shows: ' + new Date().getTime() }})
        },
        deleteFile(id) {
            let idx = this.uploader.files.findIndex((x) => { return x.id == id; });            
            
            if (idx >= 0) {
                this.uploader.files.splice(idx, 1);
            }
        },
        uploaderError(errors) {
            this.uploader.errors.push({ id: new Date().getTime(), errors: errors })                    
        }
    }
});

// App
require('./app.scss');
