import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sampleStudies = [
  {
    title: 'User Experience Design Survey',
    description: 'Help researchers understand how people interact with digital interfaces. Your insights will contribute to better app and website design.',
    status: 'ACTIVE' as const,
    content: {
      version: '1.0',
      title: 'User Experience Design Survey',
      description: 'Help researchers understand how people interact with digital interfaces.',
      instructions: 'Please answer all questions honestly. Your responses are completely anonymous and will help improve digital interface design.',
      sections: [
        {
          id: 'demographics',
          title: 'About You',
          instructions: 'Tell us a bit about yourself to help us understand our participants.',
          questions: [
            {
              id: 'age',
              type: 'number',
              title: 'What is your age?',
              description: 'Please enter your age in years.',
              required: true,
              config: { type: 'number', min: 18, max: 100 }
            },
            {
              id: 'experience',
              type: 'single-choice',
              title: 'How would you rate your technical experience?',
              description: 'Consider your overall comfort with technology and digital interfaces.',
              required: true,
              config: {
                type: 'single-choice',
                options: [
                  { id: '1', label: 'Beginner - I\'m not very comfortable with technology', value: 'beginner' },
                  { id: '2', label: 'Intermediate - I can handle most tech tasks', value: 'intermediate' },
                  { id: '3', label: 'Advanced - I\'m very comfortable with technology', value: 'advanced' },
                  { id: '4', label: 'Expert - I work in a technical field', value: 'expert' }
                ]
              }
            }
          ]
        },
        {
          id: 'usage',
          title: 'Technology Usage',
          instructions: 'Tell us about how you use technology in your daily life.',
          questions: [
            {
              id: 'devices',
              type: 'multiple-choice',
              title: 'Which devices do you use regularly?',
              description: 'Select all that apply.',
              required: true,
              config: {
                type: 'multiple-choice',
                options: [
                  { id: '1', label: 'Smartphone', value: 'smartphone' },
                  { id: '2', label: 'Laptop/Desktop Computer', value: 'computer' },
                  { id: '3', label: 'Tablet', value: 'tablet' },
                  { id: '4', label: 'Smart TV', value: 'smart-tv' },
                  { id: '5', label: 'Smart Watch', value: 'smart-watch' }
                ],
                allowOther: true,
                otherPlaceholder: 'Please specify other devices...'
              }
            },
            {
              id: 'satisfaction',
              type: 'rating-scale',
              title: 'How satisfied are you with most apps and websites you use?',
              description: 'Rate your overall satisfaction with digital interfaces.',
              required: true,
              config: {
                type: 'rating-scale',
                min: 1,
                max: 5,
                minLabel: 'Very Unsatisfied',
                maxLabel: 'Very Satisfied',
                showNumbers: true
              }
            }
          ]
        }
      ],
      settings: {
        allowBack: true,
        showProgress: true,
        timeLimit: 10,
        autoSave: true
      }
    },
    settings: {
      timeLimit: 10,
      allowBack: true,
      showProgress: true,
      autoSave: true
    }
  },
  {
    title: 'Decision Making Study',
    description: 'Participate in research about how people make choices under different conditions. This study explores cognitive processes in decision-making.',
    status: 'ACTIVE' as const,
    content: {
      version: '1.0',
      title: 'Decision Making Study',
      description: 'Participate in research about how people make choices under different conditions.',
      instructions: 'You will be presented with various scenarios. Please make your choices as naturally as possible.',
      sections: [
        {
          id: 'scenarios',
          title: 'Decision Scenarios',
          instructions: 'For each scenario, choose the option that best represents what you would do.',
          questions: [
            {
              id: 'risk_preference',
              type: 'single-choice',
              title: 'You have the choice between two options: A) Receive $50 for certain, or B) 50% chance of winning $100. Which do you choose?',
              required: true,
              config: {
                type: 'single-choice',
                options: [
                  { id: '1', label: 'Option A: $50 for certain', value: 'certain' },
                  { id: '2', label: 'Option B: 50% chance of $100', value: 'risky' }
                ]
              }
            },
            {
              id: 'time_preference',
              type: 'single-choice',
              title: 'Would you rather receive $100 now or $110 in one month?',
              required: true,
              config: {
                type: 'single-choice',
                options: [
                  { id: '1', label: '$100 now', value: 'immediate' },
                  { id: '2', label: '$110 in one month', value: 'delayed' }
                ]
              }
            }
          ]
        }
      ],
      settings: {
        allowBack: true,
        showProgress: true,
        timeLimit: 15,
        autoSave: true
      }
    },
    settings: {
      timeLimit: 15,
      allowBack: true,
      showProgress: true,
      autoSave: true
    }
  },
  {
    title: 'Memory Research Study',
    description: 'Contribute to cognitive science research by participating in memory-related tasks. Help us understand how people process and recall information.',
    status: 'ACTIVE' as const,
    content: {
      version: '1.0',
      title: 'Memory Research Study',
      description: 'Contribute to cognitive science research by participating in memory-related tasks.',
      instructions: 'This study involves remembering lists of words and answering questions about them. Please do your best without taking notes.',
      sections: [
        {
          id: 'word_recall',
          title: 'Word Recall Task',
          instructions: 'You will see a list of words. Try to remember as many as possible.',
          questions: [
            {
              id: 'word_list_memory',
              type: 'textarea',
              title: 'Please write down as many words as you can remember from this list: Apple, River, Mountain, Chair, Music, Ocean, Library, Garden, Sunset, Coffee',
              description: 'Write one word per line. Don\'t worry about the order.',
              required: true,
              config: {
                type: 'textarea',
                placeholder: 'Write the words you remember, one per line...',
                maxLength: 200
              }
            },
            {
              id: 'confidence',
              type: 'slider',
              title: 'How confident are you in your recall?',
              description: 'Move the slider to indicate your confidence level.',
              required: true,
              config: {
                type: 'slider',
                min: 0,
                max: 10,
                minLabel: 'Not confident',
                maxLabel: 'Very confident',
                step: 1
              }
            }
          ]
        }
      ],
      settings: {
        allowBack: false,
        showProgress: true,
        timeLimit: 20,
        autoSave: true
      }
    },
    settings: {
      timeLimit: 20,
      allowBack: false,
      showProgress: true,
      autoSave: true
    }
  }
]

async function main() {
  console.log('Start seeding...')

  // Create sample studies
  for (const studyData of sampleStudies) {
    const study = await prisma.study.create({
      data: studyData
    })
    console.log(`Created study: ${study.title}`)
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })