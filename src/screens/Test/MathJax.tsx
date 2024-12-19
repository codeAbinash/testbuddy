import { useCallback, useMemo, useState } from 'react'
import { View, ViewStyle } from 'react-native'
import { WebView, WebViewProps } from 'react-native-webview'
import { WebViewEvent } from 'react-native-webview/lib/WebViewTypes'
import { script } from '../../../temp/Lib'

type MathJaxProps = {
  html: string
  style?: ViewStyle
  mathJaxOptions?: object
} & Omit<WebViewProps, 'style'>

const defaultOptions = {
  showMathMenu: false,
  messageStyle: 'none',
  extensions: ['tex2jax.js'],
  jax: ['input/TeX', 'output/HTML-CSS'],
  tex2jax: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
    processEscapes: true,
  },
  TeX: {
    extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js'],
  },
}

const css = `
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
      height: auto;
      object-fit: contain;
      min-height: 100px;
    }
</style>`

function MathJax({ html, style, mathJaxOptions, ...rest }: MathJaxProps) {
  const [height, setHeight] = useState(1)

  const handleMessage = useCallback((event: WebViewEvent) => {
    setHeight(Number((event.nativeEvent as any).data))
  }, [])

  const wrapMathjax = useCallback(
    (content: string) => {
      const options = JSON.stringify(Object.assign({}, defaultOptions, mathJaxOptions))
      const str = `
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
      ${css}      
			<script type="text/x-mathjax-config">
				MathJax.Hub.Config(${options});
				MathJax.Hub.Queue(function() {
					var height = document.documentElement.scrollHeight;
					window.ReactNativeWebView.postMessage(String(height));
					document.getElementById("formula").style.visibility = '';
				});
    </script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js"></script>
			<div id="formula" style="visibility: hidden;">
				${content}
			</div>
		`
      return str
    },
    [mathJaxOptions],
  )

  const wrappedHtml = useMemo(() => wrapMathjax(html), [html, wrapMathjax])

  return (
    <View style={{ height }}>
      <WebView scrollEnabled={false} onMessage={handleMessage} source={{ html: wrappedHtml }} {...rest} />
    </View>
  )
}

export default MathJax
