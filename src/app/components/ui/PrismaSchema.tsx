import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const Course = prisma.course.create({
  data: {
    title: 'Change Management Specialist (CMS)',
    description: 'A comprehensive course on change management with 7 topics and 8 modules per topic.',
    price: 299,
    topics: {
      create: [
        {
          title: 'Topic 1',
          modules: {
            create: [
              {
                title: 'Module 1',
                content: 'Introduction to Change Management',
              },
              {
                title: 'Module 2',
                content: 'Change Management Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Change Management Strategies',
              },
              {
                title: 'Module 4',
                content: 'Change Management Tools',
              },
              {
                title: 'Module 5',
                content: 'Change Management Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Change Management Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Change Management Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Change Management Techniques',
              },
            ],
          },
        },
        {
          title: 'Topic 2',
          modules: {
            create: [
              {
                title: 'Module 1',
                content: 'Introduction to Change Management',
              },
              {
                title: 'Module 2',
                content: 'Change Management Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Change Management Strategies',
              },
              {
                title: 'Module 4',
                content: 'Change Management Tools',
              },
              {
                title: 'Module 5',
                content: 'Change Management Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Change Management Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Change Management Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Change Management Techniques',
              },
            ],
          },
        },
        {
          title: 'Topic 3',
          modules: {
            create: [
              {
                title: 'Module 1',
                content: 'Introduction to Change Management',
              },
              {
                title: 'Module 2',
                content: 'Change Management Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Change Management Strategies',
              },
              {
                title: 'Module 4',
                content: 'Change Management Tools',
              },
              {
                title: 'Module 5',
                content: 'Change Management Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Change Management Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Change Management Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Change Management Techniques',
              },
            ],
          },
        },
        {
          title: 'Topic 4',
          modules: {
            create: [
              {
                title: 'Module 1',
                content: 'Introduction to Change Management',
              },
              {
                title: 'Module 2',
                content: 'Change Management Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Change Management Strategies',
              },
              {
                title: 'Module 4',
                content: 'Change Management Tools',
              },
              {
                title: 'Module 5',
                content: 'Change Management Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Change Management Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Change Management Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Change Management Techniques',
              },
            ],
          },
        },
        {
          title: 'Topic 5',
          modules: {
            create: [
              {
                title: 'Module 1',
                content: 'Introduction to Change Management',
              },
              {
                title: 'Module 2',
                content: 'Change Management Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Change Management Strategies',
              },
              {
                title: 'Module 4',
                content: 'Change Management Tools',
              },
              {
                title: 'Module 5',
                content: 'Change Management Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Change Management Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Change Management Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Change Management Techniques',
              },
            ],
          },
        },
        {
          title: 'Topic 6',
          modules: {
            create: [
              {
                title: 'Module 1',
                content: 'Introduction to Change Management',
              },
              {
                title: 'Module 2',
                content: 'Change Management Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Change Management Strategies',
              },
              {
                title: 'Module 4',
                content: 'Change Management Tools',
              },
              {
                title: 'Module 5',
                content: 'Change Management Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Change Management Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Change Management Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Change Management Techniques',
              },
            ],
          },
        },
        {
          title: 'Topic 7',
          modules: {
            create: [
              {
                title: 'Module 1',
                content: 'Introduction to Change Management',
              },
              {
                title: 'Module 2',
                content: 'Change Management Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Change Management Strategies',
              },
              {
                title: 'Module 4',
                content: 'Change Management Tools',
              },
              {
                title: 'Module 5',
                content: 'Change Management Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Change Management Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Change Management Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Change Management Techniques',
              },
            ],
          },
        },
      ],
    },
  },
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
