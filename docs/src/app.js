import Vue from 'vue';
import VueHighlightJS from 'vue-highlightjs'
import NaniKore from '../../src';
import VueLazyload from 'vue-lazyload'

Vue.use(NaniKore);
Vue.use(VueHighlightJS);
Vue.use(VueLazyload, {        
        //error: '/blob/error.png',
        loading: 'blob/loading.gif',
        attempt: 1,
        listenEvents: [ 'scroll' ]
    })

const bus = new Vue();

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
                question: null,
                bool: null
            },
            alert: {
                closed: false,
                closed2: false,
                alerts: [],
                errors: { isValid: false, errors: [ { key: "email", value: "Invalid email." }, { key: "iq", value: "Too low iq." } ] },
                errors2: { message: "Errors:", errors: [ { field: "email", message: "Invalid email." }, { field: "iq", message: "Too low iq." } ] },
                errors3: { message: "Oh noes!", errors: null },
                errors4: { errors: [ { key: "email", value: "Invalid email again." }, { key: "iq", value: "Too low iq again." } ] },
            },
            bus: bus,
            notify: {
                method: 'first',
                position: 'top-right'
            },
            uploader: {
                alerts: [],
                files: [{ id: 1, file: 'a.jpg', size: 216000, server: 'blob/' }, { id: 2, file: 'b.jpg', size: 110175, server: 'blob/' }]                
            },
            loadingTypes: [ 'double-bounce', 'jumping-square', 'rotating-square' ], 
            loading: {
                loadingType: 'jumping-square',
                globalDisable: false,
                overElement: true,
                full: false
            },
            typeahead: {                
                data: [                    
                    { name: 'Aoba' },
                    { name: 'Hifumi' },
                    { name: 'Hvížďalka' },
                    { name: 'Nenecchi' },
                    { name: 'Rin' },
                    { name: 'Umiko' },                
                ],
                firstText: { name: 'Aoba' },
                secondText: 'frohikey'                
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
            try {
                JSON.parse(str);
                this.uploader.alerts.push({ id: new Date().getTime(), type: 'danger', errors: errors, message: null });
            } catch (e) {
                this.uploader.alerts.push({ id: new Date().getTime(), type: 'danger', errors: { "isValid": false, "errors": [ { "key": "_", "value": errors } ] }, message: null });
            }            
        },
        uploaderErrorMaxFilesExceeded(file) {
            this.uploader.alerts.push({ id: new Date().getTime(), type: 'danger', errors: null, message: 'Uploading of file ' + file.name + ' aborted. Max number of files would be exceeded.' });
        },
        uploaderFilesOrderChanged(files) {            
            this.uploader.alerts.push({ id: new Date().getTime(), type: 'success', errors: null, message: 'Order changed.' });            
        },
        fullscreenLoading() {
            let self = this;
            self.loading.full = true;
            self.loading.globalDisable = true;
            setTimeout(() => {
                self.loading.full = false;
                self.loading.globalDisable = false;
            }, 5000);
        }
    }   
});

