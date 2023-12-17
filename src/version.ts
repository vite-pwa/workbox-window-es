// eslint-disable-next-line @stylistic/ts/keyword-spacing
try{
  // @ts-expect-error TS7015: Element implicitly has an any type because index expression is not of type numbe
  // eslint-disable-next-line no-restricted-globals
  self['workbox:window:7.0.0'] && _()
}
catch (e) {}
