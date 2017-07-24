<template>
    <label class="switch">
        <input :id="id" :class="className" type="checkbox" @change="onChange" :checked="state" :name="name" :disabled="disabled">                       
        <span><slot></slot></span>
    </label>
</template>

<script> 
    export default {
         model: {
            prop: 'modelValue',
            event: 'input'
        },

        props: {
            id: {
                type: String,
                default: function () {
                    return 'checkbox-switch-id-' + this._uid;
                },
            },
            name: {
                type: String,
                default: null,
            },
            value: {
                type: String,
                default: null,
            },
            modelValue: {
                type: String | Array,
                default: undefined,
            },
            className: {
                type: String,
                default: null,
            },
            checked: {
                type: Boolean,
                default: false,
            },
            required: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false
            },
            model: {                
            }
        },

        computed: {
            state () {
                if (this.modelValue === undefined) {
                    return this.checked;
                }

                if (Array.isArray(this.modelValue)) {
                    return this.modelValue.indexOf(this.value) > -1;
                }

                return !!this.modelValue;
            }
        },

        methods: {
            onChange() {
                this.toggle();
            },

            toggle() {
                let value;

                if (Array.isArray(this.modelValue)) {
                    value = this.modelValue.slice(0);

                    if (this.state) {
                        value.splice(value.indexOf(this.value), 1);
                    } else {
                        value.push(this.value);
                    }
                } else {
                    value = !this.state;
                }

                this.$emit('input', value);
            }
        },

        watch: {
            checked(newValue) {
                if (newValue !== this.state) {
                    this.toggle();
                }
            }
        },

        mounted() {
            if (this.checked && !this.state) {
                this.toggle();
            }
        }
    }
</script>

<style lang="scss">
    label.switch {
        input[type="checkbox"] {
            display: none;             
            &:checked {
                + span {
                    &:before {
                        background-color: rgba(#007FEB, 0.5);
                    }
                    &:after {
                        background-color: #007FEB;
                        transform: translate(80%, -50%);
                    }
                }
            }
             &:disabled {
                + span {                    
                    color: rgba(0, 0, 0, 0.2);
                
                    &:before {
                        background-color: rgba(0, 0, 0, 0.2);
                    }
                    &:after {
                        background-color: #EEE;
                        transform: translate(80%, -50%);
                    }
                }
            }
            + span {                
                position: relative;
                display: inline-block;
                cursor: pointer;
                font-weight: 500;
                text-align: left;
                margin: 0px;
                padding: 0px 44px;                
                &:before,
                &:after {
                    content: '';
                    cursor: pointer;
                    position: absolute;
                    margin: 0;
                    outline: 0;
                    top: 50%;
                    transform: translate(0, -50%);
                    transition: all 200ms ease-out;
                }
                &:before {
                    left: 1px;
                    width: 34px;
                    height: 14px;
                    background-color: rgba(0, 0, 0, 0.2);
                    border-radius: 8px;
                }
                &:after {
                    left: 0;
                    width: 20px;
                    height: 20px;
                    background-color: rgba(0, 0, 0, 0.5);
                    border-radius: 50%;
                    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .14), 0 2px 2px 0 rgba(0, 0, 0, .098), 0 1px 5px 0 rgba(0, 0, 0, .084);
                }                           
            }
            &:checked + span &:after {
                transform: translate(80%, -50%);
            }          
        }            
    }
</style>
