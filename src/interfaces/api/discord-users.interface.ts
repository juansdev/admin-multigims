export interface IDiscordUsers {
    _id: string;
    discordId: string;
    username: string;
    discriminator: string;
    nickname: string;
    roles: string[];
    permissions: string[];
    joinedAt: Date;
    __v: number;
}