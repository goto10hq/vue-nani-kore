# vue-nani-kore
> A bucket of magnificent VUE components.

Components can be rendered as standalone one with no CSS dependencies. But most of them are (will be) based on Bootstrap 3.x.

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Latest Version on NPM](https://img.shields.io/npm/v/vue-nani-kore.svg?style=flat-square)](https://npmjs.com/package/vue-nani-kore)
[![npm](https://img.shields.io/npm/dt/vue-nani-kore.svg?style=flat-square)](https://www.npmjs.com/package/vue-nani-kore)

## Working samples

[https://goto10hq.github.io/vue-nani-kore/](https://goto10hq.github.io/vue-nani-kore/)

## Usage

**Alert**

```html
<alert :closable="true" type="info" :duration="3000" @close="open = false">Hello world.</alert>
```

Parameter | Type | Default value | Note
--------- | ---- | ------------- | ----
class-name | `string` | `null` | css class (overwriting autogenerated class by `type`)
closable | `boolean` | `false` | render closing button
duration | `int` (ms) | `0` | when set to number > 0 then alert is auto closed after a given time 
errors | `object` | `null` | special case for displaying errors (internal usage)
id | `string` | `alert-id-{uid}` | id of element
type | `string` | `success` | Bootstrap alert type, CSS class is auto generated as `alert alert-{type}`

Special slot for "closing content": `<span slot="close">#</span>`

**Checkbox**

```html
<checkbox v-model="result">Are you sure?</checkbox>
```

Parameter | Type | Default value | Note
--------- | ---- | ------------- | ----
border-color | `string` | `null` | border color
checked | `boolean` | `false` | checked flag
class-name | `string` | `nk-checkbox` | css class
disabled | `boolean` | `false` | disabled flag
fill-color | `string` | `null` | fill color (checked state)
id | `string` | `checkbox-id-{uid}` | id of element
name | `string` | `null` | name attribute
v-model | `string` or `array` | `undefined` | model value
value | `string` | `null` | value

**CheckboxSwitch**

```html
<checkbox-switch v-model="food" value="banana">Banana?</checkbox-switch>               
```

Parameter | Type | Default value | Note
--------- | ---- | ------------- | ----
checked | `boolean` | `false` | checked flag
class-name | `string` | `nk-checkbox-switch` | css class
disabled | `boolean` | `false` | disabled flag
id | `string` | `checkbox-switch-id-{uid}` | id of element
name | `string` | `null` | name attribute
v-model | `string` or `array` | `undefined` | model value
value | `string` | `null` | value

**Notify**

```html
<notify type="info" :event-bus="bus">
    <template slot="content" scope="{data}">
        <div>              
        <h4>{{ data.title }}</h4>
        <p>{{ data.text }}</p>                
        </div>
    </template>
</notify>
```

Parameter | Type | Default value | Note
--------- | ---- | ------------- | ----
class-name | `string` | `null` | css class (overwriting autogenerated class by `type`)
closable | `boolean` | `false` | render closing button
duration | `int` (ms) | `0` | when set to number > 0 then alert is auto closed after a given time 
event-bus | `object` | `null` | instance of event bus
event-hide | `string` | `show-notification` | name of event for showing one notification
event-show | `string` | `hide-notifications` | name of event for hiding all notifications
id | `string` | `notify-id-{uid}` | id of element (container)
method | `string` | `first` | method of adding new notifications (`first`, `last`)
position | `string` | `top-center` | position of notifications (`top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`)
type | `string` | `success` | Bootstrap alert type, CSS class is auto generated as `alert alert-{type}`
width | `int` (px) | `350` | width of one notification

**Radio**

```html
<radio v-model="question" name="question" value="answer-1">1</radio>
```

Parameter | Type | Default value | Note
--------- | ---- | ------------- | ----
border-color | `string` | `null` | border color
checked | `boolean` | `false` | checked flag
class-name | `string` | `nk-radio` | css class
disabled | `boolean` | `false` | disabled flag
fill-color | `string` | `null` | fill color (checked state)
id | `string` | `radio-id-{uid}` | id of element
name | `string` | `null` | name attribute
v-model | `string` or `array` | `undefined` | model value
value | `string` | `null` | value

## Install

npm

```bash
npm install vue-nani-kore --save
```

## Setup

Register the plugin

```js
import NaniKore from 'vue-nani-kore';
Vue.use(NaniKore);
```

Or register particular components manually

```js
import {CheckboxSwitch} from 'vue-nani-kore';
Vue.component('checkbox-switch', CheckboxSwitch);
```

## License

MIT © [Joey Frohikey](https://github.com/frohikey)