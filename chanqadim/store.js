import { computed, observable, observe, action } from "mobx"
import { Actions } from 'react-native-router-flux';
import { ListView } from 'react-native'
import * as dataManager from './dataManager'


export class Store {
  @observable categories = []
  @observable bundles = []
  @observable bundle = {}
  @observable user = {}
  @observable filter = ""
  @observable isLogged = true
  @observable errorMessage = false
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  bundlesDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  bundleProductsDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  userBundlesDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

  @computed get dataSource() {
    var matchesFilter = new RegExp(this.filter, "i")
    return this.ds.cloneWithRows(this.categories.filter(category => !this.filter || matchesFilter.test(category.name)));
  }

  @computed get bundlesDataSource() {
    return this.bundlesDS.cloneWithRows(this.bundles.slice());
  }

  @computed get bundleProductsDataSource() {
    return this.bundleProductsDS.cloneWithRows(this.bundle.products ? this.bundle.products.slice() : []);
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
        Actions.browse({type: 'reset'})
    })
  }

  @action addCategories(categories) {
    this.categories = categories
  }

  @action addBundles(bundles) {
    this.bundles = bundles
  }

  @action addBundle(bundle) {
    this.bundle = bundle;
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

  async loadCategories(onLoad) {
    const data = await dataManager.getCategories()
    if (data === 'not authenticated' || data === 'access denied')
      this.logOut()
    else {
      this.addCategories(data.results)
      onLoad && onLoad()
    }
  }

  async loadBundles(category) {
    const data = await dataManager.getBundles(category.url)
    if (data === 'not authenticated' || data === 'access denied')
      this.logOut()
    else
      this.addBundles(data.bundles)
  }

  async loadBundle(bundle) {
    const data = await dataManager.getBundles(bundle.url)
    if (data === 'not authenticated' || data === 'access denied')
      this.logOut()
    else
      this.addBundle(data)
  }

  async loadUser() {
    const data = await dataManager.getUser()
    if (data === 'not authenticated' || data === 'access denied')
      this.logOut()
    else
      this.addUser(data)
  }

  async uploadBundle(bundle) {
    const data = await dataManager.uploadBundle(bundle)
    if (data === 'not authenticated' || data === 'access denied')
      this.logOut()
    else
      this.addBundle(data)
  }

  async uploadProduct(product) {
    const data = await dataManager.uploadProduct(product)
    if (data === 'not authenticated' || data === 'access denied')
      this.logOut()
    else
      this.addBundle(data)
  }
}

export default new Store