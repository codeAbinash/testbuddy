import { ColorScheme } from '@utils/types'
import colors from 'tailwindcss/colors'

export const css = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');
  *{
    font-size: 1.02rem;
    line-height: 1.3rem;
    box-sizing: border-box;
    font-family: 'Josefin Sans', sans-serif;
  }
  p{
    text-align: justify;  
  }
  ul {
    padding-inline-start: 10px;
  }
  img {
    width: 100% !important;
    height: auto !important;
    object-fit: contain;
    border-radius: 5px;
  }
  .blog {
    padding: 5px 15px;
  }
</style>`

export function wrapHtmlBlog(content: string, scheme: ColorScheme) {
  const str = `
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <style>
    body, html {
      background-color: ${scheme === 'light' ? colors.zinc[50] : 'black'};
      color: ${scheme === 'light' ? colors.zinc[900] : colors.zinc[50]};
      margin: 0;
      padding: 0;
    }      
    </style>
    ${css}
   </head>
    <body>
      <div class="blog">
        ${content}
      </div>
    </body>
  </html>`
  return str
}
