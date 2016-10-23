import { computed, observable, observe } from "mobx"
import { Actions } from 'react-native-router-flux';
import { ListView } from 'react-native'
import * as dataManager from './dataManager'

class Category {
  @observable name
  @observable image

  constructor({name, image}) {
    this.name = name
    this.image = image
  }
}

export class CategoryStore {
  @observable categories = []
  @observable filter = ""
  @observable isLogged = true
  @observable errorMessage = false
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

  @computed get dataSource() {
    var matchesFilter = new RegExp(this.filter, "i")
    return this.ds.cloneWithRows(this.categories.filter(category => !this.filter || matchesFilter.test(category.name)));
  }

  constructor() {
    observe(this, 'isLogged', (change) => {
      if (change === false)
        Actions.login({type: 'reset'})
      else
        Actions.home({type: 'reset'})
    })
    this.loadCategories()
  }

  createCategory(name) {
    this.categories.push(new Category(name))
  }

  async login(username, password) {
    const status = await dataManager.login(username, password)
    this.isLogged = true
  }

  async loadCategories() {
    const data = await dataManager.getCategories()
    if (data === 'not authenticated' || data === 'access denied')
      this.isLogged = false
    else {
      this.isLogged = true
      data.results.forEach(category => this.categories.push(new Category(category)))
    }
  }
}

export default new CategoryStore