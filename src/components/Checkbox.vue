<template>
    <div :class="className">
        <input type="checkbox"
               :id="id"
               :name="name"
               :value="value"                              
               @change="onChange"
               :checked="state"
               :disabled="disabled">
        <label :for="id">
           <span :style="spanStyle">                
            </span>
            <slot></slot>            
        </label>
    </div>
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
                    return 'checkbox-id-' + this._uid;
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
                default: 'nk-checkbox',                
            },
            checked: {
                type: Boolean,
                default: false,
            },                   
            borderColor: {
                type: String,
                default: null
            },
            fillColor: {
                type: String,
                default: null
            },   
            disabled: {
                type: Boolean,
                default: false
            },
            model: {}
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
            },
            spanStyle() {
                let basic = '';

                if (this.borderColor != null && !this.disabled) {
                    basic += 'border-color: ' + this.borderColor + '; ';
                }               

                if (this.fillColor == null || !this.state || this.disabled) {                    
                    return basic;
                }
                                
                return (basic || '') + 'background-color: ' + this.fillColor + '; ';
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
        },
    };
</script>

<style lang="scss">

    $nk-checkbox-size: 20px;
    $nk-main-color: #007FEB;
    $nk-disabled-color: rgba(0, 0, 0, 0.2);
    $nk-line-color: #FFF;

   div.nk-checkbox {
       display: inline-block;

       >input[type="checkbox"] {
            display: none;             
        
            &:checked {
                + label {
                    span {
                        background-color: $nk-main-color;
                        //transform: scale(1.25); // enlarge the box
                    
                        &:after {
                            width: 10px;
                            //background-color: $nk-line-color;
                            transition: width 150ms ease 100ms;
                        }
                    
                        &:before {
                            width: 5px;
                            //background-color: $nk-line-color;
                            transition: width 150ms ease 100ms;
                        }                        
                    }                        
                }            
            }

            &:disabled { 
                + label {    
                    span {
                        background-color: $nk-disabled-color;  
                        border-color: $nk-disabled-color;  
                    }                
                    color: $nk-disabled-color;  
                }                                             
            }
        } 

        >label {
            display: inline-block;         
            cursor: pointer;
            position: relative;        
            padding-right: 6px;  

            span {
                display: inline-block;
                position: relative;                
                width: $nk-checkbox-size;
                height: $nk-checkbox-size;
                transform-origin: center;
                border: 2px solid $nk-main-color;
                border-radius: 24%;            
                vertical-align: -5px;
                margin-right: 6px;
                background-color: transparent;
                transition: background-color 50ms 100ms, transform 350ms cubic-bezier(.78,-1.22,.17,1.89);                 

                &:before {
                    content: "";
                    width: 0px;
                    height: 2px;
                    border-radius: 2px;                 
                    background: $nk-line-color;
                    position: absolute;
                    transform: rotate(45deg);                                
                    top: 8px; 
                    left: 5px; 
                    transition: width 50ms ease 50ms;
                    transform-origin: 0% 0%;                
                }

                &:after {
                    content: "";
                    width: 0; 
                    height: 2px;
                    border-radius: 2px; 
                    background: $nk-line-color;
                    position: absolute;
                    transform: rotate(305deg);                
                    top: 12px; 
                    left: 6px; 
                    transition: width 50ms ease;
                    transform-origin: 0% 0%;
                }    
                
                &:disabled {                          
                    border-color: $nk-disabled-color;
                    background-color: $nk-disabled-color;
                    color: $nk-disabled-color;
                }
            }
            
            &:disabled {                          
                    border-color: $nk-disabled-color;
                    background-color: $nk-disabled-color;
                    color: $nk-disabled-color;
                }
        }      
    }

</style>