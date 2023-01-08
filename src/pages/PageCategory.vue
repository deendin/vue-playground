<template>
    <div>
      <h1>{{ category.name }}</h1>
      <CategoryListItem :category="category"/>
    </div>
</template>

<script>
  import CategoryListItem from '@/components/CategoryListItem'
  export default {
    components: {
      CategoryListItem
    },
    props: {
      id: {
        required: true,
        type: String
      }
    },

    computed: {
      category () {
        return this.$store.state.categories[this.id]
      }
    },

    created()
    {
      console.log('ajjaja');
      console.log(this.id)
    }
  }
</script>

<style scoped>

</style>