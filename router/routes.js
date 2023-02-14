const express = require("express");
const router = express.Router();
const USER = require("../model/userShema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


router.get("/", (req, res) => {
    res.send("hello this is server home page")
})



router.post("/signup", async (req, res) => {

    try {

        // console.log(req.body)
        const { name, email, number, address, password } = req.body;

        if (!name || !email || !number || !address || !password) {
            res.json("please fill all details")
        }

        else {
            const findUser = await USER.findOne({ email });
            // checking wheather student is already present or not
            if (findUser) {
                res.statusCode = 200;
                res.json("user already present");
            }

            else {
                res.statusCode = 200;
                const newUser = new USER({ name, email, number, address, password });
                await newUser.save();


                res.json({ message: "registered sucessfully" });
            }
        }


    }

    // sending error if user send a bad request
    catch (err) {
        res.statusCode = 400;
        res.json("error on creating new user ", err);
    }
})


router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            res.json("please fill all details")
        }

        else {
            const findUser = await USER.findOne({ email });
            // checking wheather student is already present or not
            if (findUser) {

                const checkPassword = await bcrypt.compare(password, findUser.password)

                if (checkPassword) {
                    res.statusCode = 200;

                    const token = await findUser.generateToken();
                    // const test = await localStorage.setItem("jwt", token);
                    
                    const check = await jwt.verify(token, "thisiaasecretkeytoprotectthatstufffromheckers");
                    

                    res.json({ message: "login sucessfull", token: token });
                }
                else {
                    res.json("invalid user details");
                }

            }

            else {

                res.json("invalid user details");
            }
        }

    }
    catch (err) {
        console.log("error on finding user , ", err)
        res.statusCode = 400;
    }
})

// auth is here
// auth is here
// auth is here

router.post("/auth", async (req, res) => {
    try {

        console.log("checkingggggggg")
        const { token } = req.body;

        if (!token) {
            res.json("token is not present")
        }

        else {
            
            const check = await jwt.verify(token, "thisiaasecretkeytoprotectthatstufffromheckers");

            const findUser = await USER.findOne({ _id: check.id });
            // checking wheather student is already present or not
            if (findUser) {
                
                res.json({ message: "login with token sucessfully", user:findUser});

            }

            else {

                res.json("invalid token");
            }
        }

    }
    catch (err) {
        console.log("error on finding user in auth ", err)
        res.statusCode = 400;
    }
})








router.post("/updateorder", async (req, res) => {
    try {

        console.log("updating order")
        const {id} = req.body;
        console.log(id)

        if (!id) {
            res.json("id is not present")
        }

        else {
            
            const findUser = await USER.findOne({ _id: id });
            // checking wheather student is already present or not
            if (findUser) {

                findUser.addorder(req.body.payload);
                res.json({ message: "order updated sucessfully"});

            }

            else {

                res.json("invalid id");
            }
        }

    }
    catch (err) {
        console.log("error on finding user in order ", err)
        res.statusCode = 400;
    }
})








module.exports = router;