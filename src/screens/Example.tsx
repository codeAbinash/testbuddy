import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { useColorScheme } from 'nativewind'
import { useMemo } from 'react'
import { ScrollView } from 'react-native'
import MathJax from './Test/MathJax'

export default function Example() {
  const { colorScheme } = useColorScheme()

  const mathString = useMemo(() => {
    return `
            <div style="${colorScheme === 'dark' ? 'color: white;' : ''}">

            $sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}$<br><p>This is an equation</p>
            <img src='https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' 
            height='auto' width='100%'
            />
            </div>
            `
  }, [colorScheme])

  return (
    <ScrollView className='flex-1 p-5'>
      <PaddingTop />
      <ScrollView className='flex-1 gap-3'>
        <MathJax
          style={{
            backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          }}
          html={mathString}
        />
      </ScrollView>
      <PaddingBottom />
    </ScrollView>
  )
}

//import { MathJaxSvg } from 'react-native-mathjax-html-to-svg'
// function MathJaxExample() {
//   const { colorScheme } = useColorScheme()
//   return (
//     <MathJaxSvg
//       fontSize={16}
//       color={colorScheme === 'dark' ? colors.zinc[200] : colors.zinc[800]}
//       fontCache={true}
//       style={{}}
//     >
//       {`
// <p>When \\(a \\ne 0\\), there are <u>two solutions</u> to \\(ax^2 + bx + c = 0\\) <span style="color:red;">and</span> they are $$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$</p>
// <b>In-line Mathematics</b><br/><p>Finally, while display equations look good for a page of samples, the ability to mix math <mark>and text in a paragraph is also important.</mark><br/><b>This expression \\(\\sqrt{3x-1}+(1+x)^2\\) is an <span style="color:red;font-style:italic;">example of an inline equation</span>.</b>As you see, MathJax equations can be used this way as well, without unduly disturbing the <s>spacing between lines</s>.</p>
// <img src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fletsenhance.io%2F&psig=AOvVaw3pNxr04AsZaKKbaW5DBpL7&ust=1734605396253000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJD1neeSsYoDFQAAAAAdAAAAABAE' />
// <p>$$\\begin{array}{c|c} \\text{First} & \\text{Second} \\\\ \\hline 1 & 2 \\\\ 3 & 4 \\end{array}$$</p>
// `}
//     </MathJaxSvg>
//   )
// }
