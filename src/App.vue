<template>
  <b-container fluid>
    <b-row align-h="center">
      <b-col md="6">
        <p class="mt-3 heading">
          <Logo class="mr-3" />密码生成器
        </p>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="10" md="6">
        <b-input-group class="mt-3 shadow">
          <b-input-group-prepend>
            <b-input-group-text>
              <b-icon-globe />
            </b-input-group-text>
          </b-input-group-prepend>
          <b-form-input autofocus placeholder="用途" v-model="usage"></b-form-input>
        </b-input-group>
        <b-input-group class="mt-3 shadow">
          <b-input-group-prepend>
            <b-input-group-text>
              <b-icon-key />
            </b-input-group-text>
          </b-input-group-prepend>
          <b-form-input placeholder="主密码" v-model="pass" class="password"></b-form-input>
        </b-input-group>
        <b-input-group class="mt-3 shadow">
          <b-input-group-prepend>
            <b-input-group-text>
              <b-icon-segmented-nav />
            </b-input-group-text>
          </b-input-group-prepend>
          <b-form-input placeholder="长度" type="number" v-model="digit"></b-form-input>
          <b-input-group-append>
            <b-input-group-text @click="digit=10" class="pointer"> 10 </b-input-group-text>
            <b-input-group-text @click="digit=16" class="pointer"> 16 </b-input-group-text>
            <b-input-group-text @click="digit=32" class="pointer"> 32 </b-input-group-text>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row align-h="center" class="mt-5">
      <b-col cols="10" md="4">
        <b-input-group class="shadow mb-3">
          <b-input-group-prepend>
            <b-input-group-text>
              <b-icon-key-fill />
            </b-input-group-text>
          </b-input-group-prepend>
          <b-form-input type="text" v-model="result" :disabled="result.length==0" placeholder="子密码"></b-form-input>
          <b-input-group-append>
            <b-input-group-text class="clipboard-item pointer" :data-clipboard-text="result">
              <b-icon-clipboard />
            </b-input-group-text>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-col cols="10" md="2">
        <b-dropdown split block text="生成" variant="success" @click="genNormal" :disabled="genBtnDisable">
          <b-dropdown-item @click="genCompatible">生成（兼容模式）</b-dropdown-item>
        </b-dropdown>
      </b-col>
    </b-row>
    <GithubButton />
  </b-container>
</template>

<script>
import md5 from 'blueimp-md5'
import Clipboard from 'clipboard'
import GithubButton from './components/GithubButton'
import Logo from './components/Logo'
export default {
  name: 'App',
  components: {
    GithubButton,
    Logo
  },
  data () {
    return {
      usage: '',
      pass: '',
      digit: '',
      result: ''
    }
  },
  methods: {
    genNormal () {
      const hash = md5(this.usage + ':' + this.pass).substr(0, this.digit)
      console.log(hash)

      // 计算字母和数字
      let alphabet = 0
      let number = 0
      for (let i = 0; i < hash.length; i++) {
        if (hash.charCodeAt(i) >= 97 && hash.charCodeAt(i) <= 122) {
          alphabet += 1
        } else {
          number += 1
        }
      }

      // 将字母和数字中的较小者调整为不小于较大者
      const splited = hash.split('')
      for (let i = 0; alphabet > number; i++) {
        if (hash.charCodeAt(i) >= 97 && hash.charCodeAt(i) <= 122) {
          splited[i] = '8'
          alphabet--
          number++
        }
      }
      for (let i = 0; alphabet < number; i++) {
        if (hash.charCodeAt(i) >= 48 && hash.charCodeAt(i) <= 57) {
          splited[i] = 'x'
          alphabet++
          number--
        }
      }

      // 将字母调整为一个大写一个小写，数字转换为一个数字一个符号
      let alphabetChanged = false
      let numberChanged = false
      for (let i = 0; i < hash.length; i++) {
        if (splited[i].charCodeAt(0) >= 97 && splited[i].charCodeAt(0) <= 122) {
          if (alphabetChanged) {
            alphabetChanged = false
          } else {
            splited[i] = splited[i].toUpperCase()
            alphabetChanged = true
          }
        } else {
          if (numberChanged) {
            numberChanged = false
          } else {
            splited[i] = String.fromCharCode(hash.charCodeAt(i) - 10)
            numberChanged = true
          }
        }
      }
      this.result = splited.join('')
    },
    genCompatible () {
      const hash = md5(this.usage + ':' + this.pass).substr(0, this.digit)
      console.log(hash)

      // 计算字母和数字
      let alphabet = 0
      let number = 0
      for (let i = 0; i < hash.length; i++) {
        if (hash.charCodeAt(i) >= 97 && hash.charCodeAt(i) <= 122) {
          alphabet += 1
        } else {
          number += 1
        }
      }

      // 将字母和数字中的较小者调整为不小于较大者
      const splited = hash.split('')
      for (let i = 0; alphabet > number; i++) {
        if (hash.charCodeAt(i) >= 97 && hash.charCodeAt(i) <= 122) {
          splited[i] = '8'
          alphabet--
          number++
        }
      }
      for (let i = 0; alphabet < number; i++) {
        if (hash.charCodeAt(i) >= 48 && hash.charCodeAt(i) <= 57) {
          splited[i] = 'x'
          alphabet++
          number--
        }
      }

      // 将字母调整为一个大写一个小写，数字不变
      let alphabetChanged = false
      for (let i = 0; i < hash.length; i++) {
        if (splited[i].charCodeAt(0) >= 97 && splited[i].charCodeAt(0) <= 122) {
          if (alphabetChanged) {
            alphabetChanged = false
          } else {
            splited[i] = splited[i].toUpperCase()
            alphabetChanged = true
          }
        }
      }
      this.result = splited.join('')
    }
  },
  mounted () {
    new Clipboard('.clipboard-item')
  },
  computed: {
    genBtnDisable () {
      return this.usage.length === 0 || this.pass.length === 0 || this.digit.length === 0
    }
  }
}
</script>

<style lang="scss">
@import './assets/password.css';
.password {
  font-family: password;
}
.pointer {
  cursor: pointer;
}
.heading {
  font-size: 3rem;
  text-align: center;
}
</style>
