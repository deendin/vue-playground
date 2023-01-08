<template>
    <div class="forum-listing">
        <div class="forum-details">
            <router-link 
                :to="{
                    name: 'Forum', params: {forumId: forum['.key']}
                }" 
                class="text-xlarge">
                {{ forum.name }}
            </router-link>

            <p>{{ forum.description }}</p>
        </div>

        <div class="threads-count">
            <p class="count">{{ threadsCount }}</p>
            {{  threadsCount > 1 ? 'threads' : 'thread'  }}
        </div>

        <div class="last-thread">
            <!-- TODO: implement later. -->
            <!-- <img class="avatar" src="https://i.imgur.com/OqlZN48.jpg" alt="">
            <div class="last-thread-details">
                <a href="thread.html">Where is the sign in button?</a>
                <p class="text-xsmall">By <a href="profile.html">Joseph Kerr</a>, three hours ago</p>
            </div> -->
        </div>
    </div>
</template>

<script>
    import {countObjectproperties} from '@/utils'
    export default {
      props: {
        forum: {
          required: true,
          type: Object
        }
      },

      computed: {
        threadsCount () {
          return countObjectproperties(this.forum.threads)
        //   return this.forum.threads
        //     ? Object.values(this.forum.threads).length
        //     : 0
        }
      }

    }
</script>

<style scoped>

</style>