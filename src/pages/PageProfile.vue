<template>
    <div class="flex-grid">
          <UserProfileCard
            v-if="!edit"
            :user="user"
          />

          <UserProfileCardEditor
            v-else
            :user="user"
          />
          
          <div class="col-7 push-top">

              <div class="profile-header">
                  <span class="text-lead">
                      {{ user.username }}'s recent activity
                  </span>
                  <a href="#">See only started threads?</a>
              </div>

              <hr>

              <!-- <div class="activity-list">
                  <div class="activity">
                      <div class="activity-header">
                          <img src="https://i.imgur.com/OqlZN48.jpg" alt="" class="hide-mobile avatar-small">
                          <p class="title">
                              How can I chop onions without crying?
                              <span>Joker started a topic in Cooking</span>
                          </p>

                      </div>

                      <div class="post-content">
                        <div>
                          <p>I absolutely love onions, but they hurt my eyes! Is there a way where you can chop onions without crying?</p>
                        </div>
                      </div>

                      <div class="thread-details">
                          <span>4 minutes ago</span>
                          <span>1 comments</span>
                      </div>
                  </div>
              </div> -->

              <PostList :posts="userPosts"/>
          </div>
      </div>
</template>

<script>
import UserProfileCard from '@/components/UserProfileCard'
import UserProfileCardEditor from '@/components/UserProfileCardEditor'
import PostList from '@/components/PostList'
import {mapGetters} from 'vuex'
export default {
  components: {
    PostList,
    UserProfileCard,
    UserProfileCardEditor
  },

  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters({
      user: 'authUser'
    }),

    userPosts () {
      // Object.values() alwyas converts an object to an array.

      if (this.user.posts) {
        return Object.values(this.$store.state.posts)
          .filter(post => post.userId === this.user['.key'])
      }

      return []
    }
  }
}
</script>

<style>

</style>