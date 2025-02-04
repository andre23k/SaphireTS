import { Events } from "discord.js";
import client from "../saphire";
import { members, users } from "../database/cache";

client.on(Events.GuildMembersChunk, async (membersChunck, guild, _) => {

    const membersValues = membersChunck.values();

    for (const member of membersValues) {
        if (!members.has(`${guild.id}_${member.id}`))
            members.set(`${guild.id}_${member.id}`, member);

        if (!users.has(member.id)) {
            users.set(member.id, member.user);
            setTimeout(() => users.delete(member.id), 1000 * 60 * 5);
        }
    }

    return;
});