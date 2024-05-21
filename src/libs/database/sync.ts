import dotenv from 'dotenv';
dotenv.config();
import datasource from './datasource';

(async () => {
  try {
    console.log('START_SYNC');
    await datasource.getConnection({
      synchronize: true,
      logging: true,
    });
    console.log('SYNC_SUCCESS');
    await datasource.closeConnection();
  } catch (error) {
    console.error('SYNC_ERROR', error);
    process.exit(1);
  }
})();
