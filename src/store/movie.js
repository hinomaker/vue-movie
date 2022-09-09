import axios from 'axios'
import _ from 'lodash'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default{
  namespaced : true,
  state : () => ({
    movies : [],
    message : _defaultMessage,
    loading : false,
    theMovie : {}
  }),
  getters : {},
  mutations : {
    updateState(state, payload){
      Object.keys(payload).forEach(key =>{
        state[key] = payload[key]
      })
    },  
    resetMovies(state){
      state.movies=[]
      state.message=_defaultMessage
      state.loading = false
    }
  },
  actions : {
    async searchMovies({state, commit}, payload){
      commit('updateState', {
        message: ''
      })

      try{
        const res = await _fetchMovie({
          ...payload,
          page : 1
        })
        const {Search, totalResults} = res.data
        commit('updateState', {
          movies : _.uniqBy(Search, 'imdbID')
        })

        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)
      
         if(pageLength > 1){
          // 2페이지 이상으로 항목이 검색 될 경우 추가적인 영화들이 있다는 이야기
          // 추가 요청해야함
           for(let page = 2; page <= pageLength; page+= 1){
              if(page > (payload.number / 10)) break
          
              const res = await _fetchMovie({
              ...payload,
              page
              })
              const {Search} = res.data
              commit('updateState', {
               movies: [
                ...state.movies, 
                ..._.uniqBy(Search, 'imdbID')
               ]
              })
           }
          }
        }catch(message){
         commit('updateState', {
            movies: [],
            message
          })
        }
    },

    async searchMovieWithId({state, commit}, payload){
      if(state.loading) return
      commit('updateState', {
        theMovie : {},
        loading : true
      })
      try {
        const res = await _fetchMovie(payload)
        commit('updateState', {
          theMovie : res.data
        })
      } catch (error) {
        commit('updateState', {
          theMovie:{}
        })  
      } finally{
        commit('updateState',{
          loading : false
        })
      }
    }
  }
}

function _fetchMovie(payload){
  const {title, type, year, page, id} = payload
  const OMDB_API_KEY = '7035c60c'
  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        if(res.data.Error){
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch(err => {
        reject(err.message)
      })
  })
}