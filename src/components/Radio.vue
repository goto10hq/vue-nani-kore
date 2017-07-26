<template>
    <div :class="className">
        <input type="radio"
               :id="id"
               :name="name"
               :value="value"                              
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
                    return 'radio-id-' + this._uid;
                },
            },
            name: {
                type: String,
                default: null
            },
            value: {
                type: String,
                default: ''
            },
            modelValue: {
                type: String,
                default: undefined
            },
            className: {
                type: String,
                default: 'nk-radio'                
            },
            checked: {
                type: Boolean,
                default: false
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

                return this.modelValue === this.value;
            }
        },
        methods: {
            onChange() {
                this.toggle();
            },

            toggle() {
                this.$emit('input', this.state ? '' : this.value);
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
    }
</script>

<style lang="scss">

    $nk-radio-size: 20px;
    $nk-main-color: #007FEB;

   .nk-radio {
       display: inline-block;

       >input[type="radio"] {
            display: none;             
        
            &:checked {
                + label {
                    span {
                        background-color: $nk-main-color;                               
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
            padding-right: 6px;      

            span {
                display: inline-block;
                position: relative;
                background-color: transparent;
                width: $nk-radio-size;
                height: $nk-radio-size;
                transform-origin: center;
                border: 2px solid $nk-main-color;
                border-radius: 50%;
                vertical-align: -5px;
                margin-right: 6px;                

                &:before {
                    content: "";
                    width: 5px;
                    height: 5px;                    
                    background: #FFF;
                    position: absolute;                    
                    top: 5px; 
                    left: 6px; 
                    border: 0px solid #FFF;
                    transition: border-width 50ms ease;
                    transform-origin: center;
                    border-radius: 50%;
                                                        
                }

                &:after {
                    content: "";
                    width: 5px;
                    height: 5px;                    
                    background: #FFF;
                    position: absolute;                    
                    top: 5px; 
                    left: 5px; 
                    border: 3px solid #FFF;
                    transition: border-width 50ms ease;
                    transform-origin: center;
                    border-radius: 50%;                      
                }    
                
                &:disabled {                          
                    border-color: rgba(0, 0, 0, 0.2);            
                    background-color: rgba(0, 0, 0, 0.2);                
                    color: rgba(0, 0, 0, 0.2);                
                }
            }
            
            &:disabled {                          
                    border-color: rgba(0, 0, 0, 0.2);            
                    background-color: rgba(0, 0, 0, 0.2);                
                    color: rgba(0, 0, 0, 0.2);                    
                }
        }      
    }

</style>