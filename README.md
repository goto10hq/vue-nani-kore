# vue-nani-kore
> A bucket of Vue magnificent VUE components.

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

**CheckboxSwitch**

```html
<checkbox-switch v-model="food" value="banana">Banana?</checkbox-switch>         
<checkbox-switch v-model="food" value="orange">Orange?</checkbox-switch>         
```

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