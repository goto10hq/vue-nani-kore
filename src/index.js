import CheckboxSwitch from './components/CheckboxSwitch';
import Checkbox from './components/Checkbox';
import Radio from './components/Radio';
import Alert from './components/Alert';

export default {
    install (Vue) {        
        Vue.component('checkbox-switch', CheckboxSwitch);
        Vue.component('checkbox', Checkbox);
        Vue.component('radio', Radio);
        Vue.component('alert', Alert);
    }
}

export { CheckboxSwitch, Checkbox, Radio }
