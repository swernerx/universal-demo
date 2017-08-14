/* global __webpack_require__ */

import { CHUNK_NAMES } from 'react-universal-component'

export default function loadMessages(lang) {
  // Note: `import()` is always rewritten by babel-plugin-universal-import.
  // It does not differ between client and server code.
  const wrapped = import(`./messages/${lang}`)

  if (process.env.TARGET === 'web') {
    return wrapped.then(msgs => msgs.default)
  }

  const chunkName = wrapped.chunkName()
  CHUNK_NAMES.push(chunkName) // AND DONE! HURRAY!

  return __webpack_require__(wrapped.resolve(lang)).default
}
