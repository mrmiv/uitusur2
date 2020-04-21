const {Router} = require('express')
const router = Router()
// const authStaff = require('../middleware/middleware.auth.Staff')

const Staff = require('../models/Staff')

// /staff
router.get('/', async (req, res) => {
    
    try {
        await Staff.find()
            .select(['firstname', 'lastname', 'secondname','post','degree'])
            .sort([['lastname',1], ['firstname',1], ['secondname',1]])
            .then(data => res.json(data))
            .catch(err => res.status(400).json({message: err.mesage}))

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// /staff/:id
router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {

        const staff = await Staff.findById(id)

        if(!staff){
            return res.status(404).json({message: "Сотрудник не найден"})
        }

        res.json(staff)

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// staff/
router.post('/', async (req, res) => {

    const {
        firstname,
        lastname,
        secondname,
        post,
        degree,
        rank,
        path,
        worktime
    } = req.body

    try {

        const staff = new Staff({
            firstname,
            lastname,
            secondname,
            post,
            degree,
            rank,
            path,
            worktime
        })

        try{
            await staff.validate(
                {firstname,  lastname,  secondname,  post,  degree,  rank,  path,  worktime}, 
                ['firstname', 'lastname','secondname','post','degree','rank','path','worktime'])
        } catch( error){
            // error instanceof Error.ValidationError
            return res.status(400).json({
                message: error.message
            })
        }

        console.log(staff);

        const exists = await Staff.findOne({firstname, lastname, secondname, post, degree, rank, path})

        if (exists){
            return res.status(400).json({message: "Сотрудник уже существует"})
        }

        console.log(staff);

        try{
            await staff.save()
            .then(staff => res.status(201).json({message:"Сотрудник успешно добавлен", staff}) )
            .catch(err => res.status(400).json({message: err.message}))
        } catch (error){
            error instanceof Error.ValidationError
            return res.status(400).json({
                message: "Проверьте введенные данные",
                errors: error.message
            })
        }

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// staff/:id
router.delete('/:id', async (req, res) => {

    const id = req.params.id
    
    try {
        const staff = await Staff.findById(id)


        if(!staff){
            return res.status(404).json({message: "Сотрудник не найден"})
        }

        await staff.delete()
            .then(()=> res.status(201).json({message: "Сотрудник удален"}))

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.patch('/:id', async (req, res) => {

    const id = req.params.id
    const body = req.body

    try {
        const staff = await Staff.findById(id)

        if(!staff){
            return res.status(404).json({message: "Сотрудник не найден"})
        }

        // console.log(body, body.rank);
        staff.firstname = body.firstname
        staff.lastname = body.lastname
        staff.secondname = body.secondname
        staff.rank = body.rank
        staff.post = body.post
        staff.degree = body.degree
        staff.worktime = body.worktime
        staff.path = body.path

        await staff.save()
            .then(staff => res.json({message: "Сотрудник обновлен", staff}))

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

module.exports = router
