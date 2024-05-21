import fs from 'fs';
import path from 'path';
import dataSource from '../../database/datasource';
const seedingVer = '16122023';

const _getSeedingDir = () => path.join(__dirname, seedingVer);
const _readSqlDir = () => fs.readdirSync(_getSeedingDir());
const _readSqlFile = (filePath: string) => fs.readFileSync(path.join(_getSeedingDir(), filePath)).toString();

const _getSeedingReferenceDir = () => path.join(__dirname, seedingVer, 'references');
const _readSqlReferenceDir = () => fs.readdirSync(_getSeedingReferenceDir());
const _readSqlReferenceFile = (filePath: string) => fs.readFileSync(path.join(_getSeedingReferenceDir(), filePath)).toString();

const startImportSql = async () => {
  console.log('START_IMPORT');
  if (!seedingVer) {
    throw new Error('VERSION_NOT_FOUND');
  }
  const seedingSQLfiles = _readSqlDir();
  const seedingSQLReferencesFields = _readSqlReferenceDir();
  const connection = await dataSource.getConnection({ logging: true });
  const queryRunner = connection.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  console.log('seedingSQLfiles', seedingSQLfiles)
  let isError = false;
  await Promise.allSettled(
    seedingSQLfiles.map(async (filename) => {
      if (isError) return;
      try {
        console.log('filename', filename);
        if (!fs.lstatSync(path.join(_getSeedingDir(), filename)).isDirectory()) {
          const dataSQL = _readSqlFile(filename);
          console.log('dataSQL', dataSQL)
          return queryRunner.query(dataSQL).catch(err =>  isError = true);
        }
      } catch (err) {
        console.log(`error ${filename} :`, err);
        isError = true;
      }
    }),
  );
  await Promise.allSettled(
    seedingSQLReferencesFields.map(async (filename) => {
      if (isError) return;
      try {
        console.log('filename', filename);
        if (!fs.lstatSync(path.join(_getSeedingReferenceDir(), filename)).isDirectory()) {
          const dataSQL = _readSqlReferenceFile(filename);
          // const sqlItems = dataSQL.split(';')
          // return Promise.allSettled(sqlItems.map(item => queryRunner.query(item).catch(() => isError = true)))
          return queryRunner.query(dataSQL).catch(err =>  isError = true);
        }
      } catch (err) {
        console.log(`error ${filename} :`, err);
        isError = true;
      }
    }),
  );
  if (isError) {
    console.log('ROLLBACK_INPROGRESS');
    await queryRunner.rollbackTransaction();
    console.log('ROLLBACK_COMPLETED');
  }
  if (!isError) {
    await queryRunner.commitTransaction();
  }
  await queryRunner.release();
  console.timeEnd('import in');
  console.log('IMPORT_SUCCESS');
};

startImportSql();
