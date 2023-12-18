import { User, Product } from "./models";
import { dbConnect } from "@/app/lib/utils";

// these API can only be called by server components
export const fetchUsers = async (q: string, page: number) => {
  await dbConnect();
  //convert q to lowercase
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 2;
  try {
    const count = await User.countDocuments({ username: regex }).exec();
    const users = await User.find({ username: regex })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .exec();

    return { users, count };
  } catch (error) {
    console.log(error);
    throw new Error("fail to fetch users!");
  }
};

export const fetchUser = async (id: string) => {
  await dbConnect();
  try {
    const user = await User.findById(id).exec();
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("fail to fetch user!");
  }
};



export const fetchProducts = async (q: string, page: number) => {
  await dbConnect();
  //convert q to lowercase
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 2;
  try {
    const count = await Product.countDocuments({ title: regex }).exec();
    const products = await Product.find({ title: regex })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .exec();
    return { products, count };
  } catch (error) {
    console.log(error);
    throw new Error("fail to fetch users!");
  }
};

export const fetchProduct = async (id: string) => {
  await dbConnect();
  try {
    const product = await Product.findById(id).exec();
    return product;
  } catch (error) {
    console.log(error);
    throw new Error("fail to fetch product!");
  }
};
