<template>
   <div class="col-3 push-top">
        <div class="profile-card">

            <p class="text-center">
                <img :src="activeUser.avatar" alt="" class="avatar-xlarge img-update">
            </p>

            <div class="form-group">
                <input type="text" v-model="activeUser.username" placeholder="Username" class="form-input text-lead text-bold">
            </div>

            <div class="form-group">
                <input type="text"  v-model="activeUser.name" placeholder="Full Name" class="form-input text-lead">
            </div>

            <div class="form-group">
                <label for="user_bio">Bio</label>
                <textarea class="form-input"  v-model="activeUser.bio" id="user_bio" placeholder="Write a few words about yourself."></textarea>
            </div>

            <div class="stats">
                <span>{{userPostsCount}} posts</span>
                <span>{{userThreadsCount}} threads</span>
            </div>

            <hr>

            <div class="form-group">
                <label class="form-label" for="user_website">Website</label>
                <input autocomplete="off"  v-model="activeUser.website" class="form-input" id="user_website" value="batman.com">
            </div>

            <div class="form-group">
                <label class="form-label" for="user_email">Email</label>
                <input autocomplete="off"  v-model="activeUser.email" class="form-input" id="user_email" value="joker@batmail.com">
            </div>

            <div class="form-group">
                <label class="form-label" for="user_location">Location</label>
                <input autocomplete="off" v-model="activeUser.location" class="form-input" id="user_location" value="You wish!">
            </div>

            <div class="btn-group space-between">
                <button class="btn-ghost" @click.prevent="cancel">Cancel</button>
                <button type="submit" @click.prevent="save" class="btn-blue">Save</button>
            </div>
        </div>

        <p class="text-xsmall text-faded text-center">Member since june 2003, last visited 4 hours ago</p>
    </div>
</template>

<script>
    export default {
      props: {
        user: {
          required: true,
          type: Object
        }
      },

      data () {
        return {
          activeUser: {...this.user} // clone the user object so we can pass by reference and both the activeUser function have its own copy
        }
      },
      
      computed: {
        userThreadsCount () {
          return this.$store.getters.userThreadsCount(this.user['.key'])
        },

        userPostsCount () {
          return this.$store.getters.userPostsCount(this.user['.key'])
        },
      },

      methods: {
        save () {
          // update the user in the vuex store
          this.$store.dispatch('updateUser', {...this.activeUser})

          this.$router.push({name: 'Profile'})
        },
        cancel () {
          this.$router.push({name: 'Profile'})
        }
      }
}
</script>

<style scoped>

</style>