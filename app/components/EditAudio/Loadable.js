/**
 *
 * Asynchronously loads the component for EditAudio
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
