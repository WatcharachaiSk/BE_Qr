const {
  HistoryStatusItems,
  UpDateStatuses,
  Items,
  Locations,
} = require("../../model/index.model");

const getHistoryStItem = async (req, res) => {
  // 	hs_id	status	note	updater_id	inspected_at
  // *	itemItemId	locationLId

  try {
    const HistoryStatusItem = await HistoryStatusItems.findAll({
      include: [
        {
          model: Items,
        },
        {
          model: Locations,
        },
      ],
      order: [["hs_id", "ASC"]],
    });

    return res.send({ status: 1, data: HistoryStatusItem });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
const updateStetus = async (req, res, next) => {
  try {
    /* name code status_item
     * facultyFId departmentDId buildingBId locationLId categoryCateId typeItemTypeId profilePfId
     */
    const profilePfId = await res.profilePfId;
    // console.log(profilePfId);
    const { itemItemId, locationLId, status, note } = req.body;
    const Item = await Items.findOne({
      where: { item_id: itemItemId },
    });

    // console.log(!locationLId ? Item.locationLId : locationLId);
    // * 	itemItemId	locationLId
    const historyStIten = await HistoryStatusItems.create({
      itemItemId: itemItemId,
      locationLId: !locationLId ? Item.locationLId : locationLId,
      status: status,
      note: note,
      updater_id: profilePfId,
    });

    const isHave = await UpDateStatuses.findOne({
      where: { itemItemId: itemItemId },
    });
    console.log(isHave.updateSt_id);

    if (isHave) {
      await UpDateStatuses.update(
        {
          itemItemId: itemItemId,
          locationLId: !locationLId ? Item.locationLId : locationLId,
          status: status,
          note: note,
          updater_id: profilePfId,
          inspected_at: await historyStIten.createdAt,
        },
        {
          where: {
            updateSt_id: isHave.updateSt_id,
          },
        }
      );
    } else {
      await UpDateStatuses.create({
        itemItemId: itemItemId,
        locationLId: !locationLId ? Item.locationLId : locationLId,
        status: status,
        note: note,
        updater_id: profilePfId,
        inspected_at: await historyStIten.createdAt,
      });
    }
    const updateStetus = await UpDateStatuses.findOne({
      where: { itemItemId: itemItemId },
    });

    // console.log(updateStetus.createdAt);
    // const updateItem = await Items.update(
    //   {
    //     status_item: status,
    //   },
    //   {
    //     where: {
    //       item_id: itemItemId,
    //     },
    //   }
    // );

    return res.send({ updateStetus });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  getHistoryStItem: getHistoryStItem,
  updateStetus: updateStetus,
};
