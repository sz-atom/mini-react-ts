import { MiniFiber } from '../types/type';
import { scheduleCallback } from '../scheduler/scheduler';
import { FunctionComponent, ClassComponent, HostComponent, Fragment, HostText } from './reactWorkTags';
import { updateFunctionComponent } from '../react-reconciler/reactFiberReconciler';

let wip, rootWIP;
export function scheduleUpdateOnFiber(fiber: MiniFiber){
    wip = rootWIP = fiber;
    scheduleCallback(workLoopConcurrent);
}

function workLoopConcurrent () {
    // 深度遍历解析fiber节点
    while(wip) {
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

function commitWork(fiber) {
    // 先自己 再子 再兄弟节点
    if (!fiber) return;

    let parentNode = getParentNode(fiber.return);

    let { flags, stateNode, tag } = fiber;


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
    
}