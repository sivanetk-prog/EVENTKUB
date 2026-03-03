let mode = 'CREATE'
let selectedId = ''

window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')

  if (id) {
    mode = 'EDIT'
    selectedId = id
    try {
      const response = await api.users.getById(id)
      const user = response.data

      document.querySelector('input[name=firstname]').value = user.firstname
      document.querySelector('input[name=lastname]').value = user.lastname
      document.querySelector('input[name=age]').value = user.age
      document.querySelector('textarea[name=description]').value = user.description

      document.querySelectorAll('input[name=gender]').forEach(el => {
        if (el.value === user.gender) el.checked = true
      })
      document.querySelectorAll('input[name=interest]').forEach(el => {
        if (user.interests.includes(el.value)) el.checked = true
      })
    } catch (error) {
      console.log('error', error)
    }
  }
}

const submitData = async () => {
  const interestDOMs = document.querySelectorAll('input[name=interest]:checked')
  const interests = Array.from(interestDOMs).map(el => el.value).join(', ')

  const userData = {
    firstname: document.querySelector('input[name=firstname]').value,
    lastname: document.querySelector('input[name=lastname]').value,
    age: document.querySelector('input[name=age]').value,
    gender: (document.querySelector('input[name=gender]:checked') || {}).value,
    interests,
    description: document.querySelector('textarea[name=description]').value
  }

  const messageDOM = document.getElementById('message')

  try {
    if (mode === 'CREATE') {
      await api.users.create(userData)
      messageDOM.innerText = 'บันทึกข้อมูลสำเร็จ!'
    } else {
      await api.users.update(selectedId, userData)
      messageDOM.innerText = 'แก้ไขข้อมูลสำเร็จ!'
    }
    messageDOM.className = 'message success'
  } catch (error) {
    if (error.response) {
      error.message = error.response.data.message
      error.errors = error.response.data.errors
    }
    let html = `<div>${error.message}</div><ul>`
    ;(error.errors || []).forEach(e => { html += `<li>${e}</li>` })
    html += '</ul>'
    messageDOM.innerHTML = html
    messageDOM.className = 'message danger'
  }
}
