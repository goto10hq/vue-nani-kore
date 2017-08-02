<template>
    <div class="notification-container">
        <notification v-for="(item, idx) in list" v-bind:key="item.id"
                      :permanent="item.permanent"
                      :container="item.container"
                      :status="item.status"
                      :width="item.width"
                      :close="item.close"
                      :content="item.content"
                      :closable="item.closable"
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
            permanent:{
                default:false
            },
            container: {
                type: String,
                default: 'notification'
            },
            status: {
                type: String,
                default: 'is-success'
            },
            width: {
                type: Number,
                default: 350
            },
            closable: {
                type: Boolean,
                default: false
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
                    permanent: obj.permanent || this.permanent,
                    close: obj.close || this.close,
                    closable: obj.closable || this.closable,
                    content: obj.data,
                    container: obj.container || this.container,
                    status: obj.status || this.status,
                    width: obj.width || this.width
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
        right: 0;
        bottom: 0;
        width: auto;
        height: auto;
        z-index: 9999;
    }
</style>