import { User } from "../libs/database/entities/user"
import datasource from "../libs/database/datasource"
import bcrypt from "bcrypt";

const start = async () => {
    const connection = await datasource.getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const user = {
            id: 10,
            email: "testuser@gmail.com",
            password: await bcrypt.hash("123456aA@", 10)
        }
        queryRunner.manager.create(User, user);
        await queryRunner.manager.save(User, user);
    } catch (err) {
        await queryRunner.rollbackTransaction()
    } finally {
        await queryRunner.commitTransaction()
    }
}

start().then(res => {
    console.log("CREATE USER SUCCESS", res)
}).catch(err => {
    console.log("CREATE USER ERROR", err)
})
