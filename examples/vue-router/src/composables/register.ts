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
   * Called when the service worker is installing for the first time.
   *
   * This callback will also be called when the service worker is installed (no service worker param provided).
   *
   * @param state true when the service worker is installing for first time and false when installed.
   * @param sw The service worker instance.
   */
  onInstalling?: (state: boolean, sw?: ServiceWorker) => void
  /**
   * Called when a new service worker version is found and it is installing.
   *
   * This callback will also be called when the service worker is installed (no service worker param provided).
   *
   * @param state true when the service worker is installing and false when installed.
   * @param sw The service worker instance.
   */
  onUpdateFound?: (state: boolean, sw?: ServiceWorker) => void
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

  let wb: import('@vite-pwa/workbox-window').Workbox | undefined
  let registerPromise: Promise<void>
  let sendSkipWaitingMessage: () => Promise<void> | undefined

  const updateServiceWorker = async (_reloadPage = true) => {
    await registerPromise
    if (!AUTO_SW)
      await sendSkipWaitingMessage?.()
  }

  async function register() {
    if ('serviceWorker' in navigator) {
      const { Workbox } = await import('@vite-pwa/workbox-window')
      wb = new Workbox(__SW__, { scope: __SW_SCOPE__, type: __SW_TYPE__ })
      sendSkipWaitingMessage = async () => {
        // Send a message to the waiting service worker,
        // instructing it to activate.
        // Note: for this to work, you have to add a message
        // listener in your service worker. See below.
        await wb?.messageSkipWaiting()
      }
      if (!AUTO_DESTROY_SW) {
        if (AUTO_SW) {
          wb.addEventListener('installing', (event) => {
            console.log('installing:auto-update', { isUpdate: event.isUpdate, isExternal: event.isExternal })
            event.isUpdate === true || event.isExternal === true
              ? onUpdateFound?.(true, event.sw)
              : onInstalling?.(true, event.sw)
          })
          wb.addEventListener('activated', (event) => {
            console.log('activated:auto-update', { isUpdate: event.isUpdate, isExternal: event.isExternal })
            if (event.isUpdate || event.isExternal)
              window.location.reload()
          })
          wb.addEventListener('installed', (event) => {
            console.log('installed:auto-update', { isUpdate: event.isUpdate, isExternal: event.isExternal })
            event.isUpdate || event.isExternal
              ? onUpdateFound?.(false, event.sw)
              : onInstalling?.(false, event.sw)
            if (event.isUpdate === false)
              onOfflineReady?.()
          })
        }
        else {
          let onNeedRefreshCalled = false
          const showSkipWaitingPrompt = (event?: import('@vite-pwa/workbox-window').WorkboxLifecycleWaitingEvent) => {
            /*
             FIX:
             - open page in a new tab and navigate to home page
             - add a new sw version
             - open a new second tab and navigate to home page
             - click reload on the first tab
             - second tab refreshed, but the first tab doesn't (still with prompt)
             */
            if (event && onNeedRefreshCalled && event.isExternal === true)
              window.location.reload()

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
              console.log('controlling::prompt', { isUpdate: event.isUpdate, isExternal: event.isExternal })
              if (event.isUpdate === true || event.isExternal === true)
                window.location.reload()
            })

            onNeedRefresh?.()
          }
          wb.addEventListener('installing', (event) => {
            console.log('installing::prompt', { isUpdate: event.isUpdate, isExternal: event.isExternal })
            event.isUpdate === true || event.isExternal === true
              ? onUpdateFound?.(true, event.sw)
              : onInstalling?.(true, event.sw)
          })
          wb.addEventListener('installed', (event) => {
            console.log('installed::prompt', { isUpdate: event.isUpdate, isExternal: event.isExternal })
            event.isUpdate === true || event.isExternal === true
              ? onUpdateFound?.(false, event.sw)
              : onInstalling?.(false, event.sw)
            if (typeof event.isUpdate === 'undefined') {
              if (typeof event.isExternal !== 'undefined') {
                if (event.isExternal)
                  showSkipWaitingPrompt()
                else if (!onNeedRefreshCalled)
                  onOfflineReady?.()
              }
              else {
                if (event.isExternal)
                  window.location.reload()
                else if (!onNeedRefreshCalled)
                  onOfflineReady?.()
              }
            }
            else if (!event.isUpdate) {
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
