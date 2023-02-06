const userModel = require('../Models/userModel');
const Validator = require('../Validation/validation.js')


const createUser = async (req, res) => {

    try {

        const data = req.body
        const { firstName, lastName, mobileNumber, DOB, emailID, address, status } = data

        if (!firstName || !lastName || !mobileNumber || !DOB || !emailID || !address || !status)
            return res.status(400).send({ status: false, message: `All fields are mandatory (e.g. firstName, lastName, mobileNumber, DOB, emailID, address and status) !` })

        if (!Validator.isValidBody(firstName) || !Validator.isValidName(firstName)) return res.status(400).send({ status: false, message: `This First Name: '${firstName}' is not valid!` })
        if (!Validator.isValidBody(lastName) || !Validator.isValidName(lastName)) return res.status(400).send({ status: false, message: `This Last Name: '${lastName}' is not valid!` })

        if (!Validator.isValidBody(mobileNumber) || !Validator.isValidMobileNumber(mobileNumber)) return res.status(400).send({ status: false, message: `This Mobile No.: '${mobileNumber}' is not valid!` })

        if (!Validator.isValidBody(DOB) || !Validator.isValidDate(DOB)) return res.status(400).send({ status: false, message: `This DOB date: '${DOB}' is not valid (e.g. format should be "YYYY/MM/DD")!` })

        if (!Validator.isValidBody(emailID) || !Validator.isValidEmail(emailID)) return res.status(400).send({ status: false, message: `This EmailID: '${emailID}' is not valid!` })

        const uniqueCheck = await userModel.findOne({ $or: [{ emailID: emailID }, { mobileNumber: mobileNumber }] })
        if (uniqueCheck) {
            if (uniqueCheck.mobileNumber == mobileNumber) return res.status(400).send({ status: false, message: `This Mobile No.: '${mobileNumber}' is already used!` })
            if (uniqueCheck.emailID == emailID) return res.status(400).send({ status: false, message: `This EmailID: '${emailID}' is already used!` })
        }

        if (!Validator.isValidBody(address) || !Validator.isValidName(address)) return res.status(400).send({ status: false, message: `This Address: '${address}' is not valid!` })

        if (!Validator.isValidBody(status) || !Validator.isValidateStatus(status)) return res.status(400).send({ status: false, message: `This Status: '${status}' is not valid (e.g. you have two options 'ACTIVE' or 'INACTIVE') !` })

        const userCreation = await userModel.create({ firstName, lastName, mobileNumber, DOB, emailID, address, status })

        return res.status(201).send({ status: true, message: `${firstName} ${lastName}: your data successfully created!`, data: userCreation })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}



const fetchUser = async (req, res) => {

    try {

        const getData = await userModel.find({ isDeleted: false, status: 'ACTIVE' })

        if (getData.length == 0) return res.status(404).send({ status: false, message: "No data exist!" })

        return res.status(200).send({ status: true, message: `Data successfully fetched!`, data: getData })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}



const removeUser = async (req, res) => {

    try {

        let ID = req.params.ID

        if (!Validator.isValidObjectId(ID)) return res.status(400).send({ status: false, message: `This CustomerID: '${ID}' is not valid!` })

        const deleteUser = await userModel.findOneAndUpdate({ _id: ID, isDeleted: false }, { isDeleted: true })

        if (!deleteUser) return res.status(400).send({ status: true, message: "Already deleted or not exist!" })

        return res.status(200).send({ status: true, message: "Successfully deleted!" })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports = { createUser, fetchUser, removeUser }
