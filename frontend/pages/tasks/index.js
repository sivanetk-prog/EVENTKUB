window.onload = async () => {
  await Promise.all([loadEvents(), loadUsers()])
  await loadData()
}

const loadEvents = async () => {
  try {
    const response = await api.events.getAll()
    const select = document.getElementById('event_id')
    select.innerHTML = '<option value="">-- เลือกกิจกรรม --</option>'

    response.data.forEach(event => {
      const option = document.createElement('option')
      option.value = event.id
      option.textContent = `${event.name} (${event.registered_count}/${event.max_participants})`
      select.appendChild(option)
    })
  } catch (error) {
    console.log(error)
  }
}

const loadUsers = async () => {
  try {
    const response = await api.users.getAll()
    const select = document.getElementById('user_id')
    select.innerHTML = '<option value="">-- เลือกผู้ใช้ --</option>'

    response.data.forEach(user => {
      const option = document.createElement('option')
      option.value = user.id
      option.textContent = `${user.firstname} ${user.lastname}`
      select.appendChild(option)
    })
  } catch (error) {
    console.log(error)
  }
}

const loadData = async () => {
  try {
    const [eventsResponse, registrationsResponse] = await Promise.all([
      api.events.getAll(),
      api.registrations.getAll()
    ])

    const events = eventsResponse.data
    const registrations = registrationsResponse.data

    let html = ''

    events.forEach(event => {
      const participants = registrations.filter(item => Number(item.event_id) === Number(event.id))
      let participantHtml = ''

      if (participants.length === 0) {
        participantHtml = '<div class="card-meta">ยังไม่มีผู้ลงทะเบียน</div>'
      } else {
        participantHtml = '<div class="form-card" style="padding:0;overflow:hidden;margin-top:12px;"><table><thead><tr><th>ชื่อผู้เข้าร่วม</th><th>เวลาลงทะเบียน</th><th>จัดการ</th></tr></thead><tbody>'
        participants.forEach(item => {
          participantHtml += `<tr>
            <td>${item.firstname} ${item.lastname}</td>
            <td>${formatDateTime(item.registered_at)}</td>
            <td><button class="button button-outline-danger remove-registration" data-id="${item.id}">ยกเลิก</button></td>
          </tr>`
        })
        participantHtml += '</tbody></table></div>'
      }

      html += `<div class="card">
        <div class="card-title">${event.name}</div>
        <div class="card-meta">วันที่ ${event.event_date} | สถานที่ ${event.location}</div>
        <div class="card-meta">ผู้เข้าร่วม ${event.registered_count}/${event.max_participants} คน</div>
        ${participantHtml}
      </div>`
    })

    if (!html) {
      html = '<div class="card"><div class="card-meta">ยังไม่มีกิจกรรม</div></div>'
    }

    document.getElementById('tasks').innerHTML = html

    document.querySelectorAll('.remove-registration').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const confirmed = await appConfirm('ยืนยันการยกเลิกการลงทะเบียน?', { title: 'ยกเลิกการลงทะเบียน' })
        if (!confirmed) return

        try {
          await api.registrations.remove(e.target.dataset.id)
          await Promise.all([loadEvents(), loadData()])
        } catch (error) {
          console.log(error)
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

const submitData = async () => {
  const messageDOM = document.getElementById('message')
  const data = {
    event_id: document.getElementById('event_id').value,
    user_id: document.getElementById('user_id').value
  }

  try {
    await api.registrations.create(data)
    messageDOM.innerText = 'ลงทะเบียนสำเร็จ!'
    messageDOM.className = 'message success'
    document.getElementById('event_id').value = ''
    document.getElementById('user_id').value = ''
    await Promise.all([loadEvents(), loadData()])
  } catch (error) {
    const msg = error.response?.data?.message || error.message
    const errors = error.response?.data?.errors || []
    let html = `<div>${msg}</div><ul>`
    errors.forEach(item => { html += `<li>${item}</li>` })
    html += '</ul>'
    messageDOM.innerHTML = html
    messageDOM.className = 'message danger'
  }
}

const formatDateTime = (value) => {
  if (!value) return '-'
  return new Date(value).toLocaleString('th-TH')
}
