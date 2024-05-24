
const Groups = require('../models/Groups')
const Token = require('../models/Token')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require("../models");
const {response} = require("express");

class groupController {
    async create(req, res) {
        try {
            const {group_title, group_description, group_password } = req.body
            const {user_id} = req

            const user = await User.findOne({where: {id: user_id}})

            if (!user) {
                return res.status(400).json({error: "User with provided token doesn't exist"})
            }

            const existingGroup = await Groups.findOne({where: {group_title}})

            if (!!existingGroup) {
                return res.status(400).json({error: "Group with provided title exist"})
            }

            await Groups.create({
                group_title, group_description, group_password,
                group_owner_id: user_id,

            })

            return res.status(200).json({
                group_title,
                group_description,
            })
        } catch (e) {

        }

    }

    async getGroups(req, res) {
        try {
            const {user_id} = req

            const user = await User.findOne({where: {id: user_id}})


            const groups = await Groups.findAll({where: {group_owner_id: user_id}})

            return res.status(200).json(groups)
        } catch (e) {

        }

    }
}


module.exports = new groupController()