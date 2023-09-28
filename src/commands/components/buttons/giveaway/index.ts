import { ButtonInteraction } from "discord.js";
import { GiveawayManager } from "../../../../managers";
import { e } from "../../../../util/json";
import join from "./join";
import leave from "./leave";
import { urls } from "../../../../util/constants";
import { t } from "../../../../translator";
import deleteGiveaway from "./delete";

export default async function giveawayButton(interaction: ButtonInteraction<"cached">, customData: { c: "giveaway", src: string | undefined, gwId?: string }) {

    const locale = interaction.userLocale;

    if (customData?.src === "ignore")
        return await interaction.update({ content: t("giveaway.nothing_happen", { e, locale }), components: [] });

    const giveaway = GiveawayManager.cache.get(customData?.gwId || interaction.message?.id);

    if (!customData?.src)
        return await interaction.reply({ content: "$81SD98H7SER3@#", ephemeral: true });

    if (customData?.src === "join") return join(interaction);
    if (!giveaway)
        return await interaction.reply({
            content: t("giveaway.not_found", { e, locale }),
            ephemeral: true
        });

    if (!giveaway.message)
        giveaway.message = interaction.message;

    switch (customData?.src) {
        case "leave": leave(interaction, giveaway); break;
        case "delete": deleteGiveaway(interaction, customData?.gwId); break;

        case "list":
            await interaction.update({
                content: `${e.Animated.SaphireReading} | ${t("giveaway.link", locale)}: ${urls.saphireSiteUrl}/giveaway/?id=${giveaway?.MessageID}&guildId=${interaction.guildId}`,
                components: []
            });
            break;

        default:
            await interaction.reply({
                content: `${e.DenyX} | #4SD78JYTU4RCH87D8#`,
                ephemeral: true
            });
            break;
    }

    return;
}