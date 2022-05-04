export interface InternalRoot {
    containerInfo: HTMLElement;
}

export interface RefObject<T> {
    current: T
  }
  
export type RefCallback<T> = {
bivarianceHack(instance: T | null): void
}['bivarianceHack']
export type Ref<T = any> = RefCallback<T> | RefObject<T> | null

export interface Props{
    key?: key;
    children?: children;
    ref?: Ref;
}

type key = string | number | null;

type children = string | MiniElement | string[] | MiniElement[] | undefined | null;

export interface MiniElement<P extends Props = any>{
    type: any,
    props?: P,
    key?: key;
    ref?: Ref; 
}

export interface ReactDomRootInterface {
    _internalRoot: InternalRoot;
    render(element: MiniElement):void;
}

type defaultFiber = MiniFiber | null;

export enum Flags {

    NoFlags = 0,

    Placement = 0 << 1,

    Update = 0 << 2,

    Deletion = 0 << 3
}

export enum HookFlags {

    HookLayout = 0 << 1,

    HookPassive = 1 << 2
}

export interface MiniFiber<P extends Props = any> {
    // 节点类型
    type: any,
    // 节点属性参数
    props?: P,
    // 节点key唯一标识
    key?: key;
    // ref 引用
    ref?: Ref;
    // 绑定的dom节点
    stateNode?: HTMLElement | null;
    // 子 兄 父节点
    child?: defaultFiber,
    return?: defaultFiber | MiniElement,
    sibling: defaultFiber,

    //fiber 节点需要进行的操作
    flags: Flags,

    // fiber节点在所在层级中，位置
    index: number | null,

    // 记录旧的fiber 节点
    alternate: defaultFiber,

    // hook0
    memorizedState: any,

    deletions: MiniFiber[] | null,

    tag: number | null,

    updateQueueOfEffect?: any[],

    updateQueueOfLayout?: any[]

}