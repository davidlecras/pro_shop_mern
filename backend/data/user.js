import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'User A',
        email: 'user1@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'User B',
        email: 'user2@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users