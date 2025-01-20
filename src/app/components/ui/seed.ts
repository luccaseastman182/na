import { createCourse } from './courseFactory';
import courses from './seedData';

export const seedCourses = () => courses.map(createCourse);
