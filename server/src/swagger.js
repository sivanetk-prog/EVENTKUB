const spec = {
  openapi: '3.0.0',
  info: {
    title: 'web101 Event Management API',
    version: '1.0.0',
    description: 'REST API สำหรับระบบจัดการกิจกรรมและการลงทะเบียนเข้าร่วม'
  },
  servers: [{ url: 'http://localhost:8000', description: 'Local server' }],
  tags: [
    { name: 'Users', description: 'จัดการผู้ใช้' },
    { name: 'Events', description: 'จัดการกิจกรรม' },
    { name: 'Registrations', description: 'จัดการการลงทะเบียน' }
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          firstname: { type: 'string', example: 'สมชาย' },
          lastname: { type: 'string', example: 'ใจดี' },
          age: { type: 'integer', example: 25 },
          gender: { type: 'string', example: 'ชาย' },
          interests: { type: 'string', example: 'เทคโนโลยี, กีฬา' },
          description: { type: 'string', example: 'สนใจเข้าร่วมกิจกรรมเวิร์กชอป' }
        }
      },
      Event: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Workshop JavaScript พื้นฐาน' },
          description: { type: 'string', example: 'เรียนรู้การเขียน JavaScript เบื้องต้นแบบง่าย ๆ' },
          location: { type: 'string', example: 'ห้องคอม 1' },
          event_date: { type: 'string', example: '2026-04-05' },
          max_participants: { type: 'integer', example: 30 },
          created_by: { type: 'integer', example: 1 },
          registered_count: { type: 'integer', example: 2 }
        }
      },
      Registration: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          event_id: { type: 'integer', example: 1 },
          user_id: { type: 'integer', example: 2 },
          registered_at: { type: 'string', format: 'date-time' }
        }
      }
    }
  },
  paths: {
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'ดึงข้อมูลผู้ใช้ทั้งหมด',
        responses: {
          200: {
            description: 'รายการผู้ใช้',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/User' } } } }
          }
        }
      }
    },
    '/events': {
      get: {
        tags: ['Events'],
        summary: 'ดึงรายการกิจกรรมทั้งหมด',
        responses: {
          200: {
            description: 'รายการกิจกรรม',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Event' } } } }
          }
        }
      }
    },
    '/registrations': {
      get: {
        tags: ['Registrations'],
        summary: 'ดึงรายการลงทะเบียนทั้งหมด',
        responses: {
          200: {
            description: 'รายการลงทะเบียน',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Registration' } } } }
          }
        }
      }
    }
  }
}

module.exports = spec
