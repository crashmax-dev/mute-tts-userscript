import { chatListener } from './chat.js'
import { Config } from './config/config.js'

window.addEventListener('load', () => {
  const config = new Config()
  const { observe } = chatListener(config)
  const { history } = window
  const { pushState, replaceState } = history

  history.pushState = (...args) => {
    pushState.apply(history, args)
    observe()
  }

  history.replaceState = (...args) => {
    replaceState.apply(history, args)
    observe()
  }

  observe()
})
