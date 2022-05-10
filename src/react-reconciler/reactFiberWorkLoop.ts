import { MiniFiber, Flags } from '../types/type';
import { scheduleCallback, shouldYield } from '../scheduler/scheduler';
import { FunctionComponent, ClassComponent, HostComponent, Fragment, HostText } from './reactWorkTags';
import { updateFunctionComponent } from '../react-reconciler/reactFiberReconciler';
import { insertOrAppendPlacementNode, updateNode, commitDeletions } from '../react-dom/dom';

let wip, rootWIP;
export function scheduleUpdateOnFiber(fiber: MiniFiber){
    wip = rootWIP = fiber;
    scheduleCallback(workLoopConcurrent);
}

function workLoopConcurrent () {
    // 深度遍历解析fiber节点
    while(wip && shouldYield()) {
        performUnitOfWork();
    }
    if (wip) return workLoopConcurrent;
    // commit 节点并调用hooks
    if (rootWIP) {
        commitRoot();
    }
}


function performUnitOfWork() {

    // 获取fiber节点类型
    let { tag } = wip;
    switch (tag){
        case FunctionComponent:
            updateFunctionComponent(wip);
            break;
        case ClassComponent:
            break;
        case HostComponent:
            break;
        case Fragment:
            break;
        case HostText:
            break;
    }

    // 初始化完成 先取子节点 再兄弟节点
    if (wip.child) {
        wip = wip.child;
        return;
    }
    // 更新子节点 (这里while是为了把没有兄弟节点的层次过滤掉)
    while (wip) {
        if (wip.sibling) {
        wip = wip.sibling;
        return;
        }
        wip = wip.return;
    }
}

function commitRoot() {
    commitWork(rootWIP);
    wip = rootWIP = null;
}

function commitWork(fiber:MiniFiber | null | undefined) {
    // 先自己 再子 再兄弟节点
    if (!fiber) return;

    let parentNode = getParentNode(fiber.return);

    let { flags, stateNode, tag } = fiber;

    // placement

    if (flags & Flags.Placement && stateNode) {
        let before = getHostSibling(fiber.sibling);
        insertOrAppendPlacementNode(parentNode, before, stateNode);
    }

    //update
    if (flags & Flags.Update && stateNode) {
        // 更新dom
        updateNode(stateNode, fiber.alternate?.props, fiber?.props);
    }

    //delete
    if (fiber.deletions.length > 0) {
        commitDeletions(fiber.deletions, stateNode ?? parentNode);
    }

    // dom操作完成后调用hooks
    if (tag == FunctionComponent) {
        invokeHooks(fiber);
    }

    commitWork(fiber.child);

    commitWork(fiber.sibling);
}

function getParentNode(fiber) {
   while (fiber) {
       if (fiber.stateNode) return fiber.stateNode;
       fiber = fiber.return;
   }
}

function invokeHooks(fiber) {
    let { updateQueueOfEffect, updateQueueOfLayout } = fiber;
    for(let i = 0; i < updateQueueOfLayout.length; i++) {
        let effect = updateQueueOfLayout[i];
        effect.create();
    }
    for(let i = 0; i < updateQueueOfEffect.length; i++) {
        let effect = updateQueueOfEffect[i];
        scheduleCallback(effect.create);
    }
}

// 寻找第一个不需要交换位置的节点
function getHostSibling (fiber) {
    while (fiber) {
        if (fiber.stateNode && !(fiber.flags & Flags.Placement)) {
            return fiber.stateNode;
        }
        fiber = fiber.sibling;
    }
}