<template>
    <div class="notification-container">
        <notification v-for="(item, idx) in list" v-bind:key="item.id"                                            
                      :class-name="item.className"
                      :width="item.width"                      
                      :content="item.content"
                      :closable="item.closable"
                      :duration="item.duration"
                      :type="item.type"
                      @close-notification="hideChild(idx)">
            <template slot="content">
                <slot name="content" :data="item.content"></slot>
            </template>
        </notification>
    </div>
</template>
<script>
    import Notification from './_Notification.vue';

    export default {
        components: {
            notification: Notification
        },
        props: {                      
            width: {
                type: Number,
                default: 350
            },
            closable: {
                type: Boolean,
                default: false
            },
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
            // central event bus
            eventBus: {
                default: null
            },
            eventShow: {
                default: 'notify-me'
            },
            eventHide: {
                default: 'close-notification'
            },

        },
        data(){
            return {
                list: []
            }
        },
        methods: {
            showMe(obj) {
                const item = {
                    id: this.list.length,                                        
                    closable: obj.closable || this.closable,
                    content: obj.data,
                    width: obj.width || this.width,
                    duration: obj.duration || this.duration,
                    className: obj.className || this.className,
                    type: obj.type || this.type
                };
                this.list.splice(0, 0, item);
                //this.list.push(item);
            },
            hideMe() {
                this.list = [];
            },
            hideChild(key) {
                this.list.splice(key, 1);
            },
            // Register eventBus methods.
            registerBusMethods()
            {
                const bus = this.eventBus || ((this.$parent) ? this.$parent.bus || this.$parent : null);

                if (bus) {
                    bus.$on(this.eventShow, this.showMe);
                    bus.$on(this.eventHide, this.hideMe);
                }

            }
        },
        created() {
            this.registerBusMethods();
        }

    }
</script>
<style scoped>
    .notification-container {
        display: flex;
        flex-direction: column-reverse;
        align-items: flex-end;
        position: fixed;
        /* right: 0; */
        left: 0;
        bottom: 0;
        width: auto;
        height: auto;
        z-index: 9999;
    }
</style>