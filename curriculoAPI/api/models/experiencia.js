const getExperienciaModel = (sequelize, DataTypes) => {
    const Experiencia = sequelize.define("experiencia", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        empresa: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        cargo: {
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
            allowNull: true,
        },
        descricaoAtividades: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });

    Experiencia.associate = (models) => {
        Experiencia.belongsTo(models.Curriculo);
    }

    return Experiencia;
};

export default getExperienciaModel;
