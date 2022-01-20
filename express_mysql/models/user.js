const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            kakao_id: { // local: 로컬 로그인, kakao: 카카오 로그인
                type: Sequelize.INTEGER(11),
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false, // Set a createdAt and a updatedAt
            underscored: false,
            modelName: 'User',
            tableName: 'user',
            paranoid: false, // Set a deletedAt
            charset: 'utf8',
        });
    }

    // 각 모델 간의 관계를 associate 함수 안에 정의
    static associate(db) {
        db.User.hasMany(db.Post, {foreignKey: 'fk_user_id_post', sourceKey: 'id'});
        // 같은 모델끼리 N:M 관계를 갖는다.
        // 사용자 한 명이 팔로워를 여러 명 가질 수도 있고, 한 사람이 여러 명을 팔로우할 수 있음.
        db.User.hasMany(db.Comment, {foreignKey: 'fk_user_id_comment', sourceKey: 'id'});
        db.User.hasMany(db.MenuItem, {foreignKey: 'fk_user_id_menu_item', sourceKey: 'id'});
    }
}