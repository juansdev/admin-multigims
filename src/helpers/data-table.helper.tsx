import type {DragEndEvent, UniqueIdentifier} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import React from "react";
import {z} from "zod";
import {IconCircle, IconCircleCheckFilled, IconGenderAgender, IconMoonFilled} from "@tabler/icons-react";
import {IDiscordUsers} from "@/interfaces/api/discord-users.interface";
import {IDataSelectorsDto, IDataTableDto, ISchemaDataTableDto, ISchemaRolesTableDto} from "@/dto/discord-users.dto";
import {convertDateToString} from "@/helpers/common.helper";

export const handleDragEnd = (event: DragEndEvent,
                              dataIds: UniqueIdentifier[],
                              setData: React.Dispatch<React.SetStateAction<z.infer<typeof ISchemaDataTableDto>[]>>) => {
    const {active, over} = event
    if (active && over && active.id !== over.id) {
        setData((data) => {
            const oldIndex = dataIds.indexOf(active.id)
            const newIndex = dataIds.indexOf(over.id)
            return arrayMove(data, oldIndex, newIndex)
        });
    }
}

export const updateDataSelectors = (dataSelectors: IDataSelectorsDto[], data: z.infer<typeof ISchemaDataTableDto>[]) => {
    dataSelectors.push({
        "id": 0,
        "label": "Todos",
        "quantity": data.length
    });
    return dataSelectors.sort((a, b) => a.id - b.id);
}

export const getRowStatusByStatus = (status: string) => {
    let rowStatus: React.JSX.Element;
    switch (status) {
        case "En línea":
            rowStatus = <>{status} <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400"/></>;
            break;
        case "Ausente":
            rowStatus = <>{status} <IconMoonFilled className="fill-yellow-600 dark:fill-yellow-500"/></>;
            break;
        case "No molestar":
            rowStatus = <>{status} <IconGenderAgender className="fill-red-700 dark:fill-red-600"/></>;
            break;
        default:
            rowStatus = <>{status} <IconCircle className="fill-neutral-500 dark:fill-neutral-400"/></>;
            break;
    }
    return rowStatus;
}

export const getDataByKey = (data: z.infer<typeof ISchemaDataTableDto>[], currentRol: string): z.infer<typeof ISchemaDataTableDto>[] => data.filter(data => data.roles.filter(rol => rol.name === currentRol).length);

export const getDataSelectors = ({data, roles}: Readonly<IDataTableDto>) => {
    let dataSelectors: IDataSelectorsDto[] = [];
    for (const row of data) {
        dataSelectors = row.roles.reduce((prev, rol) => {
            const id = roles.find(originalRol => rol.name === originalRol.name)!.id;
            const existId = !!(prev.find((valuePrev: IDataSelectorsDto) => valuePrev.id === id)?.id);
            const currentQuantity = prev.find((valuePrev: IDataSelectorsDto) => valuePrev.label === rol.name)?.quantity;
            let selector: IDataSelectorsDto;
            const label = roles.find(originalRol => rol.name === originalRol.name)!.name;
            if ([id, label].every(val => val)) {
                if (currentQuantity !== undefined)
                    selector = {
                        id,
                        label,
                        quantity: currentQuantity + 1
                    };
                else selector = {
                    id,
                    label,
                    quantity: 1
                };
                if (!existId) prev.push(selector);
                else prev = prev.map(value => {
                    if (value.id === id) value = selector;
                    return value;
                });
            }
            return prev;
        }, dataSelectors);
    }
    return dataSelectors;
}

export const discordUsersToDataTableDto = (data: IDiscordUsers[]): IDataTableDto => {
    const roleDto: z.infer<typeof ISchemaRolesTableDto>[] = [];
    const dataDto: z.infer<typeof ISchemaDataTableDto>[] = data.map((user: IDiscordUsers) => ({
        id: user._id,
        username: user.nickname ? user.nickname : user.username,
        handle: user.username,
        status: "En línea",
        aboutMe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.",
        memberDate: convertDateToString(new Date(user.joinedAt)),
        roles: user.roles.map((role) => {
            const existRole = roleDto.find(
                roleDto =>
                    roleDto.name === role
            );
            if (!existRole) {
                roleDto.push({
                    id: roleDto.length,
                    name: role,
                    color: "#000000"
                });
                return roleDto[roleDto.length - 1];
            }
            return existRole;
        }),
        avatarUrl: "/avatars/placeholder_user.png",
        bannerUrl: "/avatars/placeholder_banner.png"
    }));
    return {
        data: dataDto,
        roles: roleDto
    };
}