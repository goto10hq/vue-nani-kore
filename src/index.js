import CheckboxSwitch from './components/CheckboxSwitch';
import Checkbox from './components/Checkbox';
import Radio from './components/Radio';
import Alert from './components/Alert';
import Notify from './components/Notify';
import Uploader from './components/Uploader';

export default {
    install (Vue) {        
        Vue.component('checkbox-switch', CheckboxSwitch);
        Vue.component('checkbox', Checkbox);
        Vue.component('radio', Radio);
        Vue.component('alert', Alert);
        Vue.component('notify', Notify);
        Vue.component('uploader', Uploader);
    }
}

export { CheckboxSwitch, Checkbox, Radio, Alert, Notify, Uploader }
