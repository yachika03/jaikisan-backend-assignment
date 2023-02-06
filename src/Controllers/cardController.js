const cardModel = require('../Models/cardModel');
const userModel = require('../Models/userModel');
const counterModel = require('../Models/couter');
const Validator = require('../Validation/validation.js')



const createCard = async (req, res) => {

    try {

        const data = req.body
        const { cardType, customerName, status, vision, customerID } = data


        if (!Validator.isValidBody(cardType) || !Validator.isValidateCardType(cardType)) return res.status(400).send({ status: false, message: `This Card Type: '${cardType}' is not valid (e.g. you have two options 'REGULAR' or 'SPECIAL') !` })

        if (!Validator.isValidBody(customerName) || !Validator.isValidName(customerName)) return res.status(400).send({ status: false, message: `This Customer Name: '${customerName}' is not valid!` })

        if (status && !Validator.isValidateStatus(status)) return res.status(400).send({ status: false, message: `This Status: '${status}' is not valid (e.g. you have two options 'ACTIVE' or 'INACTIVE') !` })

        if (!Validator.isValidBody(vision) || !Validator.isValidName(vision)) return res.status(400).send({ status: false, message: `This Vision: '${vision}' is not valid format!` })

        if (!Validator.isValidBody(customerID) || !Validator.isValidObjectId(customerID)) return res.status(400).send({ status: false, message: `This CustomerID: '${customerID}' is not valid!` })

        
        const checkCustomerID = await userModel.findOne({ _id: customerID, isDeleted: false })
        if (!checkCustomerID) return res.status(404).send({ status: false, message: `This CustomerID: '${customerID}' is not exist! ` })

        const couter = await counterModel.findOneAndUpdate({ id: "AutoInc" }, { $inc: { CouterNo: 1 } }, { new: true, upsert: true })


        const cardCreation = await cardModel.create({ cardNumber: `C00${couter.CouterNo}`, cardType, customerName, status, vision, customerID })

        return res.status(201).send({ status: true, message: `Your card data successfully created!`, data: cardCreation })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}



const fetchCard = async (req, res) => {

    try {

        const getCard = await cardModel.find()

        if (getCard.length == 0) return res.status(404).send({ status: false, message: "No card data exist!" })

        return res.status(200).send({ status: true, message: `Data successfully fetched!`, data: getCard })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports = { createCard, fetchCard }