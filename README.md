# vue-nani-kore
> A bucket of magnificent VUE components.

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Latest Version on NPM](https://img.shields.io/npm/v/vue-nani-kore.svg?style=flat-square)](https://npmjs.com/package/vue-nani-kore)
[![npm](https://img.shields.io/npm/dt/vue-nani-kore.svg?style=flat-square)](https://www.npmjs.com/package/vue-nani-kore)

## Working samples

[https://goto10hq.github.io/vue-nani-kore/](https://goto10hq.github.io/vue-nani-kore/)

## Usage

**Checkbox**

```html
<checkbox v-model="result">Are you sure?</checkbox>
```

Parameter | Type | Default value | Note
--------- | ---- | ------------- | ----
checked | `boolean` | `false` | checked flag
class-name | `string` | `null` | css class
disabled | `boolean` | `false` | disabled flag
id | `string` | checkbox-id-(uid) | id of element
name | `string` | `null` | name attribute
v-model | `string` or `array` | `undefined` | model value
value | `string` | `null` | value

**CheckboxSwitch**

```html
<checkbox-switch v-model="food" value="banana">Banana?</checkbox-switch>         
<checkbox-switch v-model="food" value="orange">Orange?</checkbox-switch>         
```

Parameter | Type | Default value | Note
--------- | ---- | ------------- | ----
checked | `boolean` | `false` | checked flag
class-name | `string` | `null` | css class
disabled | `boolean` | `false` | disabled flag
id | `string` | checkbox-switch-id-(uid) | id of element
name | `string` | `null` | name attribute
v-model | `string` or `array` | `undefined` | model value
value | `string` | `null` | value

**Radio**

```html
<radio v-model="question" name="question" value="answer-1">1</radio>
```

Parameter | Type | Default value | Note
--------- | ---- | ------------- | ----
checked | `boolean` | `false` | checked flag
class-name | `string` | `null` | css class
disabled | `boolean` | `false` | disabled flag
id | `string` | radio-id-(uid) | id of element
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