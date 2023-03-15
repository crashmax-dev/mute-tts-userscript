import { LocalStorage } from '@zero-dependency/storage'
import { ConfigMenu } from './menu.js'

export interface ConfigData {
  muteMs: number
  targetsUsernames: string[]
  commandsList: string[]
}

export class Config {
  #data: ConfigData
  private readonly config: LocalStorage<ConfigData>
  private readonly defaultOptions: ConfigData = {
    muteMs: 5000,
    targetsUsernames: ['b0do4ka', 'vs_code'],
    commandsList: ['ттс', 'tts']
  }
  readonly configMeta: Record<
    string,
    {
      description: string
      type: string
    }
  > = {
    commandsList: {
      description: 'Список команд',
      type: 'text'
    },
    muteMs: {
      description: 'Время мута (ms)',
      type: 'number'
    },
    targetsUsernames: {
      description: 'Мутить пользователей',
      type: 'text'
    }
  }

  constructor() {
    this.config = new LocalStorage<ConfigData>(
      'mute-tts-userscript',
      this.defaultOptions
    )
    this.read()
    new ConfigMenu(this)
  }

  get data() {
    return this.#data
  }

  read(): ConfigData {
    this.#data = this.config.values
    return this.data
  }

  write(data: Partial<ConfigData>): void {
    this.config.write((v) => {
      const newData = Object.assign(v, data)
      this.#data = newData
      return v
    })
  }
}
