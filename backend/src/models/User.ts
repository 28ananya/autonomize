import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

// Define the User model
class User extends Model {
  public id!: number; // Primary key
  public username!: string;
  public name!: string | null;
  public location!: string | null;
  public bio!: string | null;
  public blog!: string | null;
  public avatar_url!: string | null;
  public public_repos!: number;
  public public_gists!: number;
  public followers!: number;
  public following!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    bio: DataTypes.STRING,
    blog: DataTypes.STRING,
    avatar_url: DataTypes.STRING,
    public_repos: DataTypes.INTEGER,
    public_gists: DataTypes.INTEGER,
    followers: DataTypes.INTEGER,
    following: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: 'user',
    paranoid: true, // Enables soft delete
  }
);

export default User;
