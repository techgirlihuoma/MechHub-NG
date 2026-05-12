export default {
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Resource Title',
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
      name: 'type',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'Book', value: 'book' },
          { title: 'Software', value: 'software' },
          { title: 'Website', value: 'website' },
          { title: 'Video', value: 'video' }
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'badge',
      title: 'Badge Label',
      type: 'string',
      description: 'Short label shown on card e.g. Free, Textbook, YouTube Channel'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'URL to the resource'
    },
    {
      name: 'pillar',
      title: 'Related Pillar',
      type: 'string',
      options: {
        list: [
          { title: 'Mechanical Design', value: 'mechanical' },
          { title: 'Electronics', value: 'electronics' },
          { title: 'Programming', value: 'programming' },
          { title: 'General', value: 'general' }
        ]
      }
    },
    {
      name: 'free',
      title: 'Is it Free?',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'recommended',
      title: 'Highly Recommended?',
      type: 'boolean',
      initialValue: false,
      description: 'Marks resource with a special highlight'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type'
    }
  }
}