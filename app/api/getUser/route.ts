import { dbConnect } from "@/app/lib/utils";
import { User } from "@/app/lib/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
// pass to a client component
export const POST = async (req: Request) => {
  const { username } = await req.json();

  await dbConnect();
  try {
    const user = await User.findOne({ username });


    return NextResponse.json(
      {
        username,
        img: user.img,
        role: user.isAdmin ? "Administrator" : "Member",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    throw new Error("fail to fetch user!");
  }
};

// export const GET = async (req:NextApiRequest) => {
//     console.log("hello",req)
//     return new NextResponse("hello",{status:200})
// };

// export const fetchUserByName = async (username: string) => {
//   await dbConnect();
//   try {
//     console.log("in databse",username)
//     const user = await User.findOne({ username });

//     return user;
//   } catch (error) {
//     console.log(error);
//     throw new Error("fail to fetch user!");
//   }
// };
