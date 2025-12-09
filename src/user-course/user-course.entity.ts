import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Course } from '../course/course.entity';

@Entity('user_courses')
export class UserCourse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.enrollments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Course, (course) => course.enrollments, {
    onDelete: 'CASCADE',
  })
  course: Course;

  @CreateDateColumn()
  created_at: Date;
}
