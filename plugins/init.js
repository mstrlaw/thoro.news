/* eslint-disable no-multi-str */
import moment from 'moment'

window.onNuxtReady(() => {
  if (process.browser && process.env.NODE_ENV === 'production') {
    console.log(
      '******\n Startup @' + moment().format('HH:mm:ss') + '\n****** (v0.8)'
    )
    console.log(
      '%c\n\n\n\n\n\n\n\n\n\n\n\
          .-"`\'"-.\n\
         /        \\\n\
         |        |\n\
         /\'---\'--`\\\n\
        |          |\n\
        \\.--.---.-./\n\
        (_.--._.-._)\n\
          \\=-=-=-/\n\
           \\=-=-/\n\
            \\=-/\n\
             \\/\n\n\
       Sorry, there\'s no\n\
        ice cream here.\n\n\n\n\n\n\n\n\n\n\n\
        ',
      'font-family:monospace'
    )
  }
})
