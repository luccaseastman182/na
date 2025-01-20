export type CourseMetadata = {
  title: string;
  description: string;
  price: number;
  moduleContent: string[];
};

export function createCourse(metadata: CourseMetadata) {
  return prisma.course.create({
    data: {
      title: metadata.title,
      description: metadata.description,
      price: metadata.price,
      topics: {
        create: Array.from({ length: 7 }, (_, i) => ({
          title: `Topic ${i + 1}`,
          modules: {
            create: Array.from({ length: 8 }, (_, j) => ({
              title: `Module ${j + 1}`,
              content: metadata.moduleContent[j]
            }))
          }
        }))
      }
    }
  });
}
