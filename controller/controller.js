const userModel = require("../model/model");
class Controller {
  async showMessage(req, res) {
    try {
      return res.status(200).json({
        message: "Welcome to crud Api",
      });
    } catch (error) {
      throw error;
    }
  }

  async createUser(req, res) {
    try {
      req.body.firstname = req.body.firstname;
      req.body.lastname = req.body.lastname;
      req.body.email = req.body.email;
      req.body.password = req.body.password;
      if (
        !req.body.firstname ||
        !req.body.lastname ||
        !req.body.email ||
        !req.body.password
      ) {
        return res.status(404).json({
          message: "Field should not be empty",
        });
      } else {
        let isEmailExist = await userModel.find({ email: req.body.email });
        if (!isEmailExist.length) {
          let saveData = await userModel.create(req.body);
          if (saveData && saveData._id) {
            return res.status(200).json({
              message: "Data added sucessfully",
              data: saveData,
            });
          } else {
            return res.status(404).json({
              message: "Data not added sucessfully",
              data: [],
            });
          }
        } else {
          return res.status(404).json({
            message: "User already exists",
            data: [],
          });
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async userAllData(req, res) {
    try {
      let allData = await userModel.find();
      return res.status(200).json({
        message: "Data fetch sucessfully",
        data: allData,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteData(req, res) {
    try {
      let userDelete = await userModel.findByIdAndRemove(req.params.id);
      if (userDelete) {
        return res.status(200).json({
          message: "Data deleted sucessfully",
        });
      } else {
        return res.status(404).json({
          message: "Data not deleted",
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async editData(req, res) {
    try {
      req.body.firstname = req.body.firstname;
      req.body.lastname = req.body.lastname;
      req.body.email = req.body.email;
      req.body.password = req.body.password;
      if (
        !req.body.firstname ||
        !req.body.lastname ||
        !req.body.email ||
        !req.body.password
      ) {
        return res.status(404).json({
          message: "Field should not be empty",
        });
      } else {
        let isUserExist = await userModel.findOne({ _id: req.params.id });
        if (isUserExist) {
          let isEmailExist = await userModel.find({
            email: req.body.email,
            _id: { $ne: req.body.id },
          });
          if (!isEmailExist.length) {
            let userUpdate = await userModel.findByIdAndUpdate(
              req.params.id,
              req.body
            );
            if (userUpdate && userUpdate._id) {
              return res.status(200).json({
                message: "Data updated sucessfully",
                data: userUpdate,
              });
            } else {
              return res.status(404).json({
                message: "Data not updated sucessfully",
                data: [],
              });
            }
          } else {
            return res.status(404).json({
              message: "Email already exists",
            });
          }
        } else {
          return res.status(404).json({
            message: "Data not found",
            data: [],
          });
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new Controller();
