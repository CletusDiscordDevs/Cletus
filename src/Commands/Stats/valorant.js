const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'valorant',
    dev: false,
    usage: {
        docs: 'valorant <platform> <username>'
    },
    description: 'Shows Valorant stats',
    run: async (client, message, args) => {

        let res = await fetch(`https://api.tracker.gg/api/v2/valorant/standard/profile/${encodeURIComponent(args[0])}/${encodeURIComponent(args[1])}`);
        let body = await res.json();

        let embeds = formatData(body.data);

       
    
    }
}

function formatData(data){

    return [
        {
            embed: {
                title: "Platform Information",
                fields: [
                    {
                        key: "Platform",
                        value: data.platformInfo.platformSlug
                    },
                    {
                        key: "User ID",
                        value: data.platformInfo.platformUserId
                    },
                    {
                        key: "User Identifier",
                        value: data.platformInfo.platformUserIdentifier
                    }
                ]
            }
        },
        {
            embed: {
                title: "User Information",
                fields: [
                    {
                        key: "User",
                        value: data.userInfo.UserId
                    },
                    {
                        key: "Verified",
                        value: data.userInfo.isVerified ? "Yes" : "No"
                    },
                    {
                        key: "Premium",
                        value: data.userInfo.isPremium ? "Yes" : "No"
                    }


                ]
            }
        },
        {

        },
        {

        }
    ] 

}