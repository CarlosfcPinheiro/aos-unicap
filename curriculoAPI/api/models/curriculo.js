const getCurriculoModel = (sequelize, DataTypes) => {
    const Curriculo = sequelize.define("curriculo", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        resumoProfissional: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });

    Curriculo.associate = (models) => {
        Curriculo.belongsTo(models.Usuario);
        Curriculo.hasMany(models.Experiencia, { onDelete: "CASCADE" });
        Curriculo.hasMany(models.Formacao, { onDelete: "CASCADE" });
        Curriculo.hasMany(models.Projeto, { onDelete: "CASCADE" });
    }

    return Curriculo;
}

export default getCurriculoModel;