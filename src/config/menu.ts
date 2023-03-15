import { el, mount, unmount } from 'redom'
import type { Config } from './config.js'
import './config.style.css'

export class ConfigMenu {
  private overlay: HTMLDivElement

  constructor(private readonly config: Config) {
    this.generateMenu()

    document.addEventListener('keydown', (event) => {
      if (event.code === 'KeyQ' && event.ctrlKey) {
        this.open()
      }
    })
  }

  private generateMenu() {
    const form = el('form', {
      className: 'mt_form',
      onsubmit: (event: SubmitEvent) => this.onSubmit(event, form)
    })

    const configs = Object.entries(this.config.data)
    for (const [configKey, initialValue] of configs) {
      const { description, type } = this.config.configMeta[configKey]!

      const input = el('input', {
        type,
        name: configKey,
        value: initialValue,
        className: 'mt_input'
      })

      const label = el(
        'label',
        {
          for: configKey,
          className: 'mt_label'
        },
        description
      )

      const div = el('div', [label, input])
      form.appendChild(div)
    }

    const buttonSubmit = el(
      'button',
      {
        type: 'submit',
        className: 'mt_button mt_button_submit'
      },
      'Сохранить'
    )

    const buttons = el('div', buttonSubmit)
    form.appendChild(buttons)

    const closeModalButton = el(
      'button',
      {
        className: 'mt_modal_close',
        onclick: () => this.close()
      },
      '✖'
    )

    const modal = el(
      'div',
      {
        className: 'mt_modal'
      },
      closeModalButton,
      form
    )

    this.overlay = el(
      'div',
      {
        className: 'modal__backdrop'
      },
      modal
    )
  }

  private onSubmit(event: SubmitEvent, form: HTMLFormElement): void {
    event.preventDefault()
    const formData = new FormData(form)
    const data: Record<string, any> = {}

    for (const [key, value] of formData.entries()) {
      switch (this.config.configMeta[key]!.type) {
        case 'text':
          data[key] = value.toString().toLowerCase().split(',')
          break
        case 'number':
          data[key] = Number(value)
          break
      }
    }

    this.config.write(data)
    this.config.read()
  }

  open(): void {
    mount(document.body, this.overlay)
  }

  close(): void {
    unmount(document.body, this.overlay)
  }
}
