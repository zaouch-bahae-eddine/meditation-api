module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'User',
        {
            id : {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: { msg: 'Email form not respected.'},
                    notNull: { msg: 'Email required.'},
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        { 
            timestamps: false
        }
    )
}