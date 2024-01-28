"use server";
import { revalidatePath } from "next/cache";
import { User, Product } from "./models";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";


export const addUser = async (formData: FormData) => {
  //   "use server";

  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password as string, salt);
  try {
    const checkUsername = await User.findOne({ username });
    const checkEmail = await User.findOne({ email });
    if (checkUsername || checkEmail) {
      throw new Error("Duplicate username or email");
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (error) {
    console.log(error);
    throw new Error("Fail to add new user");
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deleteUser = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData);
  try {
    await User.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Fail to delete a user");
  }
  revalidatePath("/dashboard/users");
};

export const updateUser = async (formData: FormData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);
  try {
    const updateFields:any = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || updateFields[key] === undefined) &&
        delete updateFields[key]
    );

    if(updateFields.password){
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updateFields.password as string, salt);
      updateFields.password=hashedPassword
    }
    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addProduct = async (formData: FormData) => {
  const { title, desc, price, stock, color, size } =
    Object.fromEntries(formData);
  try {
    const newProduct = new Product({
      title,
      desc,
      price,
      stock,
      color,
      size,
    });

    await newProduct.save();
  } catch (error) {
    console.log(error);
    throw new Error("Fail to add new product");
  }
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const deleteProduct = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData);
  try {
    await Product.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Fail to delete a product");
  }
  revalidatePath("/dashboard/products");
};

export const updateProduct = async (formData: FormData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);
  try {
    const updateFields:any = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || updateFields[key] === undefined) &&
        delete updateFields[key]
    );

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};


