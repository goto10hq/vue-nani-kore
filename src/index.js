import CheckboxSwitch from './components/CheckboxSwitch';
import Checkbox from './components/Checkbox';
import Radio from './components/Radio';
import Alert from './components/Alert';
import Notify from './components/Notify';
import Uploader from './components/Uploader';
import Loading from './components/Loading';
import Typeahead from './components/Typeahead';

export default {
    install (Vue) {        
        Vue.component('checkbox-switch', CheckboxSwitch);
        Vue.component('checkbox', Checkbox);
        Vue.component('radio', Radio);
        Vue.component('alert', Alert);
        Vue.component('notify', Notify);
        Vue.component('uploader', Uploader);
        Vue.component('loading', Loading);
        Vue.component('typeahead', Typeahead);
    }
}

export { CheckboxSwitch, Checkbox, Radio, Alert, Notify, Uploader, Loading, Typeahead }
