const getUsuarioModel = (sequelize, { DataTypes }) => {
  const Usuario = sequelize.define("usuario", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    nomeCompleto: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    telefone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    }
  });

  Usuario.associate = (models) => {
    Usuario.hasOne(models.Curriculo, { onDelete: "CASCADE" });
  };

  return Usuario;
};

export default getUsuarioModel;
