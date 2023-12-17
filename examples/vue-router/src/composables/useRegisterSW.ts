import { ref } from 'vue'
import { type RegisterSWOptions, registerSW } from './register'

export type { RegisterSWOptions }

export function useRegisterSW(options: RegisterSWOptions = {}) {
  const {
    immediate = true,
    onNeedRefresh,
    onOfflineReady,
    onRegistered,
    onRegisteredSW,
    onRegisterError,
    onInstalling,
    onUpdateFound,
  } = options

  const needRefresh = ref(false)
  const offlineReady = ref(false)

  const dev = import.meta.env.DEV

  const updateServiceWorker = dev
    ? () => Promise.resolve()
    : registerSW({
      immediate,
      onNeedRefresh() {
        needRefresh.value = true
        onNeedRefresh?.()
      },
      onOfflineReady() {
        offlineReady.value = true
        onOfflineReady?.()
      },
      onRegistered,
      onRegisteredSW,
      onRegisterError,
      onInstalling,
      onUpdateFound,
    })

  return {
    updateServiceWorker,
    offlineReady,
    needRefresh,
  }
}
