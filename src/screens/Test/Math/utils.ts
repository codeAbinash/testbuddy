import { ColorScheme } from '@utils/types'
import { ViewStyle } from 'react-native'
import { WebViewProps } from 'react-native-webview'
import colors from 'tailwindcss/colors'

export const css = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');
  *{font-family: 'Josefin Sans', sans-serif;}
  mjx-container[jax="CHTML"][display="true"] {
    display: inline-block !important ;
    text-align: center !important;
    line-height: normal !important;
  }
  .MuiDialogContent-root > div > ul{
    margin: 10px !important;
  }
  .MathJax_Display{
    font-size: 1.5em !important;
  }
  img {
    width: 100%;
    object-fit: contain;
    min-height: 100px;
  }
  body{
    margin: 0 !important;
    padding: 0 !important;
  }
  *{
    font-size: 1.03rem;
    line-height: 1.5rem;
    user-select: none;
  }
</style>`

export type MathJaxProps = {
  html?: string
  style?: ViewStyle
  mathJaxOptions?: object
  colorScheme: ColorScheme
} & Omit<WebViewProps, 'style'>

const defaultOptions = {
  showMathMenu: false,
  messageStyle: 'none',
  extensions: ['tex2jax.js'],
  jax: ['input/TeX', 'output/HTML-CSS'],
  tex2jax: {
    inlineMath: [
      ['$$', '$$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$', '$'],
      ['\\[', '\\]'],
    ],
    processEscapes: true,
  },
  TeX: {
    extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js'],
  },
}

const defaultOptionsString = JSON.stringify(defaultOptions)

export function getWrappedHtml(content: string, scheme: ColorScheme) {
  const str = `
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    ${css}
    <style>
      body, html {
        background-color: ${scheme === 'light' ? colors.zinc[50] : 'black'};
        color: ${scheme === 'light' ? colors.zinc[900] : colors.zinc[50]};
        padding: 10px;
        margin: 0;
      }
    </style>
    <script type="text/x-mathjax-config">
    setTimeout(() => {
        MathJax.Hub.Config(${defaultOptionsString});
        MathJax.Hub.Queue(function() {
          var height = document.documentElement.scrollHeight;
          window.ReactNativeWebView.postMessage(String(height));
          document.getElementById("formula").style.visibility = '';
        });
    }, 0);
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js"></script>
    <div id="formula" style="visibility: hidden;">
        ${content}
    </div>
    `
  return str
}
