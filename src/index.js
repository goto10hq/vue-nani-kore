import CheckboxSwitch from './components/CheckboxSwitch';
import Checkbox from './components/Checkbox';

export default {
    install (Vue) {        
        Vue.component('checkbox-switch', CheckboxSwitch);
        Vue.component('checkbox', Checkbox);
    }
}

export { CheckboxSwitch, Checkbox }
