const EventModel = require('../models/events')

const validateEvent = (data) => {
  const errors = []
  if (!data.name) errors.push('กรุณากรอกชื่อกิจกรรม')
  if (!data.location) errors.push('กรุณากรอกสถานที่')
  if (!data.event_date) errors.push('กรุณาเลือกวันที่จัดกิจกรรม')
  if (!data.max_participants) errors.push('กรุณากรอกจำนวนที่รับ')
  if (Number(data.max_participants) <= 0) errors.push('จำนวนที่รับต้องมากกว่า 0')
  if (!data.created_by) errors.push('กรุณาเลือกผู้สร้างกิจกรรม')
  return errors
}

const getAll = async (req, res, next) => {
  try {
    const events = await EventModel.findAll()
    res.json(events)
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const event = await EventModel.findById(req.params.id)
    if (!event) return res.status(404).json({ message: 'ไม่พบกิจกรรม' })

    const participants = await EventModel.findParticipantsByEventId(req.params.id)
    res.json({ ...event, participants })
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const errors = validateEvent(req.body)
    if (errors.length > 0) return res.status(400).json({ message: 'กรอกข้อมูลไม่ครบ', errors })

    const result = await EventModel.create(req.body)
    res.json({ message: 'insert ok', data: result })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const errors = validateEvent(req.body)
    if (errors.length > 0) return res.status(400).json({ message: 'กรอกข้อมูลไม่ครบ', errors })

    const event = await EventModel.findById(req.params.id)
    if (!event) return res.status(404).json({ message: 'ไม่พบกิจกรรม' })

    if (Number(req.body.max_participants) < Number(event.registered_count)) {
      return res.status(400).json({
        message: 'จำนวนที่รับต้องไม่น้อยกว่าจำนวนผู้ลงทะเบียนปัจจุบัน'
      })
    }

    const result = await EventModel.update(req.params.id, req.body)
    res.json({ message: 'update ok', data: result })
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const result = await EventModel.remove(req.params.id)
    res.json({ message: 'delete ok', data: result })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll, getById, create, update, remove }
