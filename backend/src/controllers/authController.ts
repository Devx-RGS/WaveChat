import { User } from "../models/User";
import type { AuthRequest } from "../middleware/auth";
import  type { NextFunction, Request, Response } from "express";
import { clerkClient, getAuth } from "@clerk/express";

export async function getMe(req: AuthRequest, res: Response, next: NextFunction){
    try{
        const userId = req.userId
        const user = await User.findById(userId)
        if(!user){
            res.status(404).json({ message: "User not found"});
            return;
        }
        res.status(200).json(user)
    }
    catch(error){
        res.status(500);
        next(error);
    }
}

export async function authCallback(req: Request, res: Response, next: NextFunction) {
    try{
        const clerkId = getAuth(req)?.userId;

        if(!clerkId){
            res.status(401).json({message: "Unauthorized"});
            return;
        }

        const clerkUser = await clerkClient.users.getUser(clerkId);
        const name = clerkUser.firstName
            ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
            : clerkUser.emailAddresses[0]?.emailAddress?.split("@")[0];

        let user = await User.findOne({clerkId});

        if(!user){
            user = await User.create({
                clerkId,
                name,
                email: clerkUser.emailAddresses[0]?.emailAddress,
                avatar: clerkUser.imageUrl
            });
        } else {
            // Update name and avatar if they changed in Clerk
            user.name = name as string;
            user.avatar = clerkUser.imageUrl;
            await user.save();
        }

        res.json(user)
    }catch(error){
        res.status(500);
        next(error);
    }
}