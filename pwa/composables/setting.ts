import { defineResource } from '@doyolabs/api-client-pinia'
import type { User } from '~/types'

export const useUserResource = defineResource<User>('user')
