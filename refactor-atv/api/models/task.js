const getTaskModel = (sequelize, { DataTypes }) => {
  const Task = sequelize.define("task", {
    objectId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    },
    concluida: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
  });

  return Task;
};

export default getTaskModel;
