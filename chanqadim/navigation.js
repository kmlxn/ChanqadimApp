import { Actions } from 'react-native-router-flux'

export function goToBundle (bundle) {
  Actions.bundle({bundle, title: bundle.name})
}

export function goToCategory (category) {
  Actions.category({category, title: category.name})
}

export function goToProfileEdit (user) {
  Actions.editProfile({user, title: user.username})
}
