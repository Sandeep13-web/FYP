'use strict';
module.exports = {
  up: async (queryInterface) => {
    return queryInterface.sequelize.transaction(async () => {
      await queryInterface.bulkDelete('languages'),
      await queryInterface.bulkInsert('languages', [
        {
          id: 1,
          name: 'English',
          language_code: 'en',
          group: 'backend',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          name: 'English',
          language_code: 'en',
          group: 'frontend',
          created_at: new Date(),
          updated_at: new Date()
        }, {
          id: 3,
          name: 'Japanese',
          language_code: 'ja',
          group: 'backend',
          created_at: new Date(),
          updated_at: new Date()
        }, {
          id: 4,
          name: 'Japanese',
          language_code: 'ja',
          group: 'frontend',
          created_at: new Date(),
          updated_at: new Date()
        }
      ], {});
    }
    );
  },


  down: async (queryInterface) => {
    await queryInterface.bulkDelete('languages');
  }
};
