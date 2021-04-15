'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.BIGINT,
                field: "id",
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,

            },
            first_name: {
                type: Sequelize.STRING(50),
                field: "first_name",
                allowNull: false
            },
            last_name: {
                type: Sequelize.STRING(50),
                field: "last_name",
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(70),
                field: "email",
                allowNull: false,
                validate: {
                    isEmail: true,
                    isLowercase: true
                },
                unique: true
            },
            password: {
                type: Sequelize.STRING(256),
                field: "password",
                allowNull: false
            },
            roles: {
                type: Sequelize.ENUM("user", "admin"),
                field: "roles",
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,

            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    }
};