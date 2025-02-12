import { allColors } from '@utils/colors';
import { SemiBold } from '@utils/fonts';
import { View } from 'react-native';
import type { Test } from './TestList';

export function LeftBox({ test, index }: { test: Test; index: number; }) {
  return (
    <View
      className='flex-0 h-12 min-w-12 items-center justify-center border p-2'
      style={{
        backgroundColor: allColors[index % allColors.length] + '33',
        borderColor: allColors[index % allColors.length] + '66',
        borderRadius: 9,
      }}
    >
      <SemiBold className='text-xs' style={{ color: allColors[index % allColors.length] }}>
        {test.testAbr}
      </SemiBold>
    </View>
  );
}
