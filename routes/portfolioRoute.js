const router = require('express').Router();
const { Intro, About, Experience, Project, Education, Contact } = require('../models/portfolioModel');
const User = require("../models/userModels")
//get all portfolio data
router.get('/get-portfolio-data', async (req, res) => {

    try {
        const intros = await Intro.find();
        const abouts = await About.find();
        const experience = await Experience.find();
        const projects = await Project.find();
        const educations = await Education.find();
        const contacts = await Contact.find();




        res.status(200).send({
            intro: intros.length > 0 ? intros[0] : null,
            about: abouts.length > 0 ? abouts[0] : null,
            experiences: experience,
            project: projects,
            education: educations,
            contact: contacts.length > 0 ? contacts[0] : null,


        });
    } catch (error) {
        res.status(500).send(error);
    }

});

//update intro
router.post("/update-intro", async (req, res) => {
    try {
        const intro = await Intro.findOneAndUpdate(
            { _id: req.body._id }, req.body, { new: true }
        );
        res.status(200).send({
            data: intro,
            success: true,
            message: "Intro updated successfully"
        }
        )
    } catch (error) {
        res.status(500).send(error)
    }
}
);

//update about
router.post("/update-about", async (req, res) => {
    try {
        console.log("Received Data:", req.body);
        const { _id, ...updatedData } = req.body;
        const about = await About.findOneAndUpdate(
            { _id },
            { ...updatedData },
            { new: true }
        );
        res.status(200).send({
            data: about,
            success: true,
            message: "About updated successfully"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//add experience
router.post("/add-experience", async (req, res) => {
    try {
        const experience = new Experience(req.body);
        await experience.save();

        res.status(200).send({
            data: experience,
            success: true,
            message: "Experiences added successfully"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//update experience
router.post("/update-experience", async (req, res) => {
    try {
        const experience = await Experience.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experiences updated successfully"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});
//delete experience
router.post("/delete-experience", async (req, res) => {
    try {
        const experience = await Experience.findOneAndDelete({ _id: req.body._id });
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience deleted successfully"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//add projects
router.post("/add-project", async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();

        res.status(200).send({
            data: project,
            success: true,
            message: "Project added successfully"
        });
    } catch (error) {
        console.error("Error adding project:", error);
        res.status(500).send({
            success: false,
            message: "Error adding project"
        });
    }
});

//update projects
router.post("/update-project", async (req, res) => {
    try {
        const project = await Project.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: project,
            success: true,
            message: "Project updated successfully"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});
//delete projects
router.post("/delete-project", async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({ _id: req.body._id });
        res.status(200).send({
            data: project,
            success: true,
            message: "Project deleted successfully"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});


//add Education
router.post("/add-education", async (req, res) => {
    try {
        const education = new Education(req.body);
        await education.save();

        res.status(200).send({
            data: education,
            success: true,
            message: "Education added successfully"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//update Education
router.post("/update-education", async (req, res) => {
    try {
        const education = await Education.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: education,
            success: true,
            message: "Education updated successfully"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});
//delete Education
router.post("/delete-education", async (req, res) => {
    try {
        const education = await Education.findOneAndDelete({ _id: req.body._id });
        res.status(200).send({
            data: education,
            success: true,
            message: "Education deleted successfully"
        });
    } catch (error) {
        res.status(500).send(error);
    }
});


//update Contact
router.post("/update-contact", async (req, res) => {
    try {
        const contact = await Contact.findOneAndUpdate(
            { _id: req.body._id }, req.body, { new: true }
        );
        res.status(200).send({
            data: contact,
            success: true,
            message: "Country updated successfully"
        }
        )
    } catch (error) {
        res.status(500).send(error)
    }
}
);

//admon login
router.post("/admin-login", async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });
        user.password = "";
        user.username = "";

        if (user) {
            res.status(200).send({
                data: user,
                success: true,
                message: "Login Successfully"
            })

        }
        else {
            res.status(200).send({
                data: user,
                success: false,
                message: "Invalid username or password"
            })
        }
    }
    catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;