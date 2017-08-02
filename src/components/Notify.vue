<template>
    <div :class="[ 'nk-notification-container', position ]" :id="id">
        <notification v-for="(item, idx) in list" v-bind:key="item.id"                                            
                      :class-name="item.className"
                      :width="item.width"                      
                      :content="item.content"
                      :closable="item.closable"
                      :duration="item.duration"
                      :type="item.type"
                      :position="item.position"
                      @close-notification="hideItem(idx)">
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
             id: {
                type: String,
                default: function () {
                    return 'notify-id-' + this._uid;
                },
            },                
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
            position: {
                type: String,
                default: 'top-center'
            },            
            method: {
                type: String,
                default: 'first'  
            },
            eventBus: {
                default: null
            },
            eventShow: {
                default: 'show-notification'
            },
            eventHide: {
                default: 'hide-notifications'
            }            
        },
        data() {
            return {
                list: []
            }
        },        
        watch: {
            position() {                
                for (let x = 0; x < this.list.length; x++) {
                    this.list[x].position = this.position;
                }
            }
        },
        methods: {
            showMe(obj) {                
                let d = obj.duration;
                if (d == undefined) {
                    d = this.duration;
                }
                if (d == undefined) {
                    d = 5000;
                }
                
                const item = {
                    id: new Date().getTime(),
                    closable: obj.closable || this.closable,
                    content: obj.data,
                    width: obj.width || this.width,
                    duration: d,
                    className: obj.className || this.className,
                    position: obj.position || this.position,
                    type: obj.type || this.type
                };

                if (this.method == 'first') {
                    this.list.splice(0, 0, item);
                } else {
                    this.list.push(item);
                }                                
            },
            hideMe() {
                this.list = [];
            },
            hideItem(key) {
                this.list.splice(key, 1);
            },            
            registerBusMethods() {
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
<style lang="scss">
    .nk-notification-container {
        position: fixed;        
        width: auto;
        height: auto;
        z-index: 9999;

        &.top-right {
            right: 0; 
            top: 0;
        }

        &.top-center {
            left: 50%; transform: translateX(-50%); 
            top: 0;
        }

        &.top-left {
            left: 0; 
            top: 0;
        }

         &.bottom-right {
            right: 0; 
            bottom: 0;
        }

        &.bottom-center {
            left: 50%; transform: translateX(-50%); 
            bottom: 0;
        }

        &.bottom-left {
            left: 0; 
            bottom: 0;
        }
    }
</style>