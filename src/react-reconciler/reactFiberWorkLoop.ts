import { MiniFiber } from '../types/type';
import { scheduleCallback } from '../scheduler/scheduler';

let WIP, rootWIP;
export function scheduleUpdateOnFiber(fiber: MiniFiber){
    WIP = rootWIP = fiber;
    scheduleCallback(workLoopConcurrent);
}

function workLoopConcurrent () {
    // 深度遍历解析fiber节点

    // commit 节点并调用hooks
}