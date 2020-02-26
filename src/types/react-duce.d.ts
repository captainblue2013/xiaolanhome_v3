declare module 'react-duce' {
  declare function createStore(name: string, initState: any, reducer: Function):any
  declare function useStore(id: any):any
}