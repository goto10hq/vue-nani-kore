<template>
    <transition enter-active-class="animated quick fadeInRight" leave-active-class="animated quick fadeOutRight">
        <div v-if="show" :class="[alertClass, 'nk-notify-me']" :style="{ width: width + 'px' }">
            <button type="button" class="close" aria-label="Close" v-if="closable" @click="closeNotification">
                <span aria-hidden="true"><slot name="close">&times;</slot></span>
            </button>
            <slot name="content"></slot>   
            {{ closable }}                        
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
                default: 0
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
            }
        },
        data(){
            return {
                show:true
            }
        },
        computed: {
            alertClass () {
                if (this.className != null) {
                    return this.className;
                }
                return `alert alert-${this.type}`;
            },
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
<style scoped>
    .nk-notify {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        bottom: 2rem;
        /* right: 2rem; */
        left: 2rem;
        z-index: 9999;
        margin-bottom: 1.5rem;
    }   
</style>