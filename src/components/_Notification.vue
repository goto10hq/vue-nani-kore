<template>
    <transition :enter-active-class="animationClassIn" :leave-active-class="animationClassOut">
        <div v-if="show" :class="[ alertClass, 'nk-notify', position ]" :style="{ width: width + 'px' }">
            <button type="button" class="close" aria-label="Close" v-if="closable" @click="closeNotification">
                <span aria-hidden="true"><slot name="close">&times;</slot></span>
            </button>
            <slot name="content"></slot>                              
        </div>
    </transition>
</template>
<script>
    export default {
        props: {
            closable: {
                type: Boolean,
                default: false
            },                        
            content: {},
            duration: {
                type: Number,
                default: 5000
            },            
            type: {
                type: String,
                default: 'success'
            },
            className: {
                type: String,
                default: null
            },            
            width: {
                type: Number,
                default: 350
            },
            position: {
                type: String,
                default: 'top-center'
            }
        },
        data(){
            return {
                timeout: 0,
                show: true
            }
        },
        computed: {
            alertClass() {
                if (this.className != null) {
                    return this.className;
                }
                return `alert alert-${this.type}`;
            },
            animationClassIn() {
                let prefix = 'animated quick ';
                switch(this.position) {
                    case 'top-center': return prefix + 'fadeInDown';
                    case 'top-left': return prefix + 'fadeInLeft';
                    case 'top-right': return prefix + 'fadeInRight';
                    case 'bottom-left': return prefix + 'fadeInLeft';
                    case 'bottom-center': return prefix + 'fadeInUp';
                    case 'bottom-right': return prefix + 'fadeInRight';
                }
            },
            animationClassOut() {
                let prefix = 'animated quick ';
                switch(this.position) {
                    case 'top-center': return prefix + 'fadeOutDown';
                    case 'top-left': return prefix + 'fadeOutLeft';
                    case 'top-right': return prefix + 'fadeOutRight';
                    case 'bottom-left': return prefix + 'fadeOutLeft';
                    case 'bottom-center': return prefix + 'fadeOutUp';
                    case 'bottom-right': return prefix + 'fadeInRight';
                }
            }
        },
        methods: {
            closeNotification() {                                
                clearTimeout(this.timeout);
                this.$emit('close-notification');                
            }
        },        
        mounted () {
            if (this.duration > 0) {
                this.timeout = setTimeout(this.closeNotification, this.duration);
            }
        },
        destroyed () {
            clearTimeout(this.timeout);
        }
    }
</script>
<style lang="scss">
    .nk-notify {
        position: relative;
        z-index: 9999;        
        
        &.alert {
            margin-bottom: 2px;
        }

        .close {            
            z-index: 2;
        }

        &.top-right {
            margin-top: 0;
            top: 2px;
            right: 5px;
        }

        &.top-center {
            margin-top: 0;
            top: 2px;
        }

        &.top-left {
            margin-top: 0;
            top: 2px;
            left: 5px;
        }

         &.bottom-right {            
            bottom: 2px;
            right: 5px;
        }

        &.bottom-center {                  
            bottom: 2px;
        }

        &.bottom-left {            
            bottom: 2px;
            left: 5px;
        }
    }   
</style>