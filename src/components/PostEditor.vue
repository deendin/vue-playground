<template>
    <form @submit.prevent="save">
        <div class="form-group">
            <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            class="form-input"
            v-model="text"
            >

            </textarea>
        </div>

        <div class="form-actions">
            <button v-if="isUpdate" @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
            <button class="btn-blue">{{ isUpdate ? 'Update' : 'Submit Post' }}</button>
        </div>
    </form>
</template>

<script>
export default {
  props: {
    threadId: {
      required: false
    },

    post: {
        type: Object,
        // custom validator
        validator: obj => {
            const keyIsValid = typeof obj['.key'] === 'string'
            const textIsValid = typeof obj.text === 'string'

            const isValidData = keyIsValid && textIsValid

            if (!textIsValid) {
                console.error('The post prop object must include a `text` attribute')
            }

            if(!keyIsValid) {
                console.error('The post prop object must include a `text` attribute')
            }
            
            return isValidData
        }
    }
  },
    data () {
        return {
        text: this.post ? this.post.text : ''
        }
    },

    computed: {
        /**
         * If the post props is passed, it means that we are updating an existing post.
         * 
         */
        isUpdate () {
            return !!this.post
        }
    },

  methods: {
    save () {
        this.persist()
            .then(post => {
                // once the persist method returns a promise, emit the event
                this.$emit('save', {post})
            })

        //   this.isUpdate ? this.update() : this.create()
        //   this.$emit('save', {post})
    },

    create () {
        const post = {
            text: this.text,
            threadId: this.threadId
            // userId: 'jUjmgCurRRdzayqbRMO7aTG9X1G2',
            // '.key': postId
        }

        this.text = ''
        /**
         *
         * Emit (event) the newly created post from this (child component - PostEditor.vue).
         * to the parent component (PostThreadShow) or any other parent component
         * that is using this child component.
         */
        // this.$emit('save', {post: post})
        console.log('d')
        // dispatch the create post action
        return this.$store.dispatch('createPost', post)
    },

    update () {
        const payload = {
            id: this.post['.key'],
            text: this.text
        }

        return this.$store.dispatch('updatePost', payload)
            // .then(post => {
            //     // Once done with the update, give signal to the parent component
            //     // so it can toggle between edit or show post.
            //     this.$emit('save', {post})
            // })
    },

    /**
     * @eturns Promise
     */
    persist () {
        return this.isUpdate ? this.update() : this.create()
    },

    cancel () {
        this.$emit('cancel')
    },
  }
}
</script>

<style scoped>

</style>