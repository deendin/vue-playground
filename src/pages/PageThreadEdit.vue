<template>
    <div class="col-full push-top">

        <h1>Edit <i>{{thread.title}}</i></h1>

        <!--  By Using this component, we listen to the save event and the cancel event in the ThreadEditor component.-->
        <ThreadEditor
            :title="thread.title"
            :text="text"
            @save="save"
            @cancel="cancel"
        />
    </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor'

export default {
  props: {
    id: {
        type: String,
        required: true
    }
  },

  components: {
    ThreadEditor
  },
  
  computed: {
    thread () {
        return this.$store.state.threads[this.id]
    },

    text () {
        return this.$store.state.posts[this.thread.firstPostId].text
    }
  },

  methods: {
    // save method receives the data emitted from the ThreadEditor component
    save ({title, text}) {
      // dispatch vuex action
      this.$store.dispatch('updateThread', {
        id: this.id,
        title,
        text
      }).then(thread => { //since the createThread action returns a promise, we can attach a .then
        this.$router.push({name: 'ThreadShow', params: {id: this.id}})

      })

    },
    cancel () {
      this.$router.push({name: 'ThreadShow', params: {
        id: this.id}
      })
    }
  },
  created() {
    console.log('cool',this.thread)
    console.log(this.$store.state.threads[this.id].title);
  }
}
</script>

<style scoped>

</style>