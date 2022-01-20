const Sequelize = require('sequelize');

module.exports = class Sales extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            date: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            user_id: { // sns 로그인 시 저장
                type: Sequelize.INTEGER(11),
                allowNull: false,
            },
            total_cost: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                defaultValue: 0
            },
            total_sale: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                defaultValue: 0
            },
            expense: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                defaultValue: 0
            },
        }, {
            sequelize,
            timestamps: false, // Set a createdAt and a updatedAt
            underscored: false,
            modelName: 'Sales',
            tableName: 'sales',
            paranoid: false, // Set a deletedAt
            charset: 'utf8',
        });
    }

    // 각 모델 간의 관계를 associate 함수 안에 정의
    static associate(db) {
        // 같은 모델끼리 N:M 관계를 갖는다.
        // 사용자 한 명이 팔로워를 여러 명 가질 수도 있고, 한 사람이 여러 명을 팔로우할 수 있음.
        db.Sales.belongsTo(db.User, {foreignKey: 'fk_user_id_sales', targetKey: 'id'});
        
    }
}