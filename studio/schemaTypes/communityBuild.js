export default {
  name: 'communityBuild',
  title: 'Community Build',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Build Title',
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
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'authorInitials',
      title: 'Author Initials',
      type: 'string',
      description: 'Two letters shown in avatar e.g. AO',
      validation: Rule => Rule.max(2)
    },
    {
      name: 'authorSchool',
      title: 'Author School',
      type: 'string',
      description: 'e.g. University of Lagos'
    },
    {
      name: 'authorLevel',
      title: 'Author Level',
      type: 'string',
      description: 'e.g. 200L, 300L, Graduate'
    },
    {
      name: 'tier',
      title: 'Project Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Pro', value: 'pro' }
        ],
        layout: 'radio'
      }
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'fullPost',
      title: 'Full Build Post',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or any video link of the build'
    },
    {
      name: 'lessonsLearned',
      title: 'What They Learned',
      type: 'text',
      rows: 3
    },
    {
      name: 'challenges',
      title: 'Challenges Hit',
      type: 'text',
      rows: 3
    },
    {
      name: 'costBreakdown',
      title: 'Cost Breakdown',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'costItem',
          title: 'Cost Item',
          fields: [
            {
              name: 'item',
              title: 'Item',
              type: 'string'
            },
            {
              name: 'cost',
              title: 'Cost (₦)',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'skills',
      title: 'Skills Used',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'relatedProject',
      title: 'Related Project',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'Link to the official project page if applicable'
    },
    {
      name: 'approved',
      title: 'Approved to Display?',
      type: 'boolean',
      initialValue: false,
      description: 'Only approved builds show on the site'
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'authorName',
      media: 'photos.0'
    }
  }
}