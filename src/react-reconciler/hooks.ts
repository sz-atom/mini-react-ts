import { MiniFiber, HooksFlags, hook, defaultHook } from '../types/type';

let currentlyRenderingFiber:MiniFiber;
let workInProgressHook:defaultHook = null, currentHook:defaultHook = null;

// 初始化hooks 使用参数
export function renderWithHooks(fiber) {
    currentlyRenderingFiber = fiber;

    workInProgressHook = null;

    if (currentlyRenderingFiber) {
        currentlyRenderingFiber.memoizedState = null; 
        currentlyRenderingFiber.updateQueueOfLayout = [];
        currentlyRenderingFiber.updateQueueOfEffect = [];
    }

}

export function useState(initalState) {

}

export function useReducer(reducer, initalState) {}

export function useEffect(create, deps) {
    useEffectImpl(HooksFlags.HookPassive, create, deps);
}

export function useLayoutEffect(create, deps) {
    useEffectImpl(HooksFlags.HookLayout, create, deps);
}

function useEffectImpl(flags, create, deps) {

}

function updateWorkInProgressHook():defaultHook {
    let hook:defaultHook = null;
    let current = currentlyRenderingFiber.alternate;

    if (current) {

        currentlyRenderingFiber.memoizedState = current.memoizedState;

        if (workInProgressHook) {
            hook = currentHook = workInProgressHook = workInProgressHook.next;
        } else {
            hook = currentHook = workInProgressHook = currentlyRenderingFiber.memoizedState;
        }

    } else {
        currentHook = null;

        hook = {
            memoizedState: null,
            next: null
        }

        if (workInProgressHook) {
            workInProgressHook = workInProgressHook.next = hook;
        } else {
            workInProgressHook = currentlyRenderingFiber.memoizedState = hook;
        }
    }

    return hook;
}