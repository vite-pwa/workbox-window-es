export interface RegisterSWOptions {
  immediate?: boolean
  onNeedRefresh?: () => void
  onOfflineReady?: () => void
  /**
   * Called only if `onRegisteredSW` is not provided.
   *
   * @deprecated Use `onRegisteredSW` instead.
   * @param registration The service worker registration if available.
   */
  onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void
  /**
   * Called once the service worker is registered (requires version `0.12.8+`).
   *
   * @param swScriptUrl The service worker script url.
   * @param registration The service worker registration if available.
   */
  onRegisteredSW?: (swScriptUrl: string, registration: ServiceWorkerRegistration | undefined) => void
  onRegisterError?: (error: any) => void
  /**
   * Called when the service worker is installing for first time.
   *
   * This callback will also be called when the service worker is activated (no service worker param provided).
   *
   * @param sw The service worker instance.
   */
  onInstalling?: (sw?: ServiceWorker) => void
  onUpdateFound?: (sw: ServiceWorker) => void
}

export function registerSW(options: RegisterSWOptions) {
  const {
    immediate = false,
    onNeedRefresh,
    onOfflineReady,
    onRegistered,
    onRegisteredSW,
    onRegisterError,
    onInstalling,
    onUpdateFound,
  } = options

  let wb: import('workbox-window-es').Workbox | undefined
  let registerPromise: Promise<void>
  let sendSkipWaitingMessage: () => Promise<void> | undefined

  const updateServiceWorker = async (_reloadPage = true) => {
    await registerPromise
    if (!AUTO_SW)
      await sendSkipWaitingMessage?.()
  }

  async function register() {
    if ('serviceWorker' in navigator) {
      const { Workbox } = await import('workbox-window-es')
      wb = new Workbox(__SW__, { scope: __SW_SCOPE__, type: __SW_TYPE__ })
      wb.addEventListener('installing', (event) => {
        onInstalling?.(event.sw!)
      })
      wb.addEventListener('updatefound', (event) => {
        onUpdateFound?.(event.sw!)
      })
      sendSkipWaitingMessage = async () => {
        // Send a message to the waiting service worker,
        // instructing it to activate.
        // Note: for this to work, you have to add a message
        // listener in your service worker. See below.
        await wb?.messageSkipWaiting()
      }
      if (!AUTO_DESTROY_SW) {
        if (AUTO_SW) {
          wb.addEventListener('activated', (event) => {
            if (event.isUpdate || event.isExternal)
              window.location.reload()
          })
          wb.addEventListener('installed', (event) => {
            if (!event.isUpdate) {
              onInstalling?.()
              onOfflineReady?.()
            }
          })
        }
        else {
          let onNeedRefreshCalled = false
          const showSkipWaitingPrompt = () => {
            onNeedRefreshCalled = true
            // \`event.wasWaitingBeforeRegister\` will be false if this is
            // the first time the updated service worker is waiting.
            // When \`event.wasWaitingBeforeRegister\` is true, a previously
            // updated service worker is still waiting.
            // You may want to customize the UI prompt accordingly.

            // Assumes your app has some sort of prompt UI element
            // that a user can either accept or reject.
            // Assuming the user accepted the update, set up a listener
            // that will reload the page as soon as the previously waiting
            // service worker has taken control.
            wb?.addEventListener('controlling', (event) => {
              if (event.isUpdate)
                window.location.reload()
            })

            onNeedRefresh?.()
          }
          wb.addEventListener('installed', (event) => {
            if (typeof event.isUpdate === 'undefined') {
              if (typeof event.isExternal !== 'undefined') {
                if (event.isExternal) {
                  showSkipWaitingPrompt()
                }
                else if (!onNeedRefreshCalled) {
                  onInstalling?.()
                  onOfflineReady?.()
                }
              }
              else {
                if (event.isExternal) {
                  window.location.reload()
                }
                else if (!onNeedRefreshCalled) {
                  onInstalling?.()
                  onOfflineReady?.()
                }
              }
            }
            else if (!event.isUpdate) {
              onInstalling?.()
              onOfflineReady?.()
            }
          })
          // Add an event listener to detect when the registered
          // service worker has installed but is waiting to activate.
          wb.addEventListener('waiting', showSkipWaitingPrompt)
        }
      }

      // register the service worker
      wb.register({ immediate }).then((r) => {
        if (onRegisteredSW)
          onRegisteredSW(__SW__, r)
        else
          onRegistered?.(r)
      }).catch((e) => {
        onRegisterError?.(e)
      })
    }
  }

  registerPromise = register()

  return updateServiceWorker
}
