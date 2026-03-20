let mode = 'CREATE'
let selectedId = ''

window.onload = async () => {
  await loadUsers()
  await loadData()
}

const loadUsers = async () => {
  try {
    const response = await api.users.getAll()
    const select = document.getElementById('created_by')
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
    const response = await api.events.getAll()
    const events = response.data

    let html = '<div class="form-card" style="padding:0;overflow:hidden;"><table><thead><tr><th>ID</th><th>กิจกรรม</th><th>วัน / สถานที่</th><th>จำนวน</th><th>ผู้สร้าง</th><th>จัดการ</th></tr></thead><tbody>'
    for (const event of events) {
      html += `<tr>
        <td>${event.id}</td>
        <td>${event.name}<br><small>${event.description || ''}</small></td>
        <td>${event.event_date}<br><small>${event.location}</small></td>
        <td>${event.registered_count}/${event.max_participants}</td>
        <td>${event.firstname} ${event.lastname}</td>
        <td>
          <div class="btn-row">
            <button class="button button-outline-edit edit"
              data-id="${event.id}"
              data-name="${event.name}"
              data-description="${event.description || ''}"
              data-location="${event.location}"
              data-event-date="${event.event_date}"
              data-max-participants="${event.max_participants}"
              data-created-by="${event.created_by}">แก้ไข</button>
            <button class="button button-outline-danger delete" data-id="${event.id}">ลบ</button>
          </div>
        </td>
      </tr>`
    }
    html += '</tbody></table></div>'
    document.getElementById('projects').innerHTML = html

    document.querySelectorAll('.edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const d = e.target.dataset
        mode = 'EDIT'
        selectedId = d.id
        document.getElementById('name').value = d.name
        document.getElementById('description').value = d.description
        document.getElementById('location').value = d.location
        document.getElementById('event_date').value = d.eventDate
        document.getElementById('max_participants').value = d.maxParticipants
        document.getElementById('created_by').value = d.createdBy
        document.getElementById('submit-btn').textContent = 'บันทึกการแก้ไข'
        document.getElementById('cancel-btn').style.display = 'inline-block'
      })
    })

    document.querySelectorAll('.delete').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const confirmed = await appConfirm('ยืนยันการลบกิจกรรม?', { title: 'ลบกิจกรรม' })
        if (!confirmed) return

        try {
          await api.events.remove(e.target.dataset.id)
          await loadData()
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
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    location: document.getElementById('location').value,
    event_date: document.getElementById('event_date').value,
    max_participants: document.getElementById('max_participants').value,
    created_by: document.getElementById('created_by').value
  }

  try {
    if (mode === 'CREATE') {
      await api.events.create(data)
      messageDOM.innerText = 'สร้างกิจกรรมสำเร็จ!'
    } else {
      await api.events.update(selectedId, data)
      messageDOM.innerText = 'แก้ไขกิจกรรมสำเร็จ!'
      cancelEdit()
    }

    messageDOM.className = 'message success'
    clearForm()
    await loadData()
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

const clearForm = () => {
  document.getElementById('name').value = ''
  document.getElementById('description').value = ''
  document.getElementById('location').value = ''
  document.getElementById('event_date').value = ''
  document.getElementById('max_participants').value = ''
  document.getElementById('created_by').value = ''
}

const cancelEdit = () => {
  mode = 'CREATE'
  selectedId = ''
  clearForm()
  document.getElementById('submit-btn').textContent = '+ สร้างกิจกรรม'
  document.getElementById('cancel-btn').style.display = 'none'
  document.getElementById('message').className = 'message'
}
