import { PrismaClient } from '@prisma/client';
import { createCourse } from './courseFactory';
import courses from './seedData';

const prisma = new PrismaClient();

export const seedCourses = () => courses.map(createCourse);

export const Course = prisma.course.create({
  data: {
    title: 'Change Management Specialist (CMS)',
    description: 'A comprehensive course on change management with 7 topics and 8 modules per topic.',
    price: 299,
    topics: {
      create: Array.from({ length: 7 }, (_, i) => ({
        title: `Topic ${i + 1}`,
        modules: {
          create: Array.from({ length: 8 }, (_, j) => ({
            title: `Module ${j + 1}`,
            content: 'Content for module'
          }))
        }
      }))
    }
  }
});

export const Module = prisma.module.create({
  data: {
    title: 'Module 1',
    content: 'Introduction to Change Management',
    courseId: 1,
  },
});

export const Exam = prisma.exam.create({
  data: {
    courseId: 1,
    questions: {
      create: [
        {
          text: 'What is change management?',
          options: ['A', 'B', 'C', 'D'],
          correctOption: 'A',
        },
        {
          text: 'What is a change management framework?',
          options: ['A', 'B', 'C', 'D'],
          correctOption: 'B',
        },
        // Add more questions as needed
      ],
    },
  },
});

export const User = prisma.user.create({
  data: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
  },
});
