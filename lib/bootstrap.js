import {loadProjects, setUser, updateData} from './actions'
import {lock} from './auth0'
import ProjectStore from './project-store'
import getDataForModifications from './get-data-for-modifications'

export default function bootstrap (store) {
  refreshToken(store, lock.getClient())

  store.projectStore = new ProjectStore(store)

  store.projectStore
    .getProjects()
    .then((projects) => store.dispatch(loadProjects(projects)))

  getDataForModifications({ modifications: [], bundleId: null })
    .then((data) => store.dispatch(updateData(data)))

  // TODO: Split this up and move it
  // debug: log state changes
  store.subscribe(() => {
    const state = store.getState()
    console.log(store.getState())
    window.requestAnimationFrame(function () {
      window.localStorage.setItem('state', JSON.stringify(state))
    })
  })
}

function refreshToken (store, auth0) {
  const {user} = store.getState()
  if (user && user.refresh_token) {
    auth0.refreshToken(user.refresh_token, function (err, delegationResult) {
      if (err) {
        store.dispatch(setUser(null))
      } else {
        user.id_token = delegationResult.id_token
        store.dispatch(setUser(user))
      }
    })
  }
}