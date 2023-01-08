import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/data'
import { countObjectproperties } from '@/utils'
Vue.use(Vuex)

const makeAppendChildToParentMutation = ({parent, child}) =>
  (state, {childId, parentId}) => {
    const resource = state[parent][parentId]

    if( !resource[child] ){
      Vue.set(resource, child, {})
    }

    Vue.set(resource[child], childId, childId)
  }

export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },

  getters: {
    authUser (state) {
      return state.users[state.authId]
    },

    userThreadsCount: state => (id) => countObjectproperties(state.users[id].threads),

    userPostsCount: state => (id) => countObjectproperties(state.users[id].posts),

    threadRepliesCount: state => id => countObjectproperties(state.threads[id].posts) - 1
  },

  actions: {
    createPost ({commit, state}, post) {
      // Update the dom reactively
      const postId = 'greatPost' + Math.random()
      post['.key'] = postId
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)

      commit('setPost', {post, postId})
      commit('appendPostToThread', {parentId: post.threadId, childId: postId})
      commit('appendPostToUser', {parentId: post.userId, childId: postId})

      return Promise.resolve(state.posts[postId])
    },

    createThread ({state, commit, dispatch}, {text, title, forumId}) {
      return new Promise((resolve, reject) => {
        const userId = state.authId
        const publishedAt = Math.floor(Date.now() / 1000)
        const threadId = 'greatThread' + Math.random()
        
        const thread = {
          '.key': threadId,
          title,
          forumId,
          publishedAt,
          userId
        }
  
        // commit to set the create thread state
        commit('setThread', {threadId, thread})
        commit('appendThreadToForum', {parentId: forumId, childId: threadId})
        commit('appendThreadToUser', {parentId: userId, childId: threadId})
  
        // dispatch thread creation so that can be a post too
        dispatch('createPost', {text, threadId})
          .then(post => {
            // once the post is created, we can update the thread too

            commit('setThread', {
              threadId, 
              thread: {...thread, firstPostId: post['.key']}
            })
          })

        // we wrap the create thread function/action in a promise so that consumers of this function can have
        // the newly created thread object and can easily use the id of the thread.
        resolve(state.threads[threadId])
      })
    },

    updatePost ({state, commit}, {id, text}) {
      return new Promise((resolve, reject) => {
          const post = state.posts[id]
          commit('setPost', {
            postId: id, post: {
              ...post, 
              text,
              edited: {
                at: Math.floor(Date.now() / 1000),
                by: state.authId
              }
            }
          })
          resolve(post)
      })
    },

    updateUser ({commit}, user) {
      commit('setUser', {userId: user['.key'], user})
    },

    updateThread ({state, commit, dispatch}, {title, text, id}) {
      return new Promise((resolve, reject) => {
        const thread = state.threads[id]
        // const post = state.posts[thread.firstPostId]
  
        // thread.title = title
        // thread.text = text
        // include all threads property along with its title
        const newThread = {...thread, title}
        // const newPost = {...post, text}
  
        // commit the corresponding mutations
        commit('setThread', {thread: newThread, threadId: id})
        // commit('setPost', {post: newPost, postId: thread.firstPostId})
        
        dispatch('updatePost', {id: thread.firstPostId, text})
          .then(() => {
            resolve(newThread)
          })
      })
    }
  },

  // Mutations are responsible for changing one piece of the state.
  mutations: {
    setUser (state, {user, userId}) {
      Vue.set(state.users, userId, user)
    },

    setPost (state, {post, postId}) {
      Vue.set(state.posts, postId, post)
    },

    setThread (state, {thread, threadId}) {
      Vue.set(state.threads, threadId, thread)
    },

    appendPostToThread: makeAppendChildToParentMutation({
      parent: 'threads', child: 'posts'
    }),

    appendPostToUser: makeAppendChildToParentMutation({
      parent: 'users', child: 'posts'
    }),

    appendThreadToForum: makeAppendChildToParentMutation({
      parent: 'forums', child: 'threads'
    }),

    appendThreadToUser: makeAppendChildToParentMutation({
      parent: 'users', child: 'threads'
    }),

    // appendPostToUser (state, {postId, userId}) {
    //   const user = state.users[userId]
    //   Vue.set(user.posts, postId, postId)
    // },
    
    // appendThreadToForum (state, {forumId, threadId}) {
    //   const forum = state.forums[forumId]

    //   if(!forum.threads) {
    //     Vue.set(forum, 'threads', {})
    //   }

    //   Vue.set(forum.threads, threadId, threadId)
    // },

    // appendThreadToUser (state, {userId, threadId}) {
    //   const user = state.users[userId]

    //   if (!user.threads) {
    //     Vue.set(user, 'threads', {})
    //   }

    //   Vue.set(user.threads, threadId, threadId)
    // }
  }
})
