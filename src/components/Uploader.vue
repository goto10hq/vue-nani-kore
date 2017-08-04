<template>
    <div :class="className">                
        <div v-show="maxFiles == 0 || maxFiles > files.length">
            <span class="label label-danger" v-if="errorMessage != null && errorMessage != ''">{{ errorMessage }}</span>
            <div class="dropzone-wrapper">
                <form ref="formie" action="" class="dropzone-area text-center">
                    {{ text }} 
                    <span v-if="working" class="icon-spin1 animate-spin"></span>
                    <div v-if="uploading">
                        <div class="progress">
                            <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100" :style="'width:' + progress + '%'"><span class="sr-only">Nahrávám obrázek {{progress}}%</span></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>         
        <div class="row">
            <div v-for="(f, idx) in files" v-bind:key="idx">
                <slot name="file" :data="f"></slot>             
            </div>                   
        </div>
    </div>
</template>
<script>        

    var Dropzone = require('dropzone');

    export default {  
        model: {
            prop: 'modelValue',
            event: 'file'        
        },      
        props: {      
             id: {
                type: String,
                default: function () {
                    return 'uploader-id-' + this._uid;
                },
            },
            modelValue: {
                type: Array,
                default() {
                    return [];
                }
            },
            className: {
                type: String,
                default: 'nk-uploader',
            },
            text: {
                type: String,
                default: 'Drop files here or click to upload.'
            },
            maxFiles: {
                type: Number,
                default: 0
            },            
            messageMaxFilesExceeded: {
                type: String,
                default: 'Number of files uploaded reached a limit.'
            },
            url: {
                type: String,
                required: true
            }            
        },
        data() {
            return {
                uploading: false,
                progress: 0,                
                dz: {},
                files: this.modelValue
            }
        },
        methods: {          
            removeFile: function (p, idx) {                
                this.dz.removeFile(self.dz.files[idx]);
                this.files.$remove(p);                
            }        
        }, 
        mounted() {            
            var self = this;    
            
            var dz = new Dropzone(self.$refs.formie,
                    {
                        url: self.url,
                        paramName: "uploadfile",
                        dictMaxFilesExceeded: self.messageMaxFilesExceeded,
                        clickable: self.$refs.formie,                        
                        parallelUploads: 1,
                        createImageThumbnails: false,
                        previewTemplate: '<div style="display:none"></div>',
                        init: function () {

                            this.on('addedfile',
                                function (file) {
                                });

                            //this.on('maxfilesexceeded',
                            //    function (file) {                                
                            //        this.removeFile(file);
                            //    });

                            this.on('error',
                                function (file, message) {
                                    this.removeFile(file);
                                    self.uploading = false;   
                                    console.log('error', message);
                                    self.$emit('error', message);                                                                        
                                });

                            this.on('success',
                                function (file, json) {                                
                                    self.errors = null;
                                    self.uploading = false;                                

                                    self.files.push(json);
                                    self.$emit('file-uploaded', json);                                    
                                });

                            this.on('uploadprogress',
                                function (file, progress, bytesSent) {                                
                                    self.errorMessage = null;
                                    self.uploading = true;
                                    self.$emit('upload-progress', Math.round(progress));
                                });
                        }
                    });
    
            if (self.maxFiles > 0) {
                dz.maxFiles = self.maxFiles;
            }
            self.dz = dz;

            for (let i = 0; i < self.files.length; i++) {
                let mockFile = { name: self.files[i].file, size: 123 };
                dz.emit("addedfile", mockFile);
                dz.emit("complete", mockFile);

                dz.files.push(mockFile);
            }               
        }
    }
</script>
<style lang="scss">
    $grid-gutter-width: 30px !default;
    $color-border: #CBCBCB;
    $color-ok-solid: #5da2f5;
    $color-ok-text: darken($color-ok-solid, 5);
    $color-dropdown: #888888;
    $color-descrete: #A8A8A8;
    $color-warning-solid: #f46374;

    $base-font-size-for-rem-calc: 16;

    @mixin text-descrete() {
        @include font-size(13);
        color: $color-descrete;
        letter-spacing: 0.4px;
    }

    @mixin rem-polyfill($desired-rem-size) {
        font-size: ($desired-rem-size * $base-font-size-for-rem-calc) + px;
        font-size: $desired-rem-size + rem;
    }

    @mixin font-size($desired-pixel-size) {
        $desired-rem-size: $desired-pixel-size / $base-font-size-for-rem-calc;
        font-size: ($desired-rem-size * $base-font-size-for-rem-calc) + px;
        font-size: $desired-rem-size + rem;
    }

    @mixin text-dropdown() {
        @include font-size(13);
        color: $color-dropdown;
        letter-spacing: 0.4px;
    }

    .nk-uploader {
        .dropzone-wrapper {
            display: table;
            width: 100%;
            margin-bottom: $grid-gutter-width / 2;
        }
        .dropzone-area {
            /*width: 100%;*/
            height: 100px;
            position: relative;
            border: 2px dashed $color-border;    
            display: table-cell;
            vertical-align: middle;
            &:hover, &.dropzone-hover {
                border: 2px dashed $color-ok-solid;
                .dropzone-title {
                    color: darken($color-ok-text, 10);
                }
            }
        }

        .dropzone-area input {
            position: absolute;
            cursor: pointer;
            top: 0px;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
        }

        .dropzone-text {
            position: absolute;
            top: 50%;
            text-align: center;
            transform: translate(0, -50%);
            width: 100%;
            span {
                display: block;
            }
        }

        .dropzone-title {
            @include text-dropdown();
        }
        .dropzone-info {
            @include text-descrete();
        }

        .dropzone-close.modal-close {
            position: absolute;
            top: 10px;
            left: 10px;
            visibility: hidden;
            transform: inherit;    
            &:hover span {
                background-color: $color-warning-solid;
            }
        }

        .dropzone-preview {
            position: relative;
            &:hover .dropzone-close.modal-close {
                visibility: visible;
            }
        }
    }
</style>