const appConfirm = (message, options = {}) => {
  const title = options.title || 'ยืนยันรายการ'
  const confirmLabel = options.confirmLabel || 'ตกลง'
  const cancelLabel = options.cancelLabel || 'ยกเลิก'

  return new Promise((resolve) => {
    const overlay = document.createElement('div')
    overlay.className = 'modal-overlay'

    overlay.innerHTML = `
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-label="${title}">
        <div class="modal-title">${title}</div>
        <div class="modal-text">${message}</div>
        <div class="modal-actions">
          <button type="button" class="button button-secondary modal-cancel">${cancelLabel}</button>
          <button type="button" class="button button-primary modal-confirm">${confirmLabel}</button>
        </div>
      </div>
    `

    const cleanup = (result) => {
      overlay.remove()
      document.removeEventListener('keydown', onKeydown)
      resolve(result)
    }

    const onKeydown = (event) => {
      if (event.key === 'Escape') cleanup(false)
    }

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) cleanup(false)
    })

    overlay.querySelector('.modal-cancel').addEventListener('click', () => cleanup(false))
    overlay.querySelector('.modal-confirm').addEventListener('click', () => cleanup(true))

    document.addEventListener('keydown', onKeydown)
    document.body.appendChild(overlay)
    overlay.querySelector('.modal-confirm').focus()
  })
}
