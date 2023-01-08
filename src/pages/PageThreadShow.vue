<template>
    <div class="col-large push-top">
      <h1>
        {{ thread.title }}

        <router-link
          :to="{name: 'ThreadEdit', id: this.id}"
          class="btn-green btn-small"
          tag="button"
        >
          Edit Thread
        </router-link>
      </h1>
      <p>
          By <a href="#" class="link-unstyled">{{ user.name }}</a>, <AppDate :timestamp="thread.publishedAt"/>.
          <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">{{ repliesCount }} replies by {{ contributorsCount }} contributors</span>
      </p>

      <PostList :posts="posts"/>
      <PostEditor 
        :threadId="id"
      />

      
    </div>
</template>

<script>
import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'
export default {
  components: {
    PostList,
    PostEditor
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },

  computed: {
    /**
     * Finds the posts of the active/currently viewed thread.
     */
    posts () {
      const postIds = Object.values(this.thread.posts)
      return Object.values(this.$store.state.posts)
        .filter(post => postIds.includes(post['.key']))
    },

    thread () {
      return this.$store.state.threads[this.id]
    },

    repliesCount () {
      return this.$store.getters.threadRepliesCount(this.thread['.key'])
      // return countObjectproperties(this.thread) - 1
      // return Object.keys(this.thread.posts).length - 1
    },

    user () {
      return this.$store.state.users[this.thread.userId]
    },

    contributorsCount () {
      // find the replies
      const replies = Object.keys(this.thread.posts)
        .filter(postId => postId !== this.thread.firstPostId)
        .map(postId => this.$store.state.posts[postId])

      // get the user ids
      // using map to create a new array that contains the post object
      const userIds = replies.map(post => post.userId)

      // count the unique ids
      return userIds.filter((item, index) => index === userIds.indexOf(item)).length
    }
  },

  methods: {
    /**
     * Gets triggered when someone clicks submit in the PostEditor child component.
     * This is simply a listener that gets triggered
     * when the save-post event is been called/triggered.
     *
     */
    // addPost ({eventData}) {
    //   console.log(eventData)
    //   const post = eventData.post
    //   const postId = post['.key']

    //   // Update the dom reactively
    //   this.$set(sourceData.posts, postId, post)
    //   this.$set(this.thread.posts, postId, postId)

    //   // update the user post count
    //   this.$set(sourceData.users[post.userId].posts, postId, postId)
    // }
    addPost ({post}) {  // array destructuring
      // dispatch the create post action
      this.$store.dispatch('createPost', post)

      // this.$set(this.$store.state.posts, postId, post)
      // this.$set(this.$store.state.thread.posts, postId, postId)

      // // update the user post count
      // this.$set(this.$store.state.users[post.userId].posts, postId, postId)
    }
  }
}
</script>