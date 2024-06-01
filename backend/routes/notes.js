const express = require('express');
const Notes = require('../models/Notes');
const router = express.Router();
const Joi = require('joi');
const User = require('../models/User');
const bcrypt = require('bcryptjs');




const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    title: Joi.string().min(2),
    description: Joi.string().min(5).required(),
    tag: Joi.string(),
    user : Joi.optional(),
    tag: Joi.optional(),
    date: Joi.optional(),
    __v:Joi.optional(),


});
//cheking validation for notes
router.post('/createnote', async (req, res, next) => {
    // console.log("MOMMM", req.body)
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();


})


// Create notes  on /api/notes/createnote
router.post('/createnote', async (req, res) => {

    const { email, password } = req.body;
    try {
    console.log("HIHIHHI",req.body) 
    let user = await User.findOne({ email });
    console.log("USER", user)
    //    const comparePassword = await bcrypt.compare(password, user.password);

    const notes = await Notes.create({
        user: email,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag

    })
    //    if (comparePassword) {
    //         const notes = await Notes.create({
    //             user: email,
    //             title: req.body.title,
    //             description: req.body.description,
    //             tag:req.body.tag

    //         })
    console.log("Saved NOte",notes);
    res.status(201).json({ message: 'Note created successfully', notes });
    } catch (error) {
        console.log("ERROR", error.message);
        return res.send("OMi")
    }

}

)

// Update notes on /api/notes/updatenote/:noteId
router.put('/updatenote/:noteId', async (req, res) => {
    const { email, password } = req.body;
    const { noteId } = req.params;

    try {
        let user = await User.findOne({ email });
        const comparePassword = await bcrypt.compare(password, user.password);


        if (comparePassword) {
            const updatedNote = await Notes.findOneAndUpdate(
                { _id: noteId },
                {
                    $set: {
                        title: req.body.title,
                        description: req.body.description,
                        tag: req.body.tag,
                    }
                },
                { new: true } // Return the updated note
            );

            if (updatedNote) {
                res.json(updatedNote);
            } else {
                res.status(404).json({ error: 'Note not found' });
            }
        } else {
            res.status(401).json({ error: 'User Not Authorized' });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
})
// Remove notes on /api/notes/removenote/:noteId
router.delete('/removenote/:noteId', async (req, res) => {
    const { email, password } = req.body;
    const { noteId } = req.params;

    try {

        const deltedNOte = await Notes.findByIdAndDelete({ _id: noteId, user: email, password })

        if (deltedNOte) {
            return res.status(200).send({ message: "Delted", deltedNOte })
        } else {
            return res.status(400).send({ message: "Not na mali" })
        }


    }

    catch (error) {
        console.log("Error in deleting Note");
        return res.status(500).json({ error: 'Internal server error' });
    }
})


router.post('/getnotes', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        const comparePassword = await bcrypt.compare(password, user.password);

        if (comparePassword) {
            const notes = await Notes.find({ user: email }).sort({date : -1});

            res.json(notes);
        } else {
            res.json("User Not Authorized");
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Internal server Error" });
    }
});



module.exports = router 
