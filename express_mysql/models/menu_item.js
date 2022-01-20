const Sequelize = require('sequelize');

module.exports = class MenuItem extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            user_id: { // sns 로그인 시 저장
                type: Sequelize.INTEGER(11),
                allowNull: false,
            },
            count: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                defaultValue: 0,
            },
            price: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                defaultValue: 0,
            },
            cost: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                defaultValue: 0
            },
        }, {
            sequelize,
            timestamps: false, // Set a createdAt and a updatedAt
            underscored: false,
            modelName: 'MenuItem',
            tableName: 'menu_item',
            paranoid: false, // Set a deletedAt
            charset: 'utf8',
        });
    }

    // 각 모델 간의 관계를 associate 함수 안에 정의
    static associate(db) {
        db.MenuItem.hasMany(db.MenuRecipe, {foreignKey: 'fk_menu_item_id', sourceKey: 'id'});
        // 같은 모델끼리 N:M 관계를 갖는다.
        // 사용자 한 명이 팔로워를 여러 명 가질 수도 있고, 한 사람이 여러 명을 팔로우할 수 있음.
        db.MenuItem.belongsTo(db.User, {foreignKey: 'fk_user_id_menu_item', targetKey: 'id'});
        
    }
}