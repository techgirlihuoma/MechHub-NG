export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
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
      name: 'tier',
      title: 'Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Pro', value: 'pro' }
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'emoji',
      title: 'Emoji Icon',
      type: 'string',
      description: 'Single emoji to represent the project e.g. 🚗'
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
      title: 'Full Project Overview',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'videoUrl',
      title: 'YouTube Video URL',
      type: 'url'
    },
    {
      name: 'estimatedCost',
      title: 'Estimated Cost (e.g. ~₦14,000)',
      type: 'string'
    },
    {
      name: 'skills',
      title: 'Skills Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Mechanical Design', value: 'mechanical' },
          { title: 'Electronics', value: 'electronics' },
          { title: 'Programming', value: 'programming' },
          { title: 'CAD', value: 'cad' },
          { title: 'PCB Design', value: 'pcb' },
          { title: 'Arduino', value: 'arduino' },
          { title: 'ROS', value: 'ros' }
        ]
      }
    },
    {
      name: 'components',
      title: 'Components Needed',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'component',
          title: 'Component',
          fields: [
            {
              name: 'name',
              title: 'Component Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number'
            },
            {
              name: 'estimatedPrice',
              title: 'Estimated Price (₦)',
              type: 'string'
            },
            {
              name: 'whereToBy',
              title: 'Where to Buy in Nigeria',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'steps',
      title: 'Step by Step Guide',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'step',
          title: 'Step',
          fields: [
            {
              name: 'stepNumber',
              title: 'Step Number',
              type: 'number'
            },
            {
              name: 'title',
              title: 'Step Title',
              type: 'string'
            },
            {
              name: 'content',
              title: 'Step Details',
              type: 'array',
              of: [{ type: 'block' }]
            }
          ]
        }
      ]
    },
    {
      name: 'relatedCourses',
      title: 'Related Courses',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'course' }] }]
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'featured',
      title: 'Featured on Home Page?',
      type: 'boolean',
      initialValue: false,
      description: 'Only one project should be featured at a time'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tier',
      media: 'thumbnail'
    }
  }
}