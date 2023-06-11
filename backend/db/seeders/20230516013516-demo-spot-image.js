'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA //define schema in options obj
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1116844790915551242/a8ee8e52-7aaa-4ce2-8869-6c80b1569220.png?width=1014&height=676',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1116844791343357993/1365c102-5866-4345-a5ff-a0dfc9f45943.png?width=1014&height=676',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1116844791662129152/fc48d57c-9f34-4439-86ca-979a2558cb79.png?width=903&height=676',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1116844792169648128/24d819e6-d2c7-48e7-81f0-88d40ddf7ba0.png?width=1014&height=676',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1116844792555511918/8228c8a4-a57c-4b06-a1cd-c26950cafc80.png?width=1014&height=676',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1117170420681023619/a7b17293-26ed-468a-8098-bef83dad2449.png?width=1014&height=676',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1117170421264023683/0f4547f6-6a7f-48a4-aef8-7d66cbdcec4d.png?width=1014&height=676',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1117170421742178324/815c687f-942f-428a-af82-818943ba669b.png?width=958&height=676',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1117170422836895864/b1cb031b-63c1-471f-9af5-f6ab726bc6d0.png?width=1014&height=676',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1117170423277289622/97914d77-4982-49b0-b078-7071b0a143a4.png?width=1014&height=676',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1117171154768121866/141d2945-0d2c-45ae-b108-246447071fde.png?width=1014&height=676',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1117171155267227738/05d88291-733a-41f4-910b-7c02f6be2253.png?width=1013&height=676',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1117171155732799498/9b25b3b5-8ba5-4394-a0fc-fdcad334778a.png?width=1014&height=676',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1117171156110299149/8d6b5a68-1f5c-41b5-8065-d601267265b1.png?width=1013&height=676',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1117171156420661268/f02bdd9f-6255-4550-96f8-02270ce93f1b.png?width=1013&height=676',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1116845858693066774/8fd535c8-2249-4bc0-b8b8-4b21363a1dc0.png?width=451&height=676',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1116845859284455454/96ab9dd1-568e-45ee-9d86-21926adfc4f1.png?width=1012&height=676',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1116845859578064906/66f36259-46a4-4466-a5eb-9418def1e593.png?width=1012&height=676',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1116845860081377410/0100c4e0-04f1-4c34-86b2-c25d75e79de6.png?width=1012&height=676',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1116845860546940938/74acaf8f-9668-404d-b3ef-25cce30de9ba.png?width=1012&height=676',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1117169761906872401/f9da8929-470a-4370-ba77-88495ae4206c.png?width=1015&height=676',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1117169762301116496/cb7a3244-ad82-49f2-8081-c5939d5c4ee2.png?width=1203&height=676',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1117169762804449310/904ff852-c206-46fa-a17d-6ae7b4aa79d9.png?width=1015&height=676',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1117169763513290772/103ea3b2-96cb-4a65-aab0-66d1422e9e76.png?width=1203&height=676',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1117169764062724197/ff149325-83c1-4a90-9610-ac85cb5de8ed.png?width=1015&height=676',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1117169979477999756/2651dc08-a6ee-44d6-b6fc-62fcf80c632f.png?width=1014&height=676',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1117169979863867402/facecada-494e-40ab-a743-c13c2b9d42c2.png?width=1014&height=676',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1117169980526563388/b2220e92-b839-4b82-96a2-9420bd302e1f.png?width=1014&height=676',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1117169980887285851/bd40b0cf-edf7-4ebc-8c99-6eecfea463de.png?width=1014&height=676',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://media.discordapp.net/attachments/1116408005085372466/1117169981172490333/403a14fc-43a9-4743-b3f4-31d43d4b896a.png?width=1014&height=676',
        preview: false
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['www.appacademy.io/image', 'www.statueofliberty.com/image', 'www.rams.gone/image'] }
    }, {});
  }
};
