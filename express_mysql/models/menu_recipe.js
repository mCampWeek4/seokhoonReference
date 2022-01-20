const Sequelize = require('sequelize');

module.exports = class MenuRecipe extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            menu_id: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
            },
            ingredient_id: { // local: 로컬 로그인, kakao: 카카오 로그인
                type: Sequelize.INTEGER(11),
                allowNull: false,
            },
            amount: { // sns 로그인 시 저장
                type: Sequelize.INTEGER(11),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false, // Set a createdAt and a updatedAt
            underscored: false,
            modelName: 'MenuRecipe',
            tableName: 'menu_recipe',
            paranoid: false, // Set a deletedAt
            charset: 'utf8',
        });
    }

    // 각 모델 간의 관계를 associate 함수 안에 정의
    static associate(db) {
        db.MenuRecipe.belongsTo(db.MenuItem, {foreignKey: 'fk_menu_item_id', targetKey: 'id'});
        db.MenuRecipe.belongsTo(db.IngredientItem, {foreignKey: 'fk_ingredient_id', targetKey: 'id'});
        // 같은 모델끼리 N:M 관계를 갖는다.
        // 사용자 한 명이 팔로워를 여러 명 가질 수도 있고, 한 사람이 여러 명을 팔로우할 수 있음.
        
        
    }
}