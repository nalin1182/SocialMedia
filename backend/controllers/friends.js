const Users = require('../models/User');

exports.allUsers = async (req, res) => {

    try {

        const allUsers = await Users.find({_id:{$ne:req.user_id} }).select("-password");
        return res.status(200).json({ users: allUsers });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

exports.addFriend = async (req, res) => {

    try {
        const { id } = req.params;

        if (id==req.user_id) {
            return res.status(406).json({ message: 'Not a valid user' });
        }

        const sender = await Users.findById(req.user_id).select("-password");
        const reciever = await Users.findById(id).select("-password");

        let index = sender.friends.findIndex((val) => val == id);

        if (index !== -1) {
            return res.status(406).json({ message: 'friend already added' });
        }

        if (!sender || !reciever) {
            return res.status(406).json({ message: 'Not a valid user' });
        }

        sender.friends.push(id);
        reciever.friends.push(req.user_id);

        sender.save();
        reciever.save();

        return res.status(200).json({ message: 'Friend added successfully', sender, reciever });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

exports.removeFriend = async (req, res) => {

    try {

        const { id } = req.params;

        if (id==req.user_id) {
            return res.status(406).json({ message: 'Not a valid user gfg' });
        }

        const sender = await Users.findById(req.user_id).select("-password");
        const reciever = await Users.findById(id).select("-password");

        if (!sender || !reciever) {
            return res.status(406).json({ message: 'Not a valid user' });
        }

        let senderUpdatedList = sender.friends.filter((val)=>val.toString()!==id);
        let recieverUpdatedList = reciever.friends.filter((val)=>val.toString()!==req.user_id);

        sender.friends = senderUpdatedList;
        reciever.friends = recieverUpdatedList;

        sender.save();
        reciever.save();

        return res.status(200).json({ message: 'Friend removed successfully', sender, reciever });

        

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}


exports.getAllFriends = async (req,res)=>{

    try{
        
        const data = await Users.findById(req.user_id).populate({path:'friends',select: '_id email username'});
        return res.status(200).json(data.friends);        

    }catch(error){
        return res.status(500).json({ message: error.message });
    }

}