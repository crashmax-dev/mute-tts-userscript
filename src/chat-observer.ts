import type { Config } from './config/config.js'

export function chatObserver(
  config: Config,
  callback: (message: HTMLElement, username: string) => void
) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      const nodes = Object.values(
        mutation.addedNodes as unknown as HTMLElement[]
      )
      const lineIndex = nodes.findIndex((node) => {
        const el = node.querySelector<HTMLElement>(
          '.live-message-separator-line__hr'
        )
        return Boolean(el)
      })

      const addedNodes = lineIndex !== -1 ? nodes.slice(0, lineIndex) : nodes

      console.log({ addedNodes, lineIndex })

      for (const element of addedNodes) {
        const message = element
        const isRecentMuted = message.classList.contains('muted')
        if (isRecentMuted) return

        const isChatMessage = message.classList.contains('chat-line__message')
        if (isChatMessage) {
          const username = message
            .querySelector('.chat-author__display-name')!
            .textContent!.toLowerCase()

          const { targetsUsernames } = config.data
          if (!targetsUsernames.length || targetsUsernames.includes(username)) {
            message.classList.add('muted')
            callback(message, username)
          }
        }
      }
    }
  })

  return observer
}
