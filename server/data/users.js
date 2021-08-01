import bcrypt from 'bcrypt'
const users = [
    {
        name: "Pranto",
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:'true'
    },
    {
        name: "Moshiur Alvi",
        email: 'alvi@gmail.com',
        password: bcrypt.hashSync('123456',10),
    }
]

export default users