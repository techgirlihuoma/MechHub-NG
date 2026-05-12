export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first e.g. 1, 2, 3'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Courses', value: 'courses' },
          { title: 'Projects', value: 'projects' },
          { title: 'Equipment', value: 'equipment' },
          { title: 'Career', value: 'career' }
        ]
      }
    }
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category'
    }
  }
}