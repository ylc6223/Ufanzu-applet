//获取最新主题
const getLatestTopic = function () {
  return 'https://my-json-server.typicode.com/ylc6223/Ufanzu-applet/threads'
}
export const timeagoInst = {
  format: (timestamp: number, timeZone: string): string => {
    return new Date(timestamp).toLocaleString(timeZone)
  },
}
export const Thread_DETAIL_NAVIGATE = function () {
  const url: string = 'api/Thread_DETAIL_NAVIGATE'
  return url
}
export const GlobalState = function () {
  const url: string = 'api/GlobalState'
  return url
}
export const IThreadProps = function () {
  const url: string = 'api/IThreadProps'
  return url
}
export const prettyHTML = function () {
  const url: string = 'api/prettyHTML'
  return url
}

export default {
  getLatestTopic,
  timeagoInst,
  Thread_DETAIL_NAVIGATE,
  GlobalState,
  IThreadProps,
  prettyHTML,
}
