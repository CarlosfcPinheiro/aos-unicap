const getProjetoModel = (sequelize, DataTypes) => {
    const Projeto = sequelize.define("projeto", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'nome', // Especifica explicitamente o nome da coluna
            validate: {
                notEmpty: true,
            },
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'descricao', // Especifica explicitamente o nome da coluna
            validate: {
                notEmpty: true,
            },
        },
        link: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'link', // Especifica explicitamente o nome da coluna
            validate: {
                isUrl: true,
            },
        },
    }, {
        underscored: false, // Não usar convenção de underscore
        freezeTableName: true, // Usar exatamente o nome da tabela especificado
    });

    Projeto.associate = (models) => {
        Projeto.belongsTo(models.Curriculo);
    }

    return Projeto;
};

export default getProjetoModel;
