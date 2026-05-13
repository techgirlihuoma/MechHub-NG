export default {
  name: 'career',
  title: 'Career',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    },
    {
      name: 'emoji',
      title: 'Emoji Icon',
      type: 'string',
      description: 'Single emoji e.g. 🤖'
    },
    {
      name: 'sector',
      title: 'Sector',
      type: 'string',
      description: 'e.g. Manufacturing · Defense · Agriculture'
    },
    {
      name: 'tag',
      title: 'Tag',
      type: 'string',
      description: 'Short tag shown on career card e.g. High demand'
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required()
    },
    {
      name: 'whatYouDo',
      title: 'What You Do',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'dayToDay',
      title: 'Day to Day Tasks',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'whereYouWork',
      title: 'Where You Would Work in Nigeria',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'salaryRange',
      title: 'Salary Range (Naira)',
      type: 'object',
      fields: [
        {
          name: 'entry',
          title: 'Entry Level',
          type: 'string',
          description: 'e.g. ₦120,000 - ₦200,000/month'
        },
        {
          name: 'mid',
          title: 'Mid Level',
          type: 'string'
        },
        {
          name: 'senior',
          title: 'Senior Level',
          type: 'string'
        }
      ]
    },
    {
      name: 'learningPath',
      title: 'Learning Path',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pathStep',
          title: 'Path Step',
          fields: [
            {
              name: 'stage',
              title: 'Stage',
              type: 'string',
              description: 'e.g. Beginner, Intermediate, Advanced, Expert'
            },
            {
              name: 'description',
              title: 'What to Learn',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'videoUrl',
      title: 'YouTube Video URL',
      type: 'url',
      description: 'Day in the life video'
    },
    {
      name: 'relatedCourses',
      title: 'Related Courses',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'course' }] }]
    },
    {
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'sector'
    }
  }
}