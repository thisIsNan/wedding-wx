<template>
  <v-app id="registerPage">
    <div class="arrow left">
      <img src="/static/left_arrow.png">
    </div>
    <div class="arrow right">
      <img src="/static/right_arrow.png">
    </div>
    <v-container grid-list-md>
      <v-flex>
        <transition-group name="slide-fade">
          <div v-for="(image,index) in imgList" :key="index" v-show="index===currentIndex">
            <v-touch v-on:swipeleft="nextImg" v-on:swiperight="preImg">
              <img :src="imgList[index]" width="100%">
            </v-touch>
          </div>
        </transition-group>
      </v-flex>
      <v-layout row justify-center >
        <v-dialog v-model="dialog" persistent max-width="800px">
          <v-btn class="brownButton bigButton" color="white" slot="activator">注册</v-btn>
          <v-card scrollable="false">
            <v-card-title>
              <span class="headline">宾客信息</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs8 offset-xs2>
                    <v-text-field label="姓名" v-model="name" required :rules="[rules.required]"></v-text-field>
                  </v-flex>
                  <v-flex xs8 offset-xs2>
                    <v-subheader>I'm with</v-subheader>
                    <v-card flat>
                        <v-radio-group required v-model="side" row>
                          <v-radio label="新郎" value="Groom" ></v-radio>
                          <v-radio label="新娘" value="Bride"></v-radio>
                        </v-radio-group>
                    </v-card>
                  </v-flex>
                  <v-flex xs8 offset-xs2>
                    <v-select
                      label="出席人数"
                      v-model="attendance"
                      required
                      :items="['不出席', '1', '2', '3', '4']"
                    ></v-select>
                  </v-flex>
                </v-layout>
                <small v-bind:class="dialogActiveClass">{{dialogAlert}}</small>
              </v-container>
              <small>带星号者为必填项目</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="brownButton" flat @click.native="dialog = false">关闭</v-btn>
              <v-btn class="brownButton" flat @click.native="register">注册</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import GuestService from '@/services/GuestService'

export default {
  data () {
    return {
      name: null,
      side: null,
      attendance: -1,
      dialog: false,
      rules: {
        required: (value) => !!value || 'Required'
      },
      dialogAlert: '',
      sent: false,
      imgList: [
        '/static/cover.jpeg',
        '/static/prod1.jpeg',
        '/static/prod2.jpeg',
        '/static/prod3.jpeg'
      ],
      currentIndex: 0,
      dialogActiveClass: ''
    }
  },
  methods: {
    register: async function () {
      if (this.sent) {
        this.dialogActiveClass = 'dialogActiveClassRed'
        this.dialogAlert = '您已经注册过了'
        return
      }
      if (!this.name || !this.side || this.attendance === -1) {
        this.dialogActiveClass = 'dialogActiveClassRed'
        this.dialogAlert = 'Please fill in all required fields'
      } else {
        await GuestService.addGuest(this.name, this.side, this.attendance)
        this.dialogActiveClass = 'dialogActiveClassGreen'
        this.dialogAlert = '您已成功注册'
        let that = this
        setTimeout(function () {
          that.sent = true
          that.dialog = false
        }, 1500)
      }
    },
    preImg: function () {
      if (this.currentIndex === 0) {
        this.currentIndex = this.imgList.length - 1
      } else {
        this.currentIndex = this.currentIndex - 1
      }
    },
    nextImg: function () {
      if (this.currentIndex === this.imgList.length - 1) {
        this.currentIndex = 0
      } else {
        this.currentIndex = this.currentIndex + 1
      }
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

#registerPage {
  background-image: url('/static/background.jpeg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.brownButton {
  color: #A0887D !important;
  font-family: Fangsong;
}

.bigButton {
  font-size: 1.5em;
}

.dialogActiveClassGreen {
  color: green
}

.dialogActiveClassRed {
  color: red
}

.arrow {
  position: absolute;
  top: 50%;
}

.right {
  right: 5%;
  animation: right_start 1.5s infinite ease-in-out;
  -webkit-animation: right_start 1.5s infinite ease-in-out;
}

.left {
  left: 5%;
  animation: left_start 1.5s infinite ease-in-out;
  -webkit-animation: left_start 1.5s infinite ease-in-out;
}

@keyframes right_start {
    0%,30% {opacity: 0;transform: translate(10px,0);}
    60% {opacity: 1;transform: translate(0,0);}
    100% {opacity: 0;transform: translate(8px,0);}
}

@-webkit-keyframes right_start {
    0%,30% {opacity: 0;-webkit-transform: translate(10px,0);}
    60% {opacity: 1;-webkit-transform: translate(0,0);}
    100% {opacity: 0;-webkit-transform: translate(8px,0);}
}

@keyframes left_start {
    0%,30% {opacity: 0;transform: translate(-10px,0);}
    60% {opacity: 1;transform: translate(0,0);}
    100% {opacity: 0;transform: translate(-8px,0);}
}

@-webkit-keyframes left_start {
    0%,30% {opacity: 0;-webkit-transform: translate(-10px,0);}
    60% {opacity: 1;-webkit-transform: translate(0,0);}
    100% {opacity: 0;-webkit-transform: translate(-8px,0);}
}
</style>