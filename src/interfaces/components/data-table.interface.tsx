import React from "react";
import {IDataSelectorsDto, IDataTableDto} from "@/dto/discord-users.dto";

export interface IFetchData {
    setData: React.Dispatch<React.SetStateAction<IDataTableDto>>,
    setDefaultValueTab: React.Dispatch<React.SetStateAction<string | undefined>>,
    setDataSelectors: React.Dispatch<React.SetStateAction<IDataSelectorsDto[]>>
}