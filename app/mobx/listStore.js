import {observable} from 'mobx'

let index = 0

class ObservableListStore {
  @observable list = []

  addListItem (item) {
    this.list.push({
      name: item,
      items: [],
      index,
      isCompleted: false,
    })
    index++
  }

  removeListItem (item) {
    this.list = this.list.filter((l) => {
      return l.index !== item.index
    })
  }

  addItem(item, name) {
    this.list.forEach((l) => {
      if (l.index === item.index) {
        l.items.push(name)
      }
    })
  }

  completeList(list, name) {
    this.list.forEach((l) => {
      console.log(l);
      if (l.index === list.index) {
        l.completed = !l.completed;
      }
    })
    // console.log(this.list);
  }
}


const observableListStore = new ObservableListStore()
export default observableListStore