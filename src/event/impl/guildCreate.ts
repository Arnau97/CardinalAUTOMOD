import * as Discord from "discord.js"

import {IEvent} from "../event";
import {Globals} from "../../globals";
import {GuildConfiguration} from "../../entity/guildConfiguration";
import {getRepository} from "typeorm";

export default class GuildCreateEvent implements IEvent {
    constructor() {
        this.name = "guildCreate"
    }

    name: string;

    async override(client, guild): Promise<void> {

        const guildConfiguration = new GuildConfiguration();
        guildConfiguration.guildID = guild.id;
        guildConfiguration.logsChannelID = "none";
        guildConfiguration.profanityChecker = 0;

        await getRepository(GuildConfiguration).save(guildConfiguration);

        const embed = new Discord.RichEmbed()
            .setThumbnail(Globals.clientInstance.user.avatarURL)
            .setColor(0xf1c40f)
            .setAuthor("🔑 Cardinal welcome message.")
            .setDescription("Heya! Im Cardinal Moderation - an advanced Discord **moderation** bot.")
            .addField("Why does i received this message?!", `Because it seems that you are owner of ${guild.name}`, true)
            .addField("Where can I see list of commands or smth?", "Commands documentation and feature list " +
                "can be found at https://github.com/zxvnme/Gatekeeper/blob/master/README.md", true)
            .addField("... or get help on your guild!", "Use `cm!help` command for it.")
            .addField("UsageChecker™", "Use `g!usage [command]`")
            .setFooter("Created by ZeroTwo#0002");

        await guild.members.get(guild.ownerID).send(embed);
    }
}