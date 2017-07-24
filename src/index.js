import CheckboxSwitch from './components/CheckboxSwitch';
import Checkbox from './components/Checkbox';
import Radio from './components/Radio';

export default {
    install (Vue) {        
        Vue.component('checkbox-switch', CheckboxSwitch);
        Vue.component('checkbox', Checkbox);
        Vue.component('radio', Radio);
    }
}

export { CheckboxSwitch, Checkbox, Radio }
