import { SellerModel, PaymentsModel } from '../models';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

export const readSellers = async () => {
  const allSellers = await SellerModel.find()
    .select({ sellerPassword: 0, __v: 0, updatedAt: 0 })
    .populate('categoriesArray', {
      _id: 0,
      name: 1
    })
    .populate('servicesArray', { _id: 0, name: 1 })
    .populate('reviews', { _id: 0, rating: 1 });
  return allSellers;
};

export const getSellersByIdHandler = async (id: String) => {
  const sellerById = await SellerModel.findOne({ _id: id })
    .select({ sellerPassword: 0, role: 0 })
    .populate('categoriesArray', {
      _id: 0,
      name: 1
    })
    .populate('servicesArray', { _id: 1, name: 1, price: 1, description: 1 })
    .populate({
      path: 'reviews',
      select: { _id: 0, rating: 1, description: 1 },
      populate: {
        path: 'userId',
        select: { _id: 0, name: 1, lastName: 1, image: 1 }
      }
    });
  if (!sellerById) return 'Seller not found';
  return sellerById;
};

//post Handlers
export const postSellersHandler = async (seller: Object) => {
  const newSeller = await SellerModel.create(seller);
  return newSeller;
};

//put Handlers
export const putSellersHandler = async (id: String, update: object) => {
  let sellerUpdate = await SellerModel.findByIdAndUpdate(id, update, {
    new: true
  }).select({
    sellerPassword: 0,
    role: 0,
    isActive: 0,
    accountBalance: 0,
    passwordResetCode: 0
  });
  return sellerUpdate;
};

export const patchSellerImages = async (id: string, images: string[]) => {
  await SellerModel.findOneAndUpdate({ _id: id }, { images: images });
};

// delete Handlers
export const disableSellerHandler = async (id: String) => {
  await SellerModel.findByIdAndUpdate(id, { isActive: false });
  return 'Seller has been successfully disabled';
};

export const enableSellerHandler = async (id: String) => {
  await SellerModel.findByIdAndUpdate(id, { isActive: true });
  return 'Seller has been successfully enabled';
};

export const validateLogInSeller = async (
  sellerEmail: string,
  sellerPassword: string
) => {
  //change "any" type
  try {
    const seller = await SellerModel.findOne({ sellerEmail }).exec();
    if (!seller) {
      throw new Error('Seller is not registered');
    }

    const isPasswordValid = await seller.validatePassword(sellerPassword);

    if (!isPasswordValid) {
      return false;
    }
    return {
      id: seller._id,
      role: seller.role,
      isActive: seller.isActive,
      accountBalance: seller.accountBalance
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const generateTokenSeller = async (sellerEmail: string) => {
  try {
    const seller = await SellerModel.findOne({ sellerEmail: sellerEmail });
    const token = await jwt.sign(
      { sellerName: seller?.sellerName, id: seller?._id, role: seller?.role },
      process.env.TOKEN_ENCRYPTION!,
      { expiresIn: '1h' }
    );
    return token;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const forgotSellerPasswordHandler = async (sellerEmail: string) => {
  const user = await SellerModel.findOne({ sellerEmail });
  return user;
};

export const resetSellerPasswordHandler = async (
  id: string,
  newPassword: string
) => {
  const user = await SellerModel.findById(id);
  if (user) {
    if (newPassword === user.sellerPassword) {
      throw Error("Input password can't match the current password");
    }
    user.sellerPassword = newPassword;
    user.passwordResetCode = null;
    user.save();
  }
  return user;
};

export const increaseSellerAccount = async (
  sellerEmail: string,
  price: string
) => {
  try {
    const seller = await SellerModel.findOne({ sellerEmail });
    if (!seller) throw new Error("Seller doesn't exist");
    const servicePrice = Number(price);
    if (isNaN(servicePrice)) throw new Error('Price must be a number');
    if (servicePrice <= 0) throw new Error('Price is not valid');
    seller.updateAccountBalance(servicePrice);
  } catch (error: any) {
    console.log('Error en controller increaseSellerAccount');
    throw new Error(error.message);
  }
};

export const validateSellerAccount = async (id: string, payment: string) => {
  try {
    const paymentRequested = Number(payment);
    const seller = await SellerModel.findById(id);
    if (seller?.accountBalance !== paymentRequested)
      throw new Error('Invalid amount');
    return;
  } catch (error) {
    throw error;
  }
};

export const readClientsBySellerId = async (id: string) => {
  try {
    const clients = await PaymentsModel.aggregate([
      {
        $match: {
          sellerId: new mongoose.Types.ObjectId(id)
        }
      },
      {
        $group: {
          _id: '$userId'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $project: {
          _id: 0,
          user: {
            $arrayElemAt: ['$user', 0]
          }
        }
      },
      {
        $project: {
          'user._id': 1,
          'user.name': 1,
          'user.lastName': 1,
          'user.image': 1,
          'user.email': 1,
          'user.phoneNumber': 1,
          'user.dateOfBirth': 1
        }
      },
      {
        $replaceRoot: {
          newRoot: '$user'
        }
      }
    ]);
    if (!clients) throw new Error('No clients for this Seller');
    return clients;
  } catch (error) {
    throw error;
  }
};
