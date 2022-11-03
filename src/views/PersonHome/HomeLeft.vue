<template>
    <div class="homehtml">
        <div class="box">
            <p class="aname">个人资料</p>
            <div class="acontent">
                <div class="img_content">
                    <p class="user_img">
                        <el-image :src="imageUrl" class="imgself"  ref="tututu"></el-image>
                    </p>
                    <p class="update_img" >
                    <el-button @click="editAvatar">修改图像</el-button></p>

                    <el-dialog title="修改头像" :visible.sync="editAvatarDialog" width="40%">
                        <el-row type="flex" justify="center">
                            <div class="cropper" >
                                <vueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType"
                                    :info="option.info" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox"
                                    :original="option.original" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth"
                                    :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox" @realTime="realTime"></vueCropper>
                            </div>
                            
                            <div class="previewBox">
                                <div :style="previews.div" class="preview"  >
                                    <img :src="previews.url" :style="previews.img">
                                </div>
                                <el-row type="flex" justify="center">
                                    <el-upload 
                                        :headers="header" 
                                        ref="upload" 
                                        name="avator" 
                                        action="http://81.68.121.52:8000/api/changesuperavator" 
                                        :show-file-list="false" 
                                        :auto-upload="false" 
                                        :on-change="uploadImg"
                                        :on-success="success">
                                        <el-button size="mini" type="primary"> 更换头像
                                        </el-button>
                                    </el-upload>
                                </el-row>
                                <br>
                                <el-row>
                                    <el-button icon="el-icon-plus" circle size="mini" @click="changeScale(1)"></el-button>
                                    <el-button icon="el-icon-minus" circle size="mini" @click="changeScale(-1)"></el-button>
                                    <el-button icon="el-icon-download" circle size="mini" @click="down('blob')"></el-button>
                                    <el-button icon="el-icon-refresh-left" circle size="mini" @click="rotateLeft"></el-button>
                                    <el-button icon="el-icon-refresh-right" circle size="mini" @click="rotateRight"></el-button>
                                </el-row>
                            </div>
                        </el-row>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="editAvatarDialog = false">取 消</el-button>
                            <el-button type="primary" @click="saveEditAvatar">确 定</el-button>
                        </span>
                    </el-dialog>

                    <ul class="list_group">
                        <li class="list_item">
                            <span>
                                <i class="el-icon-user"></i>登录名称：
                            </span>
                            <span>{{userName}}</span>
                        </li>
                        <li class="list_item">
                            <span>
                                <i class="el-icon-phone-outline"></i>手机号码：
                            </span>
                            <span>1008208820</span>
                        </li>
                        <li class="list_item">
                            <span>
                                <i class="el-icon-guide"></i>所属部门：
                            </span>
                            <span>财务</span>
                        </li>
                        <li class="list_item">
                            <span>
                                <i class="el-icon-location-information"></i>邮箱地址：
                            </span>
                            <span v-if="user.email">{{user.email}}</span>
                            <el-button type="text" v-else class="clickok" @click="bindemail">点击绑定邮箱</el-button>
                        </li>
                        <el-dialog title="" :visible.sync="dialogFormVisible" class="fasongk">
                            <el-form :model="form" id="okk">
                                <el-form-item label="绑定邮箱：" label-width="100px" prop="email">
                                    <el-input v-model="form.email" autocomplete="off" placeholder="请输入邮箱地址"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button type="success" plain @click="sendcode">发送验证码</el-button>
                            </div>
                        </el-dialog>
                        <li class="list_item">
                            <span>
                                <i class="el-icon-date"></i>创建时间：
                            </span>
                            <span>
                                <div class="block datetime">
                                    <el-date-picker v-model="value1" type="date" placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {VueCropper} from 'vue-cropper'
// import{ getUserProfile } from '@/store'
import { mapState } from 'vuex';
    export default {
        components: {VueCropper},
        data() {
            return {
                header:{
                    authorization:`Bearer ${this.$store.state.token}`
                },
                value1:'',
                imageUrl:'',
                userName:'',

                avatarURL: "",
                editAvatarDialog: false,
                previews: {},
                option: {
                    img: '', // 裁剪图片的地址
                    info: true, // 裁剪框的大小信息
                    outputSize: 1, // 剪切后的图片质量（0.1-1）
                    full: true, // 输出原图比例截图 props名full
                    outputType: 'jpeg', // 裁剪生成额图片的格式
                    canMove: true,  // 能否拖动图片
                    original: false,  // 上传图片是否显示原始宽高
                    canMoveBox: true,  // 能否拖动截图框
                    autoCrop: true, // 是否默认生成截图框
                    autoCropWidth: 150,
                    autoCropHeight: 150,
                    fixedBox: true // 截图框固定大小
                },

                dialogFormVisible:false,
                form:{
                    email:""
                }
            }
        },
        computed:{
            ...mapState(['user'])
        },

    created(){
        this.imageUrl = this.$store.state.user.avator;
        this.userName = this.$store.state.user.username;
        // this.userEmail = this.$store.state.user.email;
        // this.gengxintu()
        this.$store.dispatch
    },
    methods: {
        // gengxintu(){
        //     this.$store.state.user
        // },
        success(){
            this.$message({
                type: 'success',
                message: '用户图像修改成功！'
            })
            this.$store.dispatch
            // this.gengxintu()
        },
        editAvatar() {
            this.editAvatarDialog = true
            this.option.img = this.imageUrl
            // this.action = `http://81.68.121.52:8000/api/changesuperavator`
            // console.log(11111);
            // console.log(this.option.img)
            // console.log(this.$refs.tututu)
        },
        // 保存头像修改
        saveEditAvatar() {
            this.editAvatarDialog = false
            // this.finish('blob');
            this.$refs.upload.submit()
            // console.log(this.$refs.upload);
            // console.log(this.finish('blob'));
            // console.log(this.action)
            this.$store.dispatch
        },
        // 放大/缩小
        changeScale(num) {
            num = num || 1;
            this.$refs.cropper.changeScale(num);
        },
        // 左旋转
        rotateLeft() {
            this.$refs.cropper.rotateLeft();
        },
        // 右旋转
        rotateRight() {
            this.$refs.cropper.rotateRight();
        },
        // 保存上传图片
        finish(type) {
            if (type === 'blob') {
                // console.log(type)
                this.$refs.cropper.getCropBlob((data) => {
                    this.avatarURL = window.URL.createObjectURL(data);
                    // console.log(this.avatarURL)
                    // //访问接口保存到数据库写这儿!
                    // let avator = this.avatarURL;
                    // let formData = new FormData();
                    // console.log(formData)
                    // formData.append('avator',avator);
                    // // console.log(this.avatar)
                    // this.$http({   //发请求
                    //     url:"/api/changesuperavator",
                    //     method:'POST',
                    //     data:formData
                    // }).then(res => {
                    //     // console.log(232323)
                    //     let response = res.data;
                    //     console.log(response)
                    //     if (response.status == 'success'){
                    //         this.$message({
                    //             type:'success',
                    //             message:'成功！'
                    //         })
                    //     }else{
                    //         this.$message.error(response.msg);
                    //     }
                    // }).catch(error => {
                    //     // this.fullscreenLoading = false;
                    //     this.$message.error('接口错误');
                    // })
                })
            } else {
                this.$refs.cropper.getCropData((data) => {
                    //访问接口保存到数据库写这儿!
                    // console.log('else')
                })
            }
        },
        // 实时预览函数
        realTime(data) {
            this.previews = data
        },
        // 下载图片
        down(type) {
            var aLink = document.createElement('a')
            aLink.download = 'author-img'
            if (type === 'blob') {
                this.$refs.cropper.getCropBlob((data) => {
                    aLink.href = window.URL.createObjectURL(data)
                    aLink.click()
                    console.log(aLink.click())
                })
            } else {
                this.$refs.cropper.getCropData((data) => {
                    aLink.href = data;
                    aLink.click()
                    console.log(22222)
                })
            }
        },
        // 更换头像--上传本地图片
        uploadImg(file) {
            var _this = this;
            var reader = new FileReader();
            reader.onload = (e) => {
                // console.log(e)
                let data;
                if (typeof e.target.result) {
                    // 把Array Buffer转化为blob 如果是base64不需要
                    data = window.URL.createObjectURL(new Blob([e.target.result]))
                    // console.log(data)
                } else {
                    data = e.target.result
                }
                _this.option.img = data
                // console.log(11111)
                
            }
            // 转化为base64
            // reader.readAsDataURL(file.raw)
            // 转化为blob
            // console.log(reader.readAsArrayBuffer(file.raw))
            reader.readAsArrayBuffer(file.raw);
        },
        imgcancel(){
            this.statee = false;
        },
        imgok(){
            this.statee = false;
        },
        bindemail(){
            this.dialogFormVisible = true
        },
        async sendcode() {
            let formdata = new FormData();
            let email = this.form.email
            formdata.append('email',email);
            console.log(email)
            const res = await this.$http({
                url: "/api/superbindemail",
                method: "POST",
                data: formdata,
            })
            // catch(error){
            //     this.$message.error(res.msg);
            // }
            let response = res.data;
            if (res.status == "error") {
                this.$message.error(response.msg);
            } else {
                this.$alert("邮箱验证码发送成功，请注意查收，2分钟后过期作废！", "提示", {
                    confirmButtonText: '确定',
                    callback: action => {
                        console.log('ok')
                        this.$prompt('请输入邮箱中的', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            // inputPattern: /^\w{4}$/g,
                            inputErrorMessage: '验证码格式不正确'
                        }).then(({value}) => {
                            this.$http({
                                url: "/api/superbindemail",
                                method: "PUT",
                                data: `text=${value}`,
                                headers: {
                                    'Content-Type': "application/x-www-form-urlencoded"
                                }
                            }).then(res => {
                                let response = res.data;
                                if (response.status == 'error') {
                                    this.$message.error(response.msg)
                                } else {
                                    this.$message({
                                        type: 'success',
                                        message: '你的邮箱绑定成功'
                                    });
                                }
                            })
                        })
                        
                        
                    },
                });
            }    
        }
    }
}
</script>
<style>
.homehtml .fasongk .el-dialog {
    width: 400px;
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%,-50%) !important;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    padding-top: 40px;
    box-shadow: none !important;
    margin-top: 0vh !important;
}
.homehtml .fasongk .el-form-item{
    margin-bottom: 0px;
}
.homehtml .el-dialog__header{
    padding: 0px;
}
.homehtml .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .homehtml .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .homehtml .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .homehtml .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style scoped>
    .previewBox {
        text-align: center;
        margin-left: 60px;
    }
 
    .preview {
        width: 150px;
        height: 150px;
        margin: 0px auto 20px auto;
        border-radius: 50%;
        border: 1px solid #ccc;
        background-color: #ccc;
        overflow: hidden;
    }
 
    .cropper {
        width: 260px;
        height: 260px;
    }
.box{
    width: 303px;
    margin-bottom: 25px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 100%;
    box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
}
.aname{
    width: 277px;
    background-color: rgb(56 80 111);
    color: rgb(191, 203, 217);
    font-weight: 700;
    border-radius: 2px 2px 0 0;
    padding: 13px;
    border-bottom: 1px solid #eee;
    text-align: left;
    margin: 0px !important;
}
.acontent{
    width: 263px;
    height: auto;
    background-color: #fff;
    color: inherit;
    padding: 15px 20px 20px 20px;
    border-color: #e7eaec;
    -webkit-border-image: none;
    -o-border-image: none;
    border-image: none;
    border-style: solid solid none;
    border-width: 1px 0;
}
.user_img{
    text-align: center;
    margin-bottom: 10px;
}
.imgself{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    cursor: pointer;
}
.update_img{
    color: #337ab7;
    text-align: center;
    margin-top: 0px !important;
    margin-bottom: 10px;
    cursor: pointer;
}
.update_img:hover{
    color: rgb(19, 107, 221);
}
.list_item{
    background-color: inherit;
    border-top: 1px solid #e7eaec;
    margin-bottom: -1px;
    padding: 10px 0px;
    font-weight: 400;
    font-size: 14px;
    color: #676A6C;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.list_group{
    padding-left: 0px ;
}
.list_item:last-child::after{
    border-bottom: 1px solid #e7eaec;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 140px !important;
}
.clickok{
    color: #267ac4;
    text-decoration: underline;
}
</style>