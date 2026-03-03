window.onload = async () => {
  await loadData()
}

const loadData = async () => {
  try {
    const response = await api.users.getAll()
    const users = response.data

    let html = '<table><thead><tr><th>ID</th><th>ชื่อ</th><th>อายุ</th><th>เพศ</th><th>จัดการ</th></tr></thead><tbody>'
    for (const user of users) {
      html += `<tr>
        <td>${user.id}</td>
        <td>${user.firstname} ${user.lastname}</td>
        <td>${user.age}</td>
        <td>${user.gender}</td>
        <td>
          <a href="../register/?id=${user.id}"><button>แก้ไข</button></a>
          <button class="delete" data-id="${user.id}">ลบ</button>
        </td>
      </tr>`
    }
    html += '</tbody></table>'

    document.getElementById('user').innerHTML = html

    document.querySelectorAll('.delete').forEach(btn => {
      btn.addEventListener('click', async (event) => {
        const id = event.target.dataset.id
        if (!confirm('ยืนยันการลบ?')) return
        try {
          await api.users.remove(id)
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
