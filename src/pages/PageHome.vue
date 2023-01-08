<template>
  <div class="col-full push-top">
    <h1>Welcome to the Forum.</h1>
    <CategoryList :categories="categories"/>
  </div>
  
  <!-- <div>
    <h1>Welcome to the Forum</h1>

    <div v-for="thread in threads">
      <h2>{{ thread.title }}</h2>

      <div v-for="postId in thread.posts">
        <p><b>Post By: </b>{{ users[posts[postId].userId].name }}</p>
        <p>{{  posts[postId].text }}</p>

      </div>
    </div>
  </div> -->
</template>

<script>
import CategoryList from '@/components/CategoryList.vue'
export default {
  components: {
    CategoryList
  },
  props: {
  },
  computed: {
    categories () {
      return Object.values(this.$store.state.categories)
    }
  }
}
</script>

