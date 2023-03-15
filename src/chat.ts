import { AsyncQueue } from './async-queue.js'
import { chatObserver } from './chat-observer.js'
import { toggleMute } from './player.js'
import { wait } from './wait.js'
import type { Config } from './config/config.js'

const STREAM_DELAY_MS = 3000

export function chatListener(config: Config) {
  const queue = new AsyncQueue()
  let isObserved = false

  function muteStream(message: string, username: string) {
    if (config.data.commandsList.includes(message.toLowerCase().slice(1)))
      return

    const mute = async () => {
      await wait(STREAM_DELAY_MS)
      toggleMute(username, true)

      await wait(config.data.muteMs)
      toggleMute(username, false)

      queue.process()
    }

    queue.add(mute)
  }

  const observer = chatObserver(config, (message, username) => {
    const textFragment = message.querySelector('.text-fragment')
    if (!textFragment) return
    if (textFragment.textContent?.charAt(0) !== '!') return
    console.log({ message: textFragment.textContent, username })
    muteStream(textFragment.textContent, username)
  })

  return {
    disconnect: () => {
      observer.disconnect()
    },
    observe: () => {
      if (isObserved) return
      const chat = document.querySelector(
        '.chat-scrollable-area__message-container'
      )
      if (chat) {
        isObserved = true
        observer.observe(chat, {
          childList: true
        })
      }
    }
  }
}
