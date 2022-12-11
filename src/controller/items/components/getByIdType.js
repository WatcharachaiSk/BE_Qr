const {
  TypeItems,
  // Facultys,
  Departments,
  Categorys,
  Profiles,
  Items,
} = require("../../../model/index.model");
// GET ALL
const getTypeItemByDpmId = async (req, res) => {
   const { id } = req.params;
  try {
    const TypeItem = await TypeItems.findAll({
      where: { departmentDId: id },
      include: [
        {
          model: Departments,
          attributes: ["d_id", "nameTH", "nameEN", "facultyFId"],
        },
        {
          model: Categorys,
          attributes: ["cate_id", "name"],
        },
        {
          model: Profiles,
          attributes: [
            "pf_id",
            "firstname",
            "lastname",
            "nickname",
            "telephone",
            "email",
            "userUserId",
            "facultyFId",
            "departmentDId",
          ],
        },
        {
          model: Items,
        },
      ],
      order: [["type_id", "ASC"]],
    });

    return res.send(TypeItem);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getTypeItemByCate_Id = async (req, res) => {
  const { id } = req.params;
 try {
   const TypeItem = await TypeItems.findAll({
     where: { categoryCateId: id },
     include: [
       {
         model: Departments,
         attributes: ["d_id", "nameTH", "nameEN", "facultyFId"],
       },
       {
         model: Categorys,
         attributes: ["cate_id", "name"],
       },
       {
         model: Profiles,
         attributes: [
           "pf_id",
           "firstname",
           "lastname",
           "nickname",
           "telephone",
           "email",
           "userUserId",
           "facultyFId",
           "departmentDId",
         ],
       },
       {
         model: Items,
       },
     ],
     order: [["type_id", "ASC"]],
   });

   return res.send(TypeItem);
 } catch (err) {
   return res.status(500).send(err.message);
 }
};
module.exports = {
  getTypeItemByDpmId: getTypeItemByDpmId,
  getTypeItemByCate_Id:getTypeItemByCate_Id
};
