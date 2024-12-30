import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class Friend extends Model {}

Friend.init(
  {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    friend_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: 'friend' }
);

export default Friend;
