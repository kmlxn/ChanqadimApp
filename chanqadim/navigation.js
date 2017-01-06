import { Actions } from 'react-native-router-flux';

export function goToBundle(bundle) {
  Actions.bundle({bundle, title: bundle.name})
}