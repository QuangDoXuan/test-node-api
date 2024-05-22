import { Entity, Column, BeforeInsert } from "typeorm";
import { AbstractEntity } from "../abstracts/abstract-entity";
import bcrypt from 'bcrypt';
import { UserTypeEnum } from "../../../libs/common/enum";

@Entity({ name: "users" })
export class User extends AbstractEntity<User> {
  @Column({ name: 'email', length: 255, nullable: false })
  email: string;

  @Column({
    name: 'user_type',
    type: 'enum',
    enumName: 'UserTypeEnum',
    enum: UserTypeEnum,
    default: UserTypeEnum.MONTHLY
  })
  userType: UserTypeEnum;

  @Column({ name: 'base_salary', type: 'integer', default: 0 })
  baseSalary: number;

  @Column({ name: 'balance', type: 'integer', default: 0 })
  balance: number;

  @Column({ name: 'days_worked', type: 'integer', default: 0 })
  daysWorked: number;

  @Column({ name: 'daily_rate', type: 'integer', default: 0 })
  dailyRate: number;

  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  @Column({ name: 'updated_balance_at', type: 'datetime', nullable: true })
  updatedBalanceAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
