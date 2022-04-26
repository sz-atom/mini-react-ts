import { MiniFiber, MiniElement, Flags } from '../types/type'

export function createFiber(vnode: MiniElement, returnFiber: any):MiniFiber {
    let fiber:MiniFiber = {
        // 类型
        type: vnode.type,
        key: vnode.key,
        // 属性
        props: vnode.props,
        // 不同类型的组件， stateNode也不同
        // 原生标签 dom节点
        // class 实例
        stateNode: null,

        // 第一个子fiber
        child: null,
        // 下一个兄弟节点
        sibling: null,
        return: returnFiber,

        flags: Flags.Placement,

        // 记录节点在当前层级下的位置
        index: null,

        // old fiber
        alternate: null,

        // 函数组件存的是hook0
        memorizedState: null,

        deletions: [],

        tag: null
    }

    return fiber;
}