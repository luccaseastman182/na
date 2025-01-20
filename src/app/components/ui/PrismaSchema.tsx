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

// Adding new courses

export const LeanSixSigmaYellowBelt = prisma.course.create({
  data: {
    title: 'Lean Six Sigma Yellow Belt (LSS-YB)',
    description: 'A comprehensive course on Lean Six Sigma Yellow Belt with 7 topics and 8 modules per topic.',
    price: 299,
    topics: {
      create: [
        {
          title: 'Topic 1',
          modules: {
            create: [
              {
                title: 'Module 1',
                content: 'Introduction to Lean Six Sigma',
              },
              {
                title: 'Module 2',
                content: 'Lean Six Sigma Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Lean Six Sigma Strategies',
              },
              {
                title: 'Module 4',
                content: 'Lean Six Sigma Tools',
              },
              {
                title: 'Module 5',
                content: 'Lean Six Sigma Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Lean Six Sigma Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Lean Six Sigma Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Lean Six Sigma Techniques',
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
                content: 'Introduction to Lean Six Sigma',
              },
              {
                title: 'Module 2',
                content: 'Lean Six Sigma Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Lean Six Sigma Strategies',
              },
              {
                title: 'Module 4',
                content: 'Lean Six Sigma Tools',
              },
              {
                title: 'Module 5',
                content: 'Lean Six Sigma Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Lean Six Sigma Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Lean Six Sigma Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Lean Six Sigma Techniques',
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
                content: 'Introduction to Lean Six Sigma',
              },
              {
                title: 'Module 2',
                content: 'Lean Six Sigma Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Lean Six Sigma Strategies',
              },
              {
                title: 'Module 4',
                content: 'Lean Six Sigma Tools',
              },
              {
                title: 'Module 5',
                content: 'Lean Six Sigma Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Lean Six Sigma Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Lean Six Sigma Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Lean Six Sigma Techniques',
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
                content: 'Introduction to Lean Six Sigma',
              },
              {
                title: 'Module 2',
                content: 'Lean Six Sigma Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Lean Six Sigma Strategies',
              },
              {
                title: 'Module 4',
                content: 'Lean Six Sigma Tools',
              },
              {
                title: 'Module 5',
                content: 'Lean Six Sigma Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Lean Six Sigma Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Lean Six Sigma Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Lean Six Sigma Techniques',
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
                content: 'Introduction to Lean Six Sigma',
              },
              {
                title: 'Module 2',
                content: 'Lean Six Sigma Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Lean Six Sigma Strategies',
              },
              {
                title: 'Module 4',
                content: 'Lean Six Sigma Tools',
              },
              {
                title: 'Module 5',
                content: 'Lean Six Sigma Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Lean Six Sigma Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Lean Six Sigma Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Lean Six Sigma Techniques',
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
                content: 'Introduction to Lean Six Sigma',
              },
              {
                title: 'Module 2',
                content: 'Lean Six Sigma Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Lean Six Sigma Strategies',
              },
              {
                title: 'Module 4',
                content: 'Lean Six Sigma Tools',
              },
              {
                title: 'Module 5',
                content: 'Lean Six Sigma Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Lean Six Sigma Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Lean Six Sigma Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Lean Six Sigma Techniques',
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
                content: 'Introduction to Lean Six Sigma',
              },
              {
                title: 'Module 2',
                content: 'Lean Six Sigma Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Lean Six Sigma Strategies',
              },
              {
                title: 'Module 4',
                content: 'Lean Six Sigma Tools',
              },
              {
                title: 'Module 5',
                content: 'Lean Six Sigma Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Lean Six Sigma Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Lean Six Sigma Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Lean Six Sigma Techniques',
              },
            ],
          },
        },
      ],
    },
  },
});

export const LeanSixSigmaGreenBelt = prisma.course.create({
  data: {
    title: 'Lean Six Sigma Green Belt (LSS-GB)',
    description: 'A comprehensive course on Lean Six Sigma Green Belt with 7 topics and 8 modules per topic.',
    price: 299,
    topics: {
      create: [
        {
          title: 'Topic 1',
          modules: {
            create: [
              {
                title: 'Module 1',
                content: 'Introduction to Lean Six Sigma',
              },
              {
                title: 'Module 2',
                content: 'Lean Six Sigma Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Lean Six Sigma Strategies',
              },
              {
                title: 'Module 4',
                content: 'Lean Six Sigma Tools',
              },
              {
                title: 'Module 5',
                content: 'Lean Six Sigma Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Lean Six Sigma Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Lean Six Sigma Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Lean Six Sigma Techniques',
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
                content: 'Introduction to Lean Six Sigma',
              },
              {
                title: 'Module 2',
                content: 'Lean Six Sigma Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Lean Six Sigma Strategies',
              },
              {
                title: 'Module 4',
                content: 'Lean Six Sigma Tools',
              },
              {
                title: 'Module 5',
                content: 'Lean Six Sigma Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Lean Six Sigma Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Lean Six Sigma Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Lean Six Sigma Techniques',
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
                content: 'Introduction to Lean Six Sigma',
              },
              {
                title: 'Module 2',
                content: 'Lean Six Sigma Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Lean Six Sigma Strategies',
              },
              {
                title: 'Module 4',
                content: 'Lean Six Sigma Tools',
              },
              {
                title: 'Module 5',
                content: 'Lean Six Sigma Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Lean Six Sigma Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Lean Six Sigma Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Lean Six Sigma Techniques',
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
                content: 'Introduction to Lean Six Sigma',
              },
              {
                title: 'Module 2',
                content: 'Lean Six Sigma Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Lean Six Sigma Strategies',
              },
              {
                title: 'Module 4',
                content: 'Lean Six Sigma Tools',
              },
              {
                title: 'Module 5',
                content: 'Lean Six Sigma Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Lean Six Sigma Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Lean Six Sigma Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Lean Six Sigma Techniques',
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
                content: 'Introduction to Lean Six Sigma',
              },
              {
                title: 'Module 2',
                content: 'Lean Six Sigma Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Lean Six Sigma Strategies',
              },
              {
                title: 'Module 4',
                content: 'Lean Six Sigma Tools',
              },
              {
                title: 'Module 5',
                content: 'Lean Six Sigma Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Lean Six Sigma Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Lean Six Sigma Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Lean Six Sigma Techniques',
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
                content: 'Introduction to Lean Six Sigma',
              },
              {
                title: 'Module 2',
                content: 'Lean Six Sigma Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Lean Six Sigma Strategies',
              },
              {
                title: 'Module 4',
                content: 'Lean Six Sigma Tools',
              },
              {
                title: 'Module 5',
                content: 'Lean Six Sigma Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Lean Six Sigma Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Lean Six Sigma Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Lean Six Sigma Techniques',
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
                content: 'Introduction to Lean Six Sigma',
              },
              {
                title: 'Module 2',
                content: 'Lean Six Sigma Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Lean Six Sigma Strategies',
              },
              {
                title: 'Module 4',
                content: 'Lean Six Sigma Tools',
              },
              {
                title: 'Module 5',
                content: 'Lean Six Sigma Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Lean Six Sigma Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Lean Six Sigma Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Lean Six Sigma Techniques',
              },
            ],
          },
        },
      ],
    },
  },
});

export const DiversityInclusionPractitioner = prisma.course.create({
  data: {
    title: 'Diversity and Inclusion Practitioner (DEI-P)',
    description: 'A comprehensive course on Diversity and Inclusion with 7 topics and 8 modules per topic.',
    price: 299,
    topics: {
      create: [
        {
          title: 'Topic 1',
          modules: {
            create: [
              {
                title: 'Module 1',
                content: 'Introduction to Diversity and Inclusion',
              },
              {
                title: 'Module 2',
                content: 'Diversity and Inclusion Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Diversity and Inclusion Strategies',
              },
              {
                title: 'Module 4',
                content: 'Diversity and Inclusion Tools',
              },
              {
                title: 'Module 5',
                content: 'Diversity and Inclusion Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Diversity and Inclusion Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Diversity and Inclusion Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Diversity and Inclusion Techniques',
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
                content: 'Introduction to Diversity and Inclusion',
              },
              {
                title: 'Module 2',
                content: 'Diversity and Inclusion Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Diversity and Inclusion Strategies',
              },
              {
                title: 'Module 4',
                content: 'Diversity and Inclusion Tools',
              },
              {
                title: 'Module 5',
                content: 'Diversity and Inclusion Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Diversity and Inclusion Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Diversity and Inclusion Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Diversity and Inclusion Techniques',
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
                content: 'Introduction to Diversity and Inclusion',
              },
              {
                title: 'Module 2',
                content: 'Diversity and Inclusion Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Diversity and Inclusion Strategies',
              },
              {
                title: 'Module 4',
                content: 'Diversity and Inclusion Tools',
              },
              {
                title: 'Module 5',
                content: 'Diversity and Inclusion Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Diversity and Inclusion Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Diversity and Inclusion Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Diversity and Inclusion Techniques',
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
                content: 'Introduction to Diversity and Inclusion',
              },
              {
                title: 'Module 2',
                content: 'Diversity and Inclusion Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Diversity and Inclusion Strategies',
              },
              {
                title: 'Module 4',
                content: 'Diversity and Inclusion Tools',
              },
              {
                title: 'Module 5',
                content: 'Diversity and Inclusion Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Diversity and Inclusion Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Diversity and Inclusion Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Diversity and Inclusion Techniques',
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
                content: 'Introduction to Diversity and Inclusion',
              },
              {
                title: 'Module 2',
                content: 'Diversity and Inclusion Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Diversity and Inclusion Strategies',
              },
              {
                title: 'Module 4',
                content: 'Diversity and Inclusion Tools',
              },
              {
                title: 'Module 5',
                content: 'Diversity and Inclusion Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Diversity and Inclusion Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Diversity and Inclusion Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Diversity and Inclusion Techniques',
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
                content: 'Introduction to Diversity and Inclusion',
              },
              {
                title: 'Module 2',
                content: 'Diversity and Inclusion Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Diversity and Inclusion Strategies',
              },
              {
                title: 'Module 4',
                content: 'Diversity and Inclusion Tools',
              },
              {
                title: 'Module 5',
                content: 'Diversity and Inclusion Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Diversity and Inclusion Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Diversity and Inclusion Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Diversity and Inclusion Techniques',
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
                content: 'Introduction to Diversity and Inclusion',
              },
              {
                title: 'Module 2',
                content: 'Diversity and Inclusion Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Diversity and Inclusion Strategies',
              },
              {
                title: 'Module 4',
                content: 'Diversity and Inclusion Tools',
              },
              {
                title: 'Module 5',
                content: 'Diversity and Inclusion Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Diversity and Inclusion Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Diversity and Inclusion Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Diversity and Inclusion Techniques',
              },
            ],
          },
        },
      ],
    },
  },
});

export const BusinessIntelligenceAnalyst = prisma.course.create({
  data: {
    title: 'Business Intelligence Analyst (BIA)',
    description: 'A comprehensive course on Business Intelligence with 7 topics and 8 modules per topic.',
    price: 299,
    topics: {
      create: [
        {
          title: 'Topic 1',
          modules: {
            create: [
              {
                title: 'Module 1',
                content: 'Introduction to Business Intelligence',
              },
              {
                title: 'Module 2',
                content: 'Business Intelligence Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Business Intelligence Strategies',
              },
              {
                title: 'Module 4',
                content: 'Business Intelligence Tools',
              },
              {
                title: 'Module 5',
                content: 'Business Intelligence Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Business Intelligence Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Business Intelligence Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Business Intelligence Techniques',
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
                content: 'Introduction to Business Intelligence',
              },
              {
                title: 'Module 2',
                content: 'Business Intelligence Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Business Intelligence Strategies',
              },
              {
                title: 'Module 4',
                content: 'Business Intelligence Tools',
              },
              {
                title: 'Module 5',
                content: 'Business Intelligence Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Business Intelligence Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Business Intelligence Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Business Intelligence Techniques',
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
                content: 'Introduction to Business Intelligence',
              },
              {
                title: 'Module 2',
                content: 'Business Intelligence Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Business Intelligence Strategies',
              },
              {
                title: 'Module 4',
                content: 'Business Intelligence Tools',
              },
              {
                title: 'Module 5',
                content: 'Business Intelligence Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Business Intelligence Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Business Intelligence Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Business Intelligence Techniques',
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
                content: 'Introduction to Business Intelligence',
              },
              {
                title: 'Module 2',
                content: 'Business Intelligence Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Business Intelligence Strategies',
              },
              {
                title: 'Module 4',
                content: 'Business Intelligence Tools',
              },
              {
                title: 'Module 5',
                content: 'Business Intelligence Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Business Intelligence Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Business Intelligence Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Business Intelligence Techniques',
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
                content: 'Introduction to Business Intelligence',
              },
              {
                title: 'Module 2',
                content: 'Business Intelligence Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Business Intelligence Strategies',
              },
              {
                title: 'Module 4',
                content: 'Business Intelligence Tools',
              },
              {
                title: 'Module 5',
                content: 'Business Intelligence Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Business Intelligence Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Business Intelligence Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Business Intelligence Techniques',
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
                content: 'Introduction to Business Intelligence',
              },
              {
                title: 'Module 2',
                content: 'Business Intelligence Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Business Intelligence Strategies',
              },
              {
                title: 'Module 4',
                content: 'Business Intelligence Tools',
              },
              {
                title: 'Module 5',
                content: 'Business Intelligence Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Business Intelligence Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Business Intelligence Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Business Intelligence Techniques',
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
                content: 'Introduction to Business Intelligence',
              },
              {
                title: 'Module 2',
                content: 'Business Intelligence Frameworks',
              },
              {
                title: 'Module 3',
                content: 'Business Intelligence Strategies',
              },
              {
                title: 'Module 4',
                content: 'Business Intelligence Tools',
              },
              {
                title: 'Module 5',
                content: 'Business Intelligence Case Studies',
              },
              {
                title: 'Module 6',
                content: 'Business Intelligence Best Practices',
              },
              {
                title: 'Module 7',
                content: 'Business Intelligence Certification',
              },
              {
                title: 'Module 8',
                content: 'Advanced Business Intelligence Techniques',
              },
            ],
          },
        },
      ],
    },
  },
});
