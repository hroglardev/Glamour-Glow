import { UserModel, SellerModel, ReviewsModel, ServicesModel, VisistModel } from "../models";

export const deleteUserHandler = async (id: String) => {
  const userdeleted = await UserModel.findByIdAndDelete(id);
  if (!userdeleted) {
    throw Error("user does not exist");
  }
  return id;
};

export const deleteSellerHandler = async (id: String) => {
  const sellerDeleted = await SellerModel.findByIdAndDelete(id);
  if (!sellerDeleted) {
    throw Error("user does not exist");
  }
  return id;
};
export const deleteReviewsAdmin = async (id: String) => {
  const removeReview = await ReviewsModel.findByIdAndDelete(id);
  await SellerModel.findOneAndUpdate(
    { _id: removeReview?.sellerId },
    { $pull: { reviews: id } }
  );
  return id;
};
export const deleteServiceAdmin = async (id: string) => {
  const deleteService = await ServicesModel.findByIdAndDelete(id);
  await SellerModel.findOneAndUpdate(
    { _id: deleteService?.seller },
    { $pull: { servicesArray: id } }
  );
  return id;
};

export const readUsersMetrics = async () => {
  const [activeUsers, inactiveUsers] = await Promise.all([
    await UserModel.countDocuments({ isActive: true }),
    await UserModel.countDocuments({ isActive: false }),
  ]);

  return { activeUsers: activeUsers, inactiveUsers: inactiveUsers };
};

export const readSellersMetrics = async () => {
  const [activeSellers, inactiveSellers] = await Promise.all([
    await SellerModel.countDocuments({ isActive: true }),
    await SellerModel.countDocuments({ isActive: false }),
  ]);
  return { activeSellers: activeSellers, inactiveSellers: inactiveSellers };
};

export const getPagesVisits = async () => {
  const pagesVisited = await VisistModel.countDocuments();
  return {totalPagesVisited: pagesVisited};
}
