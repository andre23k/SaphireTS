import { Events } from "discord.js";
import client from "../saphire";
import { BanManager, CrashManager, GiveawayManager, JokempoManager, PayManager } from "../managers";
import { members } from "../database/cache";

client.on(Events.GuildDelete, async guild => {

    if (!guild?.id) return;

    for (const key of members.keys())
        if (key.includes(guild.id))
            members.delete(key);

    GiveawayManager.deleteAllGiveawaysFromThisGuild(guild.id, true);
    JokempoManager.deleteAllFromThisGuild(guild.id);
    PayManager.refundByGuildId(guild.id);
    CrashManager.bulkRefundByGuildId(guild.id);
    BanManager.removeAllFromThisGuild(guild.id);

    return;
});