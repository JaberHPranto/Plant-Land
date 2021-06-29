import bcrypt from 'bcrypt'
const users = [
    {
        name: "Shakib Al hasan",
        email: 'sh@gmail.com',
        password: bcrypt.hashSync('12345',10),
        isAdmin:'true'
    },
    {
        name: "Tamim Iqbal",
        email: 'ta@gmail.com',
        password: bcrypt.hashSync('1234',10),
    },
    {
        name: "Mashrafi",
        email: 'ma@gmail.com',
        password: bcrypt.hashSync('123',10),
    },
]

export default users