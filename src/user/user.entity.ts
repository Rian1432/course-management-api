import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../role/role.entity';
import { Course } from '../course/course.entity';
import { UserCourse } from '../user-course/user-course.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  name: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role: Role;

  @OneToMany(() => Course, (course) => course.instructor)
  courses: Course[];

  @OneToMany(() => UserCourse, (userCourse) => userCourse.user)
  enrollments: UserCourse[];

  @CreateDateColumn()
  created_at: Date;
}
