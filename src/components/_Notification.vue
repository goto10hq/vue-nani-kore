<template>
    <transition enter-active-class="animated quick fadeInRight" leave-active-class="animated quick fadeOutRight">
        <div v-if="show" :class="[container, status, 'alert notify-me']" :style="{ width: width + 'px' }">
            <slot name="content"></slot>            
            <button type="button" class="close" aria-label="Close" v-if="closable" @click="closeNotification">
                <span aria-hidden="true"><slot name="close">&times;</slot></span>
            </button>
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
            permanent: {
                default: false
            },
            close: '',
            content: {},
            container: {
                type: String,
                default: 'alert'
            },
            status: {
                type: String,
                default: 'alert-success'
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
        methods: {
            closeNotification() {
                this.$emit('close-notification');
            }
        },
        created() {
            if (!this.permanent) {
                setTimeout(() => {
                    this.closeNotification();
                }, 4000)
            }

        }

    }
</script>
<style scoped>
    .notify-me {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        bottom: 2rem;
        right: 2rem;
        z-index: 9999;
        margin-bottom: 1.5rem;
    }

    .notify-me i {
        cursor: pointer;
        align-self: flex-start;
    }

    .notify-me:first-child {
        margin-bottom: 0;
    }
</style>