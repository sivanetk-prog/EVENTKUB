const RegistrationModel = require('../models/registrations')
const EventModel = require('../models/events')

const getAll = async (req, res, next) => {
  try {
    const registrations = await RegistrationModel.findAll()
    res.json(registrations)
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const registration = await RegistrationModel.findById(req.params.id)
    if (!registration) return res.status(404).json({ message: 'ไม่พบข้อมูลการลงทะเบียน' })
    res.json(registration)
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const { event_id, user_id } = req.body
    const errors = []

    if (!event_id) errors.push('กรุณาเลือกกิจกรรม')
    if (!user_id) errors.push('กรุณาเลือกผู้ใช้')
    if (errors.length > 0) return res.status(400).json({ message: 'กรอกข้อมูลไม่ครบ', errors })

    const event = await EventModel.findById(event_id)
    if (!event) return res.status(404).json({ message: 'ไม่พบกิจกรรม' })

    const duplicated = await RegistrationModel.findByEventAndUser(event_id, user_id)
    if (duplicated) return res.status(400).json({ message: 'ผู้ใช้นี้ลงทะเบียนกิจกรรมนี้แล้ว' })

    if (Number(event.registered_count) >= Number(event.max_participants)) {
      return res.status(400).json({ message: 'กิจกรรมนี้เต็มแล้ว' })
    }

    const result = await RegistrationModel.create(req.body)
    res.json({ message: 'insert ok', data: result })
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const result = await RegistrationModel.remove(req.params.id)
    res.json({ message: 'delete ok', data: result })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll, getById, create, remove }
