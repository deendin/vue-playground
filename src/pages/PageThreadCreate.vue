<template>
    <div class="col-full push-top">

        <h1>Create new thread in <i>{{forum.name}}</i></h1>

        <!--  By Using this component, we listen to the save event and the cancel event in the ThreadEditor component.-->
        <ThreadEditor
          @save="save"
          @cancel="cancel"
        />
    </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor'

export default {
  props: {
    forumId: {
        type: String,
        required: true
    }
  },

  components: {
    ThreadEditor
  },
  
  computed: {
    forum () {
        return this.$store.state.forums[this.forumId]
    }
  },

  methods: {
    // save method receives the data emitted from the ThreadEditor component
    save ({title, text}) {
      // dispatch vuex action
      this.$store.dispatch('createThread', {
        forumId: this.forum['.key'],
        title,
        text
      }).then(thread => { //since the createThread action returns a promise, we can attach a .then
        this.$router.push({name: 'ThreadShow', params: {id: thread['.key']}})

      })

    },
    cancel () {
        this.$router.push({name: 'Forum', params: {id: this.forum['.key']}})

    }
  }
}
</script>

<style scoped>

</style>