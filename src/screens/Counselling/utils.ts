import { z } from 'zod'

import { DropdownData } from '@components/DropdownExtended'

export const states: DropdownData[] = [
  { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
  { label: 'Arunachal Pradesh', value: 'Arunachal Pradesh' },
  { label: 'Assam', value: 'Assam' },
  { label: 'Bihar', value: 'Bihar' },
  { label: 'Chandigarh', value: 'Chandigarh' },
  { label: 'Chhattisgarh', value: 'Chhattisgarh' },
  { label: 'Delhi', value: 'Delhi' },
  { label: 'Goa', value: 'Goa' },
  { label: 'Gujarat', value: 'Gujarat' },
  { label: 'Haryana', value: 'Haryana' },
  { label: 'Himachal Pradesh', value: 'Himachal Pradesh' },
  { label: 'Jammu and Kashmir', value: 'Jammu and Kashmir' },
  { label: 'Jharkhand', value: 'Jharkhand' },
  { label: 'Karnataka', value: 'Karnataka' },
  { label: 'Kerala', value: 'Kerala' },
  { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
  { label: 'Maharashtra', value: 'Maharashtra' },
  { label: 'Manipur', value: 'Manipur' },
  { label: 'Meghalaya', value: 'Meghalaya' },
  { label: 'Mizoram', value: 'Mizoram' },
  { label: 'Nagaland', value: 'Nagaland' },
  { label: 'Odisha', value: 'Odisha' },
  { label: 'Puducherry', value: 'Puducherry' },
  { label: 'Punjab', value: 'Punjab' },
  { label: 'Rajasthan', value: 'Rajasthan' },
  { label: 'Sikkim', value: 'Sikkim' },
  { label: 'Tamil Nadu', value: 'Tamil Nadu' },
  { label: 'Telangana', value: 'Telangana' },
  { label: 'Tripura', value: 'Tripura' },
  { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
  { label: 'Uttarakhand', value: 'Uttarakhand' },
  { label: 'West Bengal', value: 'West Bengal' },
]

export const categories: DropdownData[] = [
  { label: 'OPEN', value: 'OPEN' },
  { label: 'EWS', value: 'EWS' },
  { label: 'OBC-NCL', value: 'OBC-NCL' },
  { label: 'SC', value: 'SC' },
  { label: 'ST', value: 'ST' },
]

export const quotas: DropdownData[] = [
  { label: 'AI', value: 'AI' },
  { label: 'GO', value: 'GO' },
  { label: 'HS', value: 'HS' },
  { label: 'JK', value: 'JK' },
  { label: 'LA', value: 'LA' },
  { label: 'OS', value: 'OS' },
]

export const genders: DropdownData[] = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
]

export const SearchCollegeSchema = z.object({
  mainsCRLRank: z.number(),
  mainsCategoryRank: z.number(),
  advancedCRLRank: z.number().optional(),
  advancedCategoryRank: z.number().optional(),
  homeState: z.string(),
  category: z.string(),
  quota: z.string(),
  pwdCategory: z.boolean(),
})
