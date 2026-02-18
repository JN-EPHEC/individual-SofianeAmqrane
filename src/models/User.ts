import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class User extends Model {
  public id!: number;
  public nom!: string;
  public prenom!: string;
  public role!: string;

  public readonly createdAt!: Date; 
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING, allowNull: false },
    prenom: { type: DataTypes.STRING, allowNull: false },
    role: { 
      type: DataTypes.ENUM('etudiant', 'prof', 'admin'),
      defaultValue: 'etudiant',
      allowNull: false
    },
  },
  { sequelize, modelName: 'user', tableName: 'users' }
);

export default User;