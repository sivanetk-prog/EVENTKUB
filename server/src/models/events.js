const { getConnection } = require('../config/db')

const findAll = async () => {
  const conn = await getConnection()
  const [rows] = await conn.query(`
    SELECT
      events.*,
      DATE_FORMAT(events.event_date, '%Y-%m-%d') AS event_date,
      users.firstname,
      users.lastname,
      (
        SELECT COUNT(*)
        FROM registrations
        WHERE registrations.event_id = events.id
      ) AS registered_count
    FROM events
    JOIN users ON events.created_by = users.id
    ORDER BY events.event_date ASC, events.created_at DESC
  `)
  return rows
}

const findById = async (id) => {
  const conn = await getConnection()
  const [rows] = await conn.query(`
    SELECT
      events.*,
      DATE_FORMAT(events.event_date, '%Y-%m-%d') AS event_date,
      users.firstname,
      users.lastname,
      (
        SELECT COUNT(*)
        FROM registrations
        WHERE registrations.event_id = events.id
      ) AS registered_count
    FROM events
    JOIN users ON events.created_by = users.id
    WHERE events.id = ?
  `, [id])
  return rows[0]
}

const findParticipantsByEventId = async (id) => {
  const conn = await getConnection()
  const [rows] = await conn.query(`
    SELECT
      registrations.id AS registration_id,
      registrations.registered_at,
      users.id AS user_id,
      users.firstname,
      users.lastname,
      users.age,
      users.gender,
      users.interests,
      users.description
    FROM registrations
    JOIN users ON registrations.user_id = users.id
    WHERE registrations.event_id = ?
    ORDER BY registrations.registered_at DESC
  `, [id])
  return rows
}

const create = async (data) => {
  const conn = await getConnection()
  const { name, description, location, event_date, max_participants, created_by } = data
  const [result] = await conn.query(
    'INSERT INTO events (name, description, location, event_date, max_participants, created_by) VALUES (?, ?, ?, ?, ?, ?)',
    [name, description || '', location, event_date, max_participants, created_by]
  )
  return result
}

const update = async (id, data) => {
  const conn = await getConnection()
  const { name, description, location, event_date, max_participants, created_by } = data
  const [result] = await conn.query(
    'UPDATE events SET name=?, description=?, location=?, event_date=?, max_participants=?, created_by=? WHERE id=?',
    [name, description || '', location, event_date, max_participants, created_by, id]
  )
  return result
}

const remove = async (id) => {
  const conn = await getConnection()
  const [result] = await conn.query('DELETE FROM events WHERE id = ?', [parseInt(id)])
  return result
}

module.exports = { findAll, findById, findParticipantsByEventId, create, update, remove }
