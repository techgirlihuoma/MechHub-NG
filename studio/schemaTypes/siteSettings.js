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
    },
    {
      name: 'lessonSidebar',
      title: 'Lesson Page — Right Sidebar',
      description: 'Blocks appear below lesson info and quiz on every lesson page. Drag to reorder.',
      type: 'array',
      options: {
        modal: { type: 'inline' }
      },
      of: [
        {
          type: 'object',
          name: 'sidebarBlock',
          title: 'Sidebar Block',
          options: {
            collapsible: true,
            collapsed: true
          },
          fields: [
            {
              name: 'type',
              title: 'Block Type',
              type: 'string',
              options: {
                list: [
                  { title: '📢 Call to Action', value: 'cta' },
                  { title: '📬 Subscribe / Join Community', value: 'subscribe' },
                  { title: '🖼️ Ad Banner', value: 'ad' },
                  { title: '✏️ Custom Text', value: 'text' }
                ],
                layout: 'radio'
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'isActive',
              title: 'Active?',
              type: 'boolean',
              description: 'Uncheck to hide this block without deleting it',
              initialValue: true
            },
            {
              name: 'title',
              title: 'Block Title',
              type: 'string',
              description: 'Label shown above the block. Leave empty to hide.'
            },
            {
              name: 'content',
              title: 'Description Text',
              type: 'text',
              rows: 3,
              description: 'Supporting text shown inside the block'
            },
            {
              name: 'buttonLabel',
              title: 'Button Label',
              type: 'string',
              description: 'e.g. Join our Telegram, Subscribe, Learn More'
            },
            {
              name: 'buttonUrl',
              title: 'Button URL',
              type: 'url',
              description: 'Where the button links to'
            },
            {
              name: 'buttonStyle',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary (Green)', value: 'primary' },
                  { title: 'Ghost (Outline)', value: 'ghost' }
                ],
                layout: 'radio'
              },
              initialValue: 'primary'
            },
            {
              name: 'platform',
              title: 'Community Platform',
              type: 'string',
              description: 'Only for Subscribe blocks — sets the icon on the button',
              options: {
                list: [
                  { title: 'Telegram', value: 'telegram' },
                  { title: 'Discord', value: 'discord' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                  { title: 'Generic / Other', value: 'generic' }
                ],
                layout: 'radio'
              }
            },
            {
              name: 'adImageUrl',
              title: 'Ad Image — External URL',
              type: 'url',
              description: 'Paste an image URL for the ad banner'
            },
            {
              name: 'adImageUpload',
              title: 'Ad Image — Upload',
              type: 'image',
              description: 'Uploaded image overrides the external URL if both are set',
              options: { hotspot: true }
            },
            {
              name: 'adLinkUrl',
              title: 'Ad Link URL',
              type: 'url',
              description: 'Where clicking the ad goes'
            }
          ],
          preview: {
            select: {
              title: 'title',
              type: 'type',
              active: 'isActive'
            },
            prepare({ title, type, active }) {
              const icons = {
                cta: '📢', subscribe: '📬',
                ad: '🖼️', text: '✏️'
              }
              return {
                title: title || 'Untitled Block',
                subtitle: `${icons[type] || ''} ${type || ''} · ${active ? 'Active' : 'Hidden'}`
              }
            }
          }
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    }
  }
}