import { DataSource } from "typeorm"
import { Covid } from "./entity/covid";
import { User } from "./entity/User";
const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "test",
    entities: [User,Covid],
    synchronize: true,
})
export default myDataSource;