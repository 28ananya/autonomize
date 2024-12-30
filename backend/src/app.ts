import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import sequelize from './database';

const app = express();

app.use(bodyParser.json());
app.use('/users', userRoutes);

const syncDatabase = async () => {
    await sequelize.sync({ force: false }); // Use `force: true` if you want to recreate the schema (Warning: This will delete existing data)
    console.log('Database synced successfully');
  };
  
syncDatabase();

app.listen(3000, () => console.log('Server running on port 3000'));
