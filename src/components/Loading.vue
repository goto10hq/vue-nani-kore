<template>
    <div :id="id" :class="['nk-loading', active ? 'loading' : '', fullscreen ? 'fullscreen' : '']">
    
        <div v-if="type == 'double-bounce' || type == 'jumping-square'" :class="['spinner', type]" :style="sizeStyle">    
            <div :style="loadingStyle"></div>
            <div :style="loadingStyle"></div>                         
        </div>        

        <div v-if="type == 'rotating-square'" :class="['spinner', type]" :style="sizeStyle">    
            <div :style="loadingStyle"></div>
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
            return {
                backgroundColor: this.fillColor                
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
// https://github.com/nguyenvanduocit/vue-loading-spinner
// https://github.com/greyby/vue-spinner
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
        
        // *** DOUBLE-BOUNCE ***
        &.double-bounce {
            &>div {        
                width: 100%;
                height: 100%;
                border-radius: 50%;
                opacity: 0.6;
                position: absolute;
                top: 0;
                left: 0;
                animation: double-bounce 2.0s ease-in-out infinite;

                &:nth-child(2) {
                    animation-delay: -1.0s;
                }
            }
        }
                
        // *** JUMPING-SQUARE ***        
        &.jumping-square {  
            &>div { 
                content: '';
                width: 100%;
                position: absolute;
                left: 0;

                &:nth-child(1) {
                    height: 20%;
                    min-width: 5px;
                    background: #000;
                    opacity: 0.1;                    
                    bottom: 0%;                    
                    border-radius: 50%;
                    animation: jumping-square-shadow .5s linear infinite;
                }                

                &:nth-child(2) {                    
                    height: 100%;
                    background: #41b883;
                    animation: jumping-square-animate .5s linear infinite;                    
                    bottom:40%;                
                    border-radius: 3px;
                }
            }           
        }

        // *** ROTATING-SQUARE ***        
        &.rotating-square {
            &>div {        
                width: 100%;
                height: 100%;
                background-color: #000;                
                animation: rotating-square 1.2s ease-in-out infinite;                
            }
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

@keyframes jumping-square-animate {
    17% {
        border-bottom-right-radius: 3px;
    }
    25% {
        transform: translateY(20%) rotate(22.5deg);
    }
    50% {
        transform: translateY(40%) scale(1, .9) rotate(45deg);
        border-bottom-right-radius: 50%;
    }
    75% {
        transform: translateY(20%) rotate(67.5deg);
    }
    100% {
        transform: translateY(0) rotate(90deg);
    }
}

@keyframes jumping-square-shadow {
    0%,
    100% {
        transform: scale(1, 1);
    }
    50% {
        transform: scale(1.2, 1);
    }
}

@keyframes rotating-square {
    0% {
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    }
    50% {
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    }
    100% {
      transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    }
  }
</style>