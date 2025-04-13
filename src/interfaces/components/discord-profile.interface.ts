export interface IDiscordProfileProps {
    username: string;
    handle: string;
    status: string;
    aboutMe: string[];
    memberDate: string;
    roles: Array<{ name: string; color: string }>;
    avatarUrl: string;
    bannerUrl: string;
}