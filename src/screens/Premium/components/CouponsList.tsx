import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

import { useColorScheme } from 'nativewind'
import colors from 'tailwindcss/colors'

import { Coupon01StrokeRoundedIcon } from '@assets/icons/icons'
import { Coupon } from '@query/api'
import { Medium, SemiBold } from '@utils/fonts'
import { secToHrMinSec } from '@utils/utils'
import couponStore from '../couponStore'

type CouponProps = {
  coupons: Coupon[]
}

const CouponsList = React.memo<CouponProps>(({ coupons }) => {
  const { colorScheme } = useColorScheme()

  const { selectedCoupon, setSelectedCoupon } = couponStore()
  const coupon = coupons[selectedCoupon]
  const [expiresIn, setExpiresIn] = useState((coupon?.expiresIn ?? 0) / 1000) // in ms

  useEffect(() => {
    const interval = setInterval(() => {
      setExpiresIn((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <View className='mt-5'>
      <SemiBold className='text text-center text-base'>Available Coupons</SemiBold>
      <View className='mt-5 gap-3'>
        {coupons.length > 0 ? (
          coupons.map((c, index) => (
            <TouchableOpacity
              key={c._id}
              className={`flex-row items-center justify-between rounded-2xl border-dashed px-3.5 py-3.5 ${selectedCoupon === index ? 'border-blue-500' : 'border-zinc-500/50'}`}
              onPress={() => setSelectedCoupon(index)}
              activeOpacity={0.7}
              style={{ borderWidth: 1.3 }}
            >
              <View className='flex-row items-center gap-3'>
                <Coupon01StrokeRoundedIcon
                  width={20}
                  height={20}
                  color={colorScheme === 'dark' ? colors.zinc[100] : colors.zinc[900]}
                />
                <SemiBold className='text text-sm'>{c.code}</SemiBold>
              </View>
              <SemiBold className='text-xs text-amber-500'>Discount {c.discount}</SemiBold>
            </TouchableOpacity>
          ))
        ) : (
          <Medium className='text text-xs'>No coupons available</Medium>
        )}
      </View>
      <View>
        <Medium className='text mt-3 text-center text-xs opacity-70'>
          {secToHrMinSec(expiresIn)} left for the coupon to expire
        </Medium>
      </View>
    </View>
  )
})

export default CouponsList
