import { computed, observable, observe } from "mobx"
import { Actions } from 'react-native-router-flux';
import { ListView } from 'react-native'


class Category {
  @observable name
  @observable id

  constructor(name) {
    this.name = name
    this.id = Math.random()
  }
}

export class CategoryStore {
  @observable categories = []
  @observable filter = ""
  @observable isLogged = true
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

  @computed get dataSource() {
    var matchesFilter = new RegExp(this.filter, "i")
    return this.ds.cloneWithRows(this.categories.filter(category => !this.filter || matchesFilter.test(category.name)));
  }

  constructor() {
    this.categories.push(new Category('meat'))
    this.categories.push(new Category('juice'))
    this.categories.push(new Category('bread'))
    this.categories.push(new Category('meat'))
    this.categories.push(new Category('juice'))
    this.categories.push(new Category('bread'))

    observe(this, 'isLogged', (change) => {
      if (change === false)
        Actions.login({type: 'reset'})
      else
        Actions.home({type: 'reset'})
    })
  }

  createCategory(name) {
    this.categories.push(new Category(name))
  }

  login(username, password) {
    setTimeout(() => this.isLogged = true, 1500);
  }
}

export default new CategoryStore