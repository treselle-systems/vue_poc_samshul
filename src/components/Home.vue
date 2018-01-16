<!-- Html Section for Home page-->
<template>
<nav class="navbar navbar-fixed-top navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Vue Application</a>
    </div>
    <button @click="pageLogout()" class="btn btn-danger navbar-btn navbar-right">Logout</button>
  </div>
</nav>
</html>
</template>

<script>

export default {
    name: 'Home',
    data () {
        return {}
    },
    methods: {
        /* Method to clear cookies and redirect to login page  */
        pageLogout: function () {
            this.$cookies.remove('token')
            this.$router.push('/Login')
        }
    },

    beforeMount: function () {
        if (this.$cookies.get('token') === null) {
            this.$router.push('/Login')
        }
    }
}
</script>


