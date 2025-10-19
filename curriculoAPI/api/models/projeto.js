const getProjetoModel = (sequelize, DataTypes) => {
    const Projeto = sequelize.define("projeto", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        nomeProjeto: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        descricaoProjeto: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        linkProjeto: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true,
            },
        },
    });

    Projeto.associate = (models) => {
        Projeto.belongsTo(models.Curriculo);
    }

    return Projeto;
};

export default getProjetoModel;
