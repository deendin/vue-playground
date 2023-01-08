<template>
    <div>
        <form @submit.prevent="save">
            <div class="form-group">
                <label for="thread_title">Title:</label>
                <input v-model="form.title" type="text" id="thread_title" class="form-input" name="title">
            </div>

            <div class="form-group">
                <label for="thread_content">Content:</label>
                <textarea v-model="form.text" id="thread_content" class="form-input" name="content" rows="8" cols="140"></textarea>
            </div>

            <div class="btn-group">
                <button @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
                <button class="btn btn-blue" type="submit" name="Publish">{{ isUpdate ? 'Update' : 'Publish' }} </button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        props: {
            title : {
                type: String,
                default: ''
            },
            text: {
                type: String,
                default: ''
            }
        }, 
        data () {
            return {
                form: {
                    title: this.title,
                    text: this.text
                }
            }
        },
        methods: {
            /**
             * Emit an event and let the parent component handle it 
             * or handle the response after a thread has been created/edited
             * 
             * E.g, when we emit a thread create event / save event here, a Parent component 
             * like PageThreadCreate can use this component and listen for this event (thread create event / save event).
             */
            save () {
                this.$emit('save', {title: this.form.title, text: this.form.text})
            },

            cancel () {
                this.$emit('cancel')
            }
        },

        computed: {
            isUpdate() {
                // convert variable to boolean using !!
                // it checks if the title has value and returns true else return false.
                return !!this.title
            }
        }
    }

</script>

<style scoped>

</style>