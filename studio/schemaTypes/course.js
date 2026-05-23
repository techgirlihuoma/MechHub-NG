export default {
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Course Title',
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
      name: 'pillar',
      title: 'Pillar',
      type: 'string',
      options: {
        list: [
          { title: 'Mechanical Design', value: 'mechanical' },
          { title: 'Electronics', value: 'electronics' },
          { title: 'Programming', value: 'programming' }
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' }
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'overview',
      title: 'Full Course Overview',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'duration',
      title: 'Estimated Duration (e.g. 6 hours)',
      type: 'string'
    },
    {
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'modules',
      title: 'Modules',
      description: 'Group lessons into modules. Drag to reorder.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'module',
          title: 'Module',
          fields: [
            {
              name: 'title',
              title: 'Module Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Module Description',
              type: 'text',
              rows: 2
            },
            {
              name: 'lessons',
              title: 'Lessons',
              description: 'Pick lessons for this module. Drag to reorder.',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'lesson' }] }]
            }
          ],
          preview: {
            select: {
              title: 'title',
              lessons: 'lessons'
            },
            prepare({ title, lessons }) {
              const count = lessons ? lessons.length : 0
              return {
                title,
                subtitle: `${count} lesson${count !== 1 ? 's' : ''}`
              }
            }
          }
        }
      ]
    },
    {
      name: 'comingSoon',
      title: 'Coming Soon?',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'pillar',
      media: 'thumbnail'
    }
  }
}
