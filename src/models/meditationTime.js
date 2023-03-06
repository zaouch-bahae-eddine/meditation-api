module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'MeditationTime',
        {
            id : {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            date: {
                type: DataTypes.DATE,
            },
            duration: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: { msg: 'meditation duration required.'},
                }
            }
        },
        { 
            timestamps: false
        }
    )
}