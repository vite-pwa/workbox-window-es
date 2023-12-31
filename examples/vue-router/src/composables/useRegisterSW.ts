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

  // for first sw installation: will be set to false once the sw activates for the first time
  const installing = ref(false)
  const updateFound = ref(false)
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
      onInstalling(state, sw) {
        installing.value = state
        onInstalling?.(state, sw)
      },
      onUpdateFound(state, sw) {
        updateFound.value = state
        onUpdateFound?.(state, sw)
      },
    })

  return {
    updateServiceWorker,
    offlineReady,
    needRefresh,
    installing,
    updateFound,
  }
}
