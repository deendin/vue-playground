<template>
    <div class="forum-wrapper">
        <div class="col-full push-top">
            <div class="forum-header">
                <div class="forum-details">
                    <h1>{{forum.name}}</h1>
                    <p class="text-lead">{{forum.description}}</p>
                </div>
                <router-link 
                    :to="{name: 'ThreadCreate', params: {forumId: this.forum['.key']}}"
                    class="btn-green btn-small"
                    >
                    Start a thread
                </router-link>
            </div>
        </div>

        <div class="col-full push-top">
            <ThreadList :threads="threads"/>
        </div>
  </div>
</template>

<script>
import ThreadList from '@/components/ThreadList'
export default {
  methods: {
  },
  components: {
    ThreadList
  },
  props: {
    forumId: {
      type: String,
      required: true
    }
  },

  computed: {
    forum () {
      return this.$store.state.forums[this.forumId]
    },

    threads () {
      return Object.values(this.$store.state.threads)
        .filter(thread => thread.forumId === this.forumId)
    }
  },
}
</script>

<style scoped>
    .forum-wrapper {
        width: 100%
    }
</style>