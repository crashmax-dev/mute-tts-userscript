export function toggleMute(username: string, state: boolean): void {
  console.log(`Toggle mute (${username}):`, state)
  document
    .querySelector<HTMLElement>('[data-a-target="player-mute-unmute-button"]')
    ?.click()
}
