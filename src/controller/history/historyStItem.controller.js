const {
  HistoryStatusItems,
  UpDateStatuses,
  Items,
  Locations,
  Users,
  Profiles,
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

    return res.send(HistoryStatusItem);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
const getHistoryStItemByItemId = async (req, res) => {
  const { id } = req.params;

  try {
    const HistoryStatusItem = await HistoryStatusItems.findAll({
      where: { itemItemId: id },
      include: [
        {
          model: Items,
        },
        {
          model: Locations,
        },
      ],
      order: [["hs_id", "DESC"]],
    });

    return res.send(HistoryStatusItem);
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
    const isAdmin = await res.isAdmin;
    const { itemItemId, locationLId, status, note } = req.body;

    const Item = await Items.findOne({
      where: { item_id: itemItemId },
    });

    // console.log(!locationLId ? Item.locationLId : locationLId);
    // * 	itemItemId	locationLId

    // console.log(isHave.updateSt_id);
    if (isAdmin) {
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
    } else {
      const user = await Profiles.findOne({
        where: { pf_id: profilePfId },
      });
      if (user.departmentDId == Item.departmentDId) {
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
      } else {
        return res
          .status(203)
          .send({ message: "You are not in this department" });
      }
    }

    const updateStetus = await UpDateStatuses.findOne({
      where: { itemItemId: itemItemId },
    });
    await Items.update(
      {
        status_item: status,
        update_Stetus_Id: updateStetus.updateSt_id,
        locationLId: !locationLId ? Item.locationLId : locationLId,
      },
      {
        where: {
          item_id: itemItemId,
        },
      }
    );

    const items = await Items.findOne({
      where: { item_id: itemItemId },
    });

    return res.send({ updateStetus, items });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  getHistoryStItem: getHistoryStItem,
  updateStetus: updateStetus,
  getHistoryStItemByItemId: getHistoryStItemByItemId,
};
