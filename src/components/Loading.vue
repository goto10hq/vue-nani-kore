<template>    
   <div :id="id" :class="['nk-loading', active ? 'loading' : '', fullscreen ? 'fullscreen' : '']">
          
      <div class="spinner" :style="sizeStyle">
        <div v-if="type == 'double-bounce'" class="double-bounce1" :style="loadingStyle"></div>
        <div v-if="type == 'double-bounce'" class="double-bounce2" :style="loadingStyle"></div>
      </div>

      <slot></slot>

    </div>    
</template>
<script>
  export default {
    props: {
        id: {
            type: String,
            default: function () {
                return 'loading-id-' + this._uid;
            },
        },            
        type: {
            type: String,
            default: 'double-bounce'
        },     
        fillColor: {
            type: String,
            default: '#000000'
        },
        size: {
            default: '40px'
        },
        duration: {
            default: '2.0s'
        },
        active: {
            type: Boolean,
            default: true
        },
        fullscreen: {
            type: Boolean,
            default: false
        }
    },    
    computed: {        
        loadingStyle() {
            if (this.type == 'double-bounce') {
                return {
                    backgroundColor: this.fillColor,
                    animationDuration: this.duration
                }   
            }            
        },
        sizeStyle() {
            return {
                width: this.size,
                height: this.size                
            }    
        }        
    }    
  }
</script>
<style lang="scss" scoped>

.nk-loading {
    position: relative;
    
    &.loading {
        &:before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(#FFF, 0.6);
            display: block;
            z-index: 999;
        }

        .spinner {
            display: inline-block;
        }

        &.fullscreen {
            &:before {
                position: fixed;
            }
            .spinner {
                position: fixed;
            }
        }
    }
    
    .spinner {        
        position: absolute; 
        left: 50%;
        top: 50%; 
        transform: translate(-50%, -50%); 
        display: none;
        z-index: 1000;

        * {
            line-height: 0;
            box-sizing: border-box;
        }

        .double-bounce1,
        .double-bounce2 {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            opacity: 0.6;
            position: absolute;
            top: 0;
            left: 0;
            animation: double-bounce 2.0s ease-in-out infinite;
        }
        .double-bounce2 {
            animation-delay: -1.0s;
        }
    }
}

@keyframes double-bounce {
    0%,
    100% {
        transform: scale(0.0);
    }
    50% {
        transform: scale(1.0);
    }
}


</style>