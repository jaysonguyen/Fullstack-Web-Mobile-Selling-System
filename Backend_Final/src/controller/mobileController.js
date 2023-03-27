<<<<<<< HEAD
const {
  getAllMobile,
  createOneMobile,
  deleteMobile,
  updateMobile,
  getOneMobile,
} = require("../services/mobileServies"); // import file
=======
const { getAllMobile, createOneMobile, deleteMobile, updateMobile, getOneMobile } = require("../services/mobileServies"); // import file 
>>>>>>> f133c3409c47656ab478327e71c5b75858b150e5

const getMobile = async (req, res) => {
  try {
    const data = await getAllMobile();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const createMobile = async (req, res) => {
  try {
    const {product_name, price, product_desc, id_type_product, model_no,is_valid,brand,base_hardware_conf} = req.body
    const data = await createOneMobile(product_name, price, product_desc, id_type_product, model_no,is_valid,brand,base_hardware_conf);
    return res.status(201).json({
      EM: "Create success",
      EC: 1,
      DT: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });

  }
};
const deleteMB = async (req, res) => {
  try {
    const data = await deleteMobile(req.body.id_product);
    return res.status(203).json({
      EM: "Delete sucess",
      EC: 1,
      DT: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(data);
  }
};

const updateMB = async (req, res) => {
  try {
    const data = await updateMobile(req.body.id_product, req.body.product_name,req.body.price,req.body.product_desc,req.body.id_type_product,req.body.model_no,req.body.is_valid,req.body.brand,req.body.base_hardware_conf);
    return res.status(200).json({
      EM: "Update success",
      EC: 1,
<<<<<<< HEAD
      DT: "",
    });
=======
      DT: data,
    })
>>>>>>> f133c3409c47656ab478327e71c5b75858b150e5
  } catch (error) {
    console.log(error);
    return res.status(500).json(data);
  }
};

const getMobileById = async (req, res) => {
  try {
    const data = await getOneMobile(req.params.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
<<<<<<< HEAD
    });
=======
    })
>>>>>>> f133c3409c47656ab478327e71c5b75858b150e5
  } catch (error) {
    console.log(error);
    return res.status(500).json(data);
  }
<<<<<<< HEAD
};

=======
}
>>>>>>> f133c3409c47656ab478327e71c5b75858b150e5
module.exports = { getMobile, createMobile, deleteMB, updateMB, getMobileById };
