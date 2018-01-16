<!-- Html Section for Login page-->
<template>

<div class="container login-form">
  <h2 class="login-title">- Please Login -</h2>
  <div class="panel panel-default">
    <div class="panel-body">
      <div class="input-group login-userinput">
        <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
        <input v-on:keyup="inputValidation()" v-model="userEmail" type="text" class="form-control" name="username" placeholder="Email">
      </div>
      <div class="input-group">
        <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
        <input v-on:keyup="inputValidation()" v-model="userPassword" id="txtPassword" type="password" class="form-control" name="password" placeholder="Password">
      </div>
      <div v-if="(errorMsg)" class="alert alert-danger">
        <strong>{{errorMsg}}</strong>
      </div>
      <br>
      <div id="recaps" class="g-recaptcha"></div>
      <button @click="loginForm()"  id="submit" class="btn btn-primary btn-block login-button"><i class="fa fa-sign-in"></i> Login</button>
     <!--  <button @click="signupForm()" class="btn btn-primary btn-block login-button"><i class="fa fa-sign-in"></i> Signup</button> -->
    </div>
  </div>
</div>
</template>

<script>

const encode = require('nodejs-base64-encode')
export default {
    name: 'Login',
    data () {
        return {
            errorMsg: '',
            sitekey: '6LeP6EAUAAAAANn4S0-n23g1V7e3hgJZNqSHVknT',
            buttonStatus: false,
            captchaStatus: false,
            userEmail: '',
            userPassword: '',
            recaptchaResponse: ''
        }
    },
    methods: {
        validateLoginForm: function () {
            var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (this.userEmail === '') {
                this.errorMsg = 'Please Enter Email'
            } else if (!emailPattern.test(this.userEmail)) {
                this.errorMsg = 'Please Enter Valid Email'
            } else if (this.userPassword === '') {
                this.errorMsg = 'Please Enter Password'
            } else if (this.recaptchaResponse === '') {
                this.errorMsg = 'Please select Captcha'
            } else {
                this.errorMsg = ''
            }
        },

        inputValidation: function () {
            if (this.userEmail !== '' && this.userPassword !== '' && this.recaptchaResponse !== '') {
                this.buttonStatus = true
            }
        },

        loginForm: function () {
            this.validateLoginForm()
            if (this.errorMsg !== '') {
                return false
            }
            var recaptcha = grecaptcha.getResponse()
            var res = {
                'responseKey': recaptcha
            }
            /* To call captcha Endpoint */
            this.$http.post('http://localhost:3001/api/v1/captcha', res).then(response => {
                if (response.status === 200) {
                    var loginRes = {
                        'userEmail': this.userEmail,
                        'userPwd': encode.encode(this.userPassword, 'base64')
                    }
                    /* To call login Endpoint */
                    this.$http.post('http://localhost:3001/api/v1/login', loginRes).then(response => {
                        console.log(response, this)
                        if (response.body.res === 'success') {
                            this.$cookies.set('token', response.body.res.token)
                            this.$router.push('/Home')
                        } else {
                            this.errorMsg = 'Invalid Credential'
                            grecaptcha.reset()
                        }
                    })
                }
            })
        },

        initReCaptcha: function () {
            var self = this
            setTimeout(function () {
                if (typeof grecaptcha === 'undefined') {
                    self.initReCaptcha()
                } else {
                    grecaptcha.render('recaps', {
                        sitekey: self.sitekey,
                        // size: 'invisible',
                        // badge: 'inline',
                        callback: self.reCaptchaCallback
                    })
                }
            }, 1000)
        },

        /**
         * ReCaptcha success callabck
         */
        reCaptchaCallback: function (response) {
            this.recaptchaResponse = response
            this.errorMsg = ''
            if (response) {
                this.captchaStatus = true
            }
        }

        // signupForm: function () {
        // this.$router.push('/Signup')
        // }
    },

    mounted: function () {
        /* To init recaptcha */
        this.initReCaptcha()
    },

    /**
     * Before Mount is used to load the required functions on default page load
     */
    beforeMount: function () {
        if (this.$cookies.get('token') !== null) {
            this.$router.push('/Home')
        }
    }
}
</script>

