<template>
    <div class="nk-checkbox">
        <input type="checkbox"
               :id="id"
               :name="name"
               :value="value"
               :class="className"
               :required="required"
               @change="onChange"
               :checked="state"
               :disabled="disabled">
        <label :for="id">
            <span>                
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

   .nk-checkbox {
       >input[type="checkbox"] {
            display: none;             
        
            &:checked {
                + label {
                    span {
                        background-color: $nk-main-color;
                        //transform: scale(1.25); // enlarge the box
                    
                        &:after {
                            width: 10px;
                            background: #FFF;
                            transition: width 150ms ease 100ms; // enlarge the tick
                        }
                    
                        &:before {
                            width: 5px;
                            background: FFF;
                            transition: width 150ms ease 100ms; // enlarge the tick
                        }                        
                    }                        
                }            
            }

            &:disabled { 
                + label {    
                    span {
                        background-color: rgba(0, 0, 0, 0.2);  
                        border-color: rgba(0, 0, 0, 0.2);  
                    }                
                    color: rgba(0, 0, 0, 0.2);  
                }                                             
            }
        } 

        > label {
            display: inline-block;         
            cursor: pointer;
            position: relative;          

            span {
                display: inline-block;
                position: relative;
                background-color: transparent;
                width: $nk-checkbox-size;
                height: $nk-checkbox-size;
                transform-origin: center;
                border: 2px solid $nk-main-color;
                border-radius: 50%;
                vertical-align: -5px;
                margin-right: 6px;
                transition: background-color 50ms 100ms, transform 350ms cubic-bezier(.78,-1.22,.17,1.89); 

                &:before {
                    content: "";
                    width: 0px;
                    height: 2px;
                    border-radius: 2px;                 
                    background: #fff;
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
                    background: #fff;
                    position: absolute;
                    transform: rotate(305deg);                
                    top: 12px; 
                    left: 6px; 
                    transition: width 50ms ease;
                    transform-origin: 0% 0%;
                }    
                
                &:disabled {                          
                    border-color: rgba(0, 0, 0, 0.2);            
                    background-color: rgba(0, 0, 0, 0.2);                
                    color: rgba(0, 0, 0, 0.2);

                    // &:before {
                    //     background-color: #EEE;
                    //     transform: translate(80%, -50%);
                    // }                
                    // &:after {
                    //     background-color: #EEE;
                    //     transform: translate(80%, -50%);
                    // }                
                }
            }
            
            &:disabled {                          
                    border-color: rgba(0, 0, 0, 0.2);            
                    background-color: rgba(0, 0, 0, 0.2);                
                    color: rgba(0, 0, 0, 0.2);

                    // &:before {
                    //     background-color: #EEE;
                    //     transform: translate(80%, -50%);
                    // }                
                    // &:after {
                    //     background-color: #EEE;
                    //     transform: translate(80%, -50%);
                    // }                
                }
        }      
    }

</style>