import React from "react";
import {Icon} from "@tabler/icons-react";

export interface IData {
    user: IUser;
    navMain: INav[];
    navSecondary: INav[];
}

export interface INav {
    title: string;
    url: string;
    icon: React.ForwardRefExoticComponent<React.RefAttributes<Icon>>;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    avatar: string;
    job_title: string;
    department: string;
    location: string;
    phone: string;
    website: string;
    joined: string;
    bio: string;
}