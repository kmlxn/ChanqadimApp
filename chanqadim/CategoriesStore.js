import { computed, observable, observe, action } from "mobx"
import { Actions } from 'react-native-router-flux';
import { ListView } from 'react-native'
import * as dataManager from './dataManager'


export class CategoryStore {
  @observable categories = []
  @observable bundles = []
  @observable user = {}
  @observable filter = ""
  @observable isLogged = true
  @observable errorMessage = false
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  bundlesDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  userBundlesDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

  @computed get dataSource() {
    var matchesFilter = new RegExp(this.filter, "i")
    return this.ds.cloneWithRows(this.categories.filter(category => !this.filter || matchesFilter.test(category.name)));
  }

  @computed get bundlesDataSource() {
    return this.bundlesDS.cloneWithRows(this.bundles.slice());
  }

  @computed get userBundlesDataSource() {
    return this.userBundlesDS.cloneWithRows(this.user.bundles ? this.user.bundles.slice() : [])
  }

  constructor() {
    this.checkAuth()
    this.loadCategories()
    this.isLogged = true;
  }

  checkAuth() {
    observe(this, 'isLogged', change => {
      if (change === false)
        Actions.login({type: 'reset'})
      else
        Actions.home({type: 'reset'})
    })
  }

  @action addCategories(categories) {
    this.categories = categories
  }

  @action addBundles(bundles) {
    this.bundles = bundles
  }

  @action addUser(user) {
    this.user = user
  }

  @action logIn() {
    this.isLogged = true
  }

  @action logOut() {
    this.isLogged = false
  }

  async login(user, password) {
    const status = await dataManager.login(user, password)
    this.logIn()
  }

  async loadCategories() {
    const data = await dataManager.getCategories()
    if (data === 'not authenticated' || data === 'access denied')
      this.logOut()
    else
      this.addCategories(data.results)
  }

  async loadBundles(category) {
    const data = await dataManager.getBundles(category.url)
    if (data === 'not authenticated' || data === 'access denied')
      this.logOut()
    else
      this.addBundles(data.bundles)
  }

  async loadUser() {
    const data = await dataManager.getUser()
    if (data === 'not authenticated' || data === 'access denied')
      this.logOut()
    else
      this.addUser(data)
  }
}

export default new CategoryStore