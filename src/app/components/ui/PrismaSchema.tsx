import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const Course = prisma.course.create({
  data: {
    title: 'Change Management Specialist (CMS)',
    description: 'A comprehensive course on change management with 7 topics and 8 modules per topic.',
    price: 299,
    modules: {
      create: [
        {
          title: 'Module 1',
          description: 'Introduction to Change Management',
        },
        {
          title: 'Module 2',
          description: 'Change Management Frameworks',
        },
        {
          title: 'Module 3',
          description: 'Change Management Strategies',
        },
        {
          title: 'Module 4',
          description: 'Change Management Tools',
        },
        {
          title: 'Module 5',
          description: 'Change Management Case Studies',
        },
        {
          title: 'Module 6',
          description: 'Change Management Best Practices',
        },
        {
          title: 'Module 7',
          description: 'Change Management Certification',
        },
      ],
    },
  },
});

export const Module = prisma.module.create({
  data: {
    title: 'Module 1',
    description: 'Introduction to Change Management',
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
