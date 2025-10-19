const getFormacaoModel = (sequelize, DataTypes) => {
    const Formacao = sequelize.define("formacao", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        instituicao: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        curso: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        dataInicio: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        dataTermino: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });

    Formacao.associate = (models) => {
        Formacao.belongsTo(models.Curriculo);
    }

    return Formacao;
};

export default getFormacaoModel;
