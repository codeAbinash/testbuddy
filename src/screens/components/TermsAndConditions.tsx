import { privacyPolicyUrl, termsAndConditionsUrl } from '@/constants'
import { SemiBold } from '@utils/fonts'
import { Linking, View } from 'react-native'

export default function TermsAndConditions() {
  return (
    <View>
      <SemiBold className='text mb-2 mt-2 text-center text-[0.65rem]'>
        By continuing, you agree to our{' '}
        <SemiBold className='link' onPress={() => Linking.openURL(termsAndConditionsUrl)}>
          Terms of Service
        </SemiBold>{' '}
        and{' '}
        <SemiBold className='link' onPress={() => Linking.openURL(privacyPolicyUrl)}>
          Privacy Policy
        </SemiBold>
        .
      </SemiBold>
    </View>
  )
}
