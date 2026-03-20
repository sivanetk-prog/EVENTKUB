const { getConnection } = require('../config/db')

const findAll = async () => {
  const conn = await getConnection()
  const [rows] = await conn.query(`
    SELECT
      registrations.id,
      registrations.event_id,
      registrations.user_id,
      registrations.registered_at,
      events.name AS event_name,
      events.location,
      DATE_FORMAT(events.event_date, '%Y-%m-%d') AS event_date,
      users.firstname,
      users.lastname
    FROM registrations
    JOIN events ON registrations.event_id = events.id
    JOIN users ON registrations.user_id = users.id
    ORDER BY registrations.registered_at DESC
  `)
  return rows
}

const findById = async (id) => {
  const conn = await getConnection()
  const [rows] = await conn.query(`
    SELECT
      registrations.id,
      registrations.event_id,
      registrations.user_id,
      registrations.registered_at,
      events.name AS event_name,
      DATE_FORMAT(events.event_date, '%Y-%m-%d') AS event_date,
      users.firstname,
      users.lastname
    FROM registrations
    JOIN events ON registrations.event_id = events.id
    JOIN users ON registrations.user_id = users.id
    WHERE registrations.id = ?
  `, [id])
  return rows[0]
}

const findByEventAndUser = async (eventId, userId) => {
  const conn = await getConnection()
  const [rows] = await conn.query(
    'SELECT * FROM registrations WHERE event_id = ? AND user_id = ?',
    [eventId, userId]
  )
  return rows[0]
}

const create = async (data) => {
  const conn = await getConnection()
  const { event_id, user_id } = data
  const [result] = await conn.query(
    'INSERT INTO registrations (event_id, user_id) VALUES (?, ?)',
    [event_id, user_id]
  )
  return result
}

const remove = async (id) => {
  const conn = await getConnection()
  const [result] = await conn.query('DELETE FROM registrations WHERE id = ?', [parseInt(id)])
  return result
}

module.exports = { findAll, findById, findByEventAndUser, create, remove }
