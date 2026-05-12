export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'Main headline on the home page'
    },
    {
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 3
    },
    {
      name: 'goalStatement',
      title: 'Goal Statement',
      type: 'text',
      rows: 3
    },
    {
      name: 'quizCtaTitle',
      title: 'Quiz CTA Title',
      type: 'string'
    },
    {
      name: 'quizCtaSubtext',
      title: 'Quiz CTA Subtext',
      type: 'string'
    },
    {
      name: 'announcementBar',
      title: 'Announcement Bar',
      type: 'string',
      description: 'Optional banner shown at top of site. Leave empty to hide.'
    },
    {
      name: 'whyThisContent',
      title: 'Why This Page Content',
      type: 'array',
      of: [{ type: 'block' }]
    }
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    }
  }
}