import dateModels from "../models/dates.js"
import userModels from "../models/users.js"

const dateController = {};

dateController.getDate = async (req, res) => {
    const dates = await dateModels.find();
    res.json(dates)
}

dateController.getDateById = async (req, res) => {
    try{

        const dates = await dateModels.findById(req.params.id);

        if(!dates){
            return res.status(404).json({message: "date not found"})
        }

        return res.status(200).json(date)

    }catch(error){
        console.error("Error" + error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

dateController.insertDate = async (req, res) => {
    const {userId,
    date,
    reason,
    status} = req.body;

    const newdate = new dateModels({
        userId,
    date,
    reason,
    status
    });

    await newdate.save();

    res.json({message: "date saved"})
}

dateController.deleteDate = async (req, res) => {
    await dateModels.findByIdAndDelete(req.params.id);
    res.json({message: "date deleted"});
}

dateController.updateDate = async (req, res) => {

    const {userId,
    date,
    reason,
    status} = req.body;

    await dateModels.findByIdAndUpdate(req.params.id,{
    userId,
    date,
    reason,
    status
    },{
        new: true
    });

    res.json({message: "Date Update"})
}

export default dateController;