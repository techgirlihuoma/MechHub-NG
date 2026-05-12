export default {
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Lesson Title',
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
      name: 'lessonNumber',
      title: 'Lesson Number',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'videoUrl',
      title: 'YouTube Video URL',
      type: 'url'
    },
    {
      name: 'content',
      title: 'Lesson Content',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'quiz',
      title: 'Mini Quiz',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'quizQuestion',
          title: 'Question',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'options',
              title: 'Answer Options',
              type: 'array',
              of: [{ type: 'string' }],
              validation: Rule => Rule.min(2).max(4)
            },
            {
              name: 'correctAnswer',
              title: 'Correct Answer (must match one of the options exactly)',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'explanation',
              title: 'Explanation (shown after answering)',
              type: 'text',
              rows: 2
            }
          ]
        }
      ]
    },
    {
      name: 'duration',
      title: 'Estimated Duration (e.g. 20 mins)',
      type: 'string'
    },
    {
      name: 'freePreview',
      title: 'Free Preview?',
      description: 'If true, this lesson is visible without enrollment',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'lessonNumber'
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `Lesson ${subtitle}`
      }
    }
  }
}