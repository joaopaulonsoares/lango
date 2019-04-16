/**
 *
 * Asynchronously loads the component for ChatItem
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
