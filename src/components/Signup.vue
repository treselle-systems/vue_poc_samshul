<!-- Html Section for Login page-->
<template>
<div class="container well form-horizontal">
  <!-- Form Name -->
  <legend>
    <center>
      <h2><b>Registration Form</b></h2></center>
  </legend>
  <br>
  <!-- Text input-->
  <div class="form-group" data-toggle="validator">
    <label class="col-md-4 control-label">First Name</label>
    <div class="col-md-4 inputGroupContainer">
      <div class="input-group">
        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
        <input @blur="validateLoginForm()" v-model="signupFirstName" name="first_name" placeholder="First Name" class="form-control" type="text">
      </div>
    </div>
     <div class="col-md-4 inputGroupContainer alert alert-danger"v-if="(errorMsg != '')">
   {{errorMsg}}
     </div>
  </div>

  <!-- Text input-->
  <div class="form-group">
    <label class="col-md-4 control-label">Last Name</label>
    <div class="col-md-4 inputGroupContainer">
      <div class="input-group">
        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
        <input v-model="signupLastName" name="last_name" placeholder="Last Name" class="form-control" type="text">
      </div>
    </div>
     <div class="col-md-4 inputGroupContainer alert alert-danger"v-if="(errorMsg != '')">
   {{errorMsg}}
     </div>
  </div>
  <!-- Text input-->
  <div class="form-group">
    <label class="col-md-4 control-label">Email</label>
    <div class="col-md-4 inputGroupContainer">
      <div class="input-group">
        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
        <input v-model="signupEmail" name="user_name" placeholder="Username" class="form-control" type="text">
      </div>
    </div>
     <div class="col-md-4 inputGroupContainer alert alert-danger"v-if="(errorMsg != '')">
   {{errorMsg}}
     </div>
  </div>
  <!-- Text input-->
  <div class="form-group">
    <label class="col-md-4 control-label">Password</label>
    <div class="col-md-4 inputGroupContainer">
      <div class="input-group">
        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
        <input v-model="signupPassword"name="user_password" placeholder="Password" class="form-control" type="password">
      </div>
    </div>
     <div class="col-md-4 inputGroupContainer alert alert-danger"v-if="(errorMsg != '')">
   {{errorMsg}}
     </div>
  </div>
  <!-- Text input-->
  <div class="form-group">
    <label class="col-md-4 control-label">Confirm Password</label>
    <div class="col-md-4 inputGroupContainer">
      <div class="input-group">
        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
        <input v-model="signupConfirmPassword"name="confirm_password" placeholder="Confirm Password" class="form-control" type="password">
      </div>      
    </div>
     <div class="col-md-4 alert alert-danger"v-if="(errorMsg != '')">
   {{errorMsg}}
     </div>
  </div>
  <!-- Success message -->
  <div class="alert alert-success">Success <i class="glyphicon glyphicon-thumbs-up"></i> Success!.</div>
  <!-- Button -->
  <div class="form-group">
    <label class="col-md-4 control-label"></label>
    <div class="col-md-4">
      <br>
      <button @click="signupSubmit()" class="btn btn-warning"><span class="glyphicon glyphicon-send"></span>&nbsp&nbsp&nbspSubmit</button>
    </div>
  </div>
</div>
</div>
</template>

<script>

export default {
    name: 'Signup',
    data () {
        return {
           errorMsg: ''
        }
    },
    methods: { 
         validateLoginForm: function() {
          console.log(this.signupFirstName);
            var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (this.signupFirstName || this.signupLastName || this.signupEmail || this.signupPassword || this.signupConfirmPassword === undefined || '') {
              console.log("assssssssss");
                this.errorMsg = 'Enter the Fields'
            } else if (!emailPattern.test(this.userEmail)) {
                this.errorMsg = 'Invalid Email'
            } else if (this.userPassword === '') {
                this.errorMsg = 'Enter Password'
            } else {
                this.errorMsg = ''
            }
        },

        signupSubmit: function(){
          this.validateLoginForm()
          this.$http.post().then((response) => {
                if (response.body == 200) {
                    this.$router.push('/Login')
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    },

        mounted() {
        //this.initReCaptcha();
    }
}
</script>

