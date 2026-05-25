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
      name: 'videoUrl',
      title: 'YouTube Video URL',
      type: 'url'
    },
    {
      name: 'content',
      title: 'Lesson Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Highlight', value: 'highlight' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true
                  }
                ]
              },
              {
                name: 'textStyle',
                type: 'object',
                title: 'Text Style',
                fields: [
                  {
                    name: 'fontSize',
                    title: 'Font Size',
                    type: 'string',
                    options: {
                      list: [
                        { title: 'Small (12px)', value: 'small' },
                        { title: 'Normal (15px)', value: 'normal' },
                        { title: 'Medium (18px)', value: 'medium' },
                        { title: 'Large (22px)', value: 'large' },
                        { title: 'XL (28px)', value: 'xl' }
                      ]
                    }
                  },
                  {
                    name: 'fontFamily',
                    title: 'Font Family',
                    type: 'string',
                    options: {
                      list: [
                        { title: 'Default (Barlow)', value: 'sans' },
                        { title: 'Monospace (Space Mono)', value: 'mono' },
                        { title: 'Display (Barlow Condensed)', value: 'cond' }
                      ]
                    }
                  },
                  {
                    name: 'color',
                    title: 'Text Color',
                    type: 'string',
                    options: {
                      list: [
                        { title: 'Default', value: 'default' },
                        { title: 'Green', value: 'green' },
                        { title: 'Muted', value: 'muted' },
                        { title: 'White', value: 'white' },
                        { title: 'Orange', value: 'orange' },
                        { title: 'Blue', value: 'blue' },
                        { title: 'Yellow', value: 'yellow' },
                        { title: 'Red', value: 'red' }
                      ]
                    }
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string'
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string'
            }
          ]
        },
        {
          type: 'object',
          name: 'htmlEmbed',
          title: 'HTML Embed',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Internal label e.g. Tinkercad Circuit, Codepen Example'
            },
            {
              name: 'html',
              title: 'HTML Code',
              type: 'text',
              rows: 8,
              description: 'Paste raw HTML or an iframe embed code here.'
            },
            {
              name: 'height',
              title: 'Height (px)',
              type: 'number',
              initialValue: 400
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string'
            }
          ],
          preview: {
            select: { title: 'label', subtitle: 'caption' },
            prepare({ title, subtitle }) {
              return {
                title: title || 'HTML Embed',
                subtitle: subtitle || 'Custom HTML block'
              }
            }
          }
        },
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Code Block',
          fields: [
            {
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: [
                  { title: 'Arduino / C++', value: 'cpp' },
                  { title: 'C', value: 'c' },
                  { title: 'Python', value: 'python' },
                  { title: 'JavaScript', value: 'javascript' },
                  { title: 'HTML', value: 'html' },
                  { title: 'CSS', value: 'css' },
                  { title: 'Bash / Terminal', value: 'bash' },
                  { title: 'Plain Text', value: 'text' }
                ]
              },
              initialValue: 'cpp'
            },
            {
              name: 'code',
              title: 'Code',
              type: 'text',
              rows: 12,
              validation: Rule => Rule.required()
            },
            {
              name: 'filename',
              title: 'Filename',
              type: 'string',
              description: 'Optional e.g. blink.ino, main.py'
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string'
            }
          ],
          preview: {
            select: { title: 'filename', subtitle: 'language' },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Code Block',
                subtitle: subtitle || 'code'
              }
            }
          }
        },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout Box',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'ℹ️ Info', value: 'info' },
                  { title: '💡 Tip', value: 'tip' },
                  { title: '⚠️ Warning', value: 'warning' },
                  { title: '🔥 Important', value: 'important' },
                  { title: '✅ Success', value: 'success' }
                ],
                layout: 'radio'
              },
              initialValue: 'info'
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string'
            },
            {
              name: 'content',
              title: 'Content',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: { title: 'title', subtitle: 'type' },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Callout',
                subtitle: subtitle
              }
            }
          }
        }
      ]
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
              title: 'Correct Answer (must match one option exactly)',
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
      subtitle: 'duration'
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle || ''
      }
    }
  }
}